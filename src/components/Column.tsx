import { useDroppable } from "@dnd-kit/core";
import { useAppContext } from "../AppContext";
import type { ColumnProps } from "../types";
import TaskCard from "./TaskCard";

const Column = ({ column, tasks, isFiltered }: ColumnProps) => {
  const { openAddModal } = useAppContext();

  const { isOver, setNodeRef } = useDroppable({
    id: column.id,
    data: {
      columnId: column.id,
    },
  });

  const columnHeaderStyle =
    column.id === "Todo"
      ? { dot: "bg-blue-400", border: "border-t-blue-500" }
      : column.id === "In Progress"
      ? { dot: "bg-amber-400", border: "border-t-amber-500" }
      : { dot: "bg-emerald-400", border: "border-t-emerald-500" };

  return (
    <div
      ref={setNodeRef}
      className={`flex flex-col rounded-xl border border-gray-800 bg-gray-900/70 shadow-lg backdrop-blur-sm transition-colors border-t-4 ${
        columnHeaderStyle.border
      } ${isOver ? "bg-indigo-950/30 ring-2 ring-indigo-500" : ""}`}
    >
      <div className="flex items-center justify-between border-b border-gray-800/80 p-4">
        <div className="flex items-center gap-2.5">
          <span className={`h-2.5 w-2.5 rounded-full ${columnHeaderStyle.dot}`} />
          <h2 className="text-base font-bold text-white tracking-wide">
            {column.title}
          </h2>
          <span className="rounded-full bg-gray-800 px-2 py-0.5 text-xs font-semibold text-gray-400">
            {tasks.length}
          </span>
        </div>

        <button
          onClick={() => openAddModal(column.id)}
          type="button"
          className="cursor-pointer rounded-md p-1 text-gray-400 transition hover:bg-gray-800 hover:text-white"
          title={`Add task to ${column.title}`}
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4 min-h-[350px]">
        {tasks.length > 0 ? (
          tasks.map((task) => <TaskCard key={task.id} task={task} />)
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-800/80 p-6 text-center">
            <div className="mb-2 text-gray-600">
              <svg className="mx-auto h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <p className="text-sm font-medium text-gray-400">
              {isFiltered ? "No matching tasks" : "No tasks yet"}
            </p>
            <p className="mt-1 text-xs text-gray-500">
              {isFiltered
                ? "Try adjusting your search or filters"
                : `Drop tasks here or click '+' above`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Column;
