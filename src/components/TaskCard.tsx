import { useDraggable } from "@dnd-kit/core";
import { useAppContext } from "../AppContext";
import type { ColumnId, TaskCardProps } from "../types";

const TaskCard = ({ task }: TaskCardProps) => {
  const { deleteTask, openEditModal, updateTaskStatus } = useAppContext();

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task.id,
      data: {
        task,
      },
    });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: 50,
      }
    : undefined;

  const isOverdue = (() => {
    if (task.status === "Completed" || !task.dueDate) return false;
    const due = new Date(`${task.dueDate}T23:59:59`);
    return due < new Date();
  })();

  const priorityBadgeStyle =
    task.priority === "high"
      ? "bg-red-500/10 text-red-400 border-red-500/30"
      : task.priority === "medium"
      ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
      : "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group relative flex flex-col gap-3 rounded-xl border border-gray-700/70 bg-gray-800/90 p-4 shadow-sm transition-all hover:border-gray-600 hover:shadow-md ${
        isDragging ? "opacity-50 ring-2 ring-indigo-500" : ""
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <button
            {...listeners}
            {...attributes}
            type="button"
            className="cursor-grab active:cursor-grabbing text-gray-500 hover:text-gray-300 p-0.5 rounded touch-none"
            title="Drag to reorder or move column"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M7 2a2 2 0 100 4 2 2 0 000-4zm6 0a2 2 0 100 4 2 2 0 000-4zm-6 6a2 2 0 100 4 2 2 0 000-4zm6 0a2 2 0 100 4 2 2 0 000-4zm-6 6a2 2 0 100 4 2 2 0 000-4zm6 0a2 2 0 100 4 2 2 0 000-4z" />
            </svg>
          </button>

          <span
            className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-semibold uppercase tracking-wider ${priorityBadgeStyle}`}
          >
            {task.priority}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => openEditModal(task)}
            type="button"
            className="cursor-pointer rounded p-1 text-xs font-medium text-gray-400 transition hover:bg-gray-700 hover:text-indigo-300"
            title="Edit task"
          >
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>

          <button
            onClick={() => deleteTask(task.id)}
            type="button"
            className="cursor-pointer rounded p-1 text-xs font-medium text-gray-400 transition hover:bg-red-500/20 hover:text-red-400"
            title="Delete task"
          >
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      <div>
        <h3 className="break-words text-sm font-semibold text-white">
          {task.title}
        </h3>
        {task.description && (
          <p className="mt-1 break-words text-xs leading-relaxed text-gray-400 line-clamp-3">
            {task.description}
          </p>
        )}
      </div>

      <div className="mt-1 flex flex-wrap items-center justify-between gap-2 border-t border-gray-700/60 pt-3">
        <div className="flex items-center gap-1 text-xs text-gray-400">
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className={isOverdue ? "font-bold text-red-400" : ""}>
            {task.dueDate || "No date"}
          </span>
          {isOverdue && (
            <span className="rounded bg-red-500/20 px-1 py-0.2 text-[10px] font-bold text-red-400">
              Overdue
            </span>
          )}
        </div>

        <div className="flex items-center gap-1">
          <label htmlFor={`status-${task.id}`} className="sr-only">
            Change Column
          </label>
          <select
            id={`status-${task.id}`}
            value={task.status}
            onChange={(e) => updateTaskStatus(task.id, e.target.value as ColumnId)}
            className="cursor-pointer rounded-md border border-gray-700 bg-gray-900/90 px-2 py-1 text-xs font-medium text-gray-300 outline-none transition hover:border-gray-600 focus:border-indigo-500"
          >
            <option value="Todo">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
