import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type {
  AppContextType,
  AppProviderProps,
  ColumnDefinition,
  ColumnId,
  Priority,
  Task,
  TaskFormData,
} from "./types";

const LOCAL_STORAGE_KEY = "kanban_board_tasks";

const DEFAULT_COLUMNS: ColumnDefinition[] = [
  { id: "Todo", title: "To Do" },
  { id: "In Progress", title: "In Progress" },
  { id: "Completed", title: "Completed" },
];

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider = ({ children }: AppProviderProps) => {
  // Load tasks from localStorage, or start with an empty list
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch (e) {
      console.error("Failed to parse tasks from localStorage", e);
    }
    return [];
  });

  const [columns] = useState<ColumnDefinition[]>(DEFAULT_COLUMNS);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedPriority, setSelectedPriority] = useState<Priority | "all">("all");
  const [selectedStatus, setSelectedStatus] = useState<ColumnId | "all">("all");

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
    } catch (e) {
      console.error("Failed to save tasks to localStorage", e);
    }
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch =
        searchQuery.trim() === "" ||
        task.title.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase().trim());

      const matchesPriority =
        selectedPriority === "all" || task.priority === selectedPriority;

      const matchesStatus =
        selectedStatus === "all" || task.status === selectedStatus;

      return matchesSearch && matchesPriority && matchesStatus;
    });
  }, [tasks, searchQuery, selectedPriority, selectedStatus]);

  const openAddModal = (defaultStatus?: ColumnId) => {
    setSelectedTask(
      defaultStatus
        ? {
            id: "",
            title: "",
            description: "",
            priority: "medium",
            status: defaultStatus,
            dueDate: new Date().toISOString().split("T")[0],
          }
        : null
    );
    setIsModalOpen(true);
  };

  const openEditModal = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedTask(null);
    setIsModalOpen(false);
  };

  const addTask = (data: TaskFormData) => {
    const newTask: Task = {
      id: crypto.randomUUID ? crypto.randomUUID() : `task-${Date.now()}`,
      title: data.title.trim(),
      description: data.description.trim(),
      priority: data.priority,
      status: data.status,
      dueDate: data.dueDate,
      createdAt: new Date().toISOString(),
    };
    setTasks((prev) => [newTask, ...prev]);
    closeModal();
  };

  const updateTask = (taskId: string, data: TaskFormData) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? {
              ...t,
              title: data.title.trim(),
              description: data.description.trim(),
              priority: data.priority,
              status: data.status,
              dueDate: data.dueDate,
            }
          : t
      )
    );
    closeModal();
  };

  const deleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  };

  const updateTaskStatus = (taskId: string, newStatus: ColumnId) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );
  };

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedPriority("all");
    setSelectedStatus("all");
  };

  const value: AppContextType = {
    tasks,
    filteredTasks,
    columns,
    isModalOpen,
    selectedTask,
    searchQuery,
    selectedPriority,
    selectedStatus,
    openAddModal,
    openEditModal,
    closeModal,
    addTask,
    updateTask,
    deleteTask,
    updateTaskStatus,
    setSearchQuery,
    setSelectedPriority,
    setSelectedStatus,
    resetFilters,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
