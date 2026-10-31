import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useAppContext } from "../AppContext";
import type { TaskFormData } from "../types";

const AddTaskForm = () => {
  const { isModalOpen, closeModal, selectedTask, addTask, updateTask } =
    useAppContext();

  const isEditing = Boolean(selectedTask && selectedTask.id);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TaskFormData>({
    mode: "onBlur",
    defaultValues: {
      title: "",
      description: "",
      priority: "medium",
      status: "Todo",
      dueDate: new Date().toISOString().split("T")[0],
    },
  });

  useEffect(() => {
    if (selectedTask) {
      reset({
        title: selectedTask.title,
        description: selectedTask.description,
        priority: selectedTask.priority,
        status: selectedTask.status,
        dueDate: selectedTask.dueDate,
      });
    } else {
      reset({
        title: "",
        description: "",
        priority: "medium",
        status: "Todo",
        dueDate: new Date().toISOString().split("T")[0],
      });
    }
  }, [selectedTask, reset, isModalOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    if (isModalOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, closeModal]);

  if (!isModalOpen) return null;

  const onSubmit: SubmitHandler<TaskFormData> = (data) => {
    if (isEditing && selectedTask) {
      updateTask(selectedTask.id, data);
    } else {
      addTask(data);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal();
      }}
    >
      <div className="w-full max-w-lg rounded-2xl border border-gray-700 bg-gray-900 p-6 text-white shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b border-gray-800 pb-4">
          <div>
            <h2 className="text-xl font-bold text-white">
              {isEditing ? "Edit Task" : "Create New Task"}
            </h2>
            <p className="mt-0.5 text-xs text-gray-400">
              {isEditing
                ? "Update task information and status."
                : "Fill in the details below to add a new task."}
            </p>
          </div>
          <button
            onClick={closeModal}
            type="button"
            className="cursor-pointer rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-800 hover:text-white"
            title="Close"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-5 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="title" className="text-xs font-semibold uppercase tracking-wider text-gray-300">
              Title <span className="text-red-400">*</span>
            </label>
            <input
              id="title"
              type="text"
              placeholder="e.g. Implement user authentication"
              {...register("title", {
                required: "Title is required",
                minLength: {
                  value: 3,
                  message: "Title must be at least 3 characters",
                },
                maxLength: {
                  value: 100,
                  message: "Title cannot exceed 100 characters",
                },
                validate: (v) =>
                  v.trim().length > 0 || "Title cannot be blank spaces",
              })}
              className="w-full rounded-lg border border-gray-700 bg-gray-800/90 px-3.5 py-2 text-sm text-white placeholder-gray-500 outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
            {errors.title && (
              <p className="text-xs text-red-400">{errors.title.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="description" className="text-xs font-semibold uppercase tracking-wider text-gray-300">
              Description <span className="text-red-400">*</span>
            </label>
            <textarea
              id="description"
              rows={3}
              placeholder="Provide a detailed description of the task..."
              {...register("description", {
                required: "Description is required",
                minLength: {
                  value: 5,
                  message: "Description must be at least 5 characters",
                },
                maxLength: {
                  value: 500,
                  message: "Description cannot exceed 500 characters",
                },
                validate: (v) =>
                  v.trim().length > 0 || "Description cannot be blank spaces",
              })}
              className="w-full resize-none rounded-lg border border-gray-700 bg-gray-800/90 px-3.5 py-2 text-sm text-white placeholder-gray-500 outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
            {errors.description && (
              <p className="text-xs text-red-400">{errors.description.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="priority" className="text-xs font-semibold uppercase tracking-wider text-gray-300">
                Priority <span className="text-red-400">*</span>
              </label>
              <select
                id="priority"
                {...register("priority", { required: "Priority is required" })}
                className="w-full cursor-pointer rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white outline-none transition focus:border-indigo-500"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="status" className="text-xs font-semibold uppercase tracking-wider text-gray-300">
                Column Status <span className="text-red-400">*</span>
              </label>
              <select
                id="status"
                {...register("status", { required: "Status is required" })}
                className="w-full cursor-pointer rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white outline-none transition focus:border-indigo-500"
              >
                <option value="Todo">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="dueDate" className="text-xs font-semibold uppercase tracking-wider text-gray-300">
              Due Date <span className="text-red-400">*</span>
            </label>
            <input
              id="dueDate"
              type="date"
              {...register("dueDate", {
                required: "Due date is required",
                validate: (val) => {
                  if (!val) return "Due date is required";
                  return true;
                },
              })}
              className="w-full rounded-lg border border-gray-700 bg-gray-800/90 px-3.5 py-2 text-sm text-white outline-none transition focus:border-indigo-500"
            />
            {errors.dueDate && (
              <p className="text-xs text-red-400">{errors.dueDate.message}</p>
            )}
          </div>

          <div className="mt-3 flex items-center justify-end gap-3 border-t border-gray-800 pt-4">
            <button
              onClick={closeModal}
              type="button"
              className="cursor-pointer rounded-lg border border-gray-700 px-4 py-2 text-sm font-semibold text-gray-300 transition hover:bg-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="cursor-pointer rounded-lg bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 active:scale-95 disabled:opacity-50"
            >
              {isEditing ? "Save Changes" : "+ Add Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskForm;
