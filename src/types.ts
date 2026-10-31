import type { ReactNode } from "react";

export type ColumnId = "Todo" | "In Progress" | "Completed";

export type Priority = "low" | "medium" | "high";

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  status: ColumnId;
  dueDate: string;
  createdAt?: string;
}

export interface ColumnDefinition {
  id: ColumnId;
  title: string;
}

export interface TaskFormData {
  title: string;
  description: string;
  priority: Priority;
  status: ColumnId;
  dueDate: string;
}

export interface ColumnProps {
  column: ColumnDefinition;
  tasks: Task[];
  isFiltered?: boolean;
}

export interface TaskCardProps {
  task: Task;
}

export interface AddTaskProps {
  task?: Task | null;
}

export interface AppContextType {
  tasks: Task[];
  filteredTasks: Task[];
  columns: ColumnDefinition[];
  isModalOpen: boolean;
  selectedTask: Task | null;
  searchQuery: string;
  selectedPriority: Priority | "all";
  selectedStatus: ColumnId | "all";
  openAddModal: (defaultStatus?: ColumnId) => void;
  openEditModal: (task: Task) => void;
  closeModal: () => void;
  addTask: (data: TaskFormData) => void;
  updateTask: (taskId: string, data: TaskFormData) => void;
  deleteTask: (taskId: string) => void;
  updateTaskStatus: (taskId: string, newStatus: ColumnId) => void;
  setSearchQuery: (query: string) => void;
  setSelectedPriority: (priority: Priority | "all") => void;
  setSelectedStatus: (status: ColumnId | "all") => void;
  resetFilters: () => void;
}

export interface AppProviderProps {
  children: ReactNode;
}
