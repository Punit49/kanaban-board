import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import { useAppContext } from "../AppContext";
import type { ColumnId } from "../types";
import Column from "./Column";

const KanbanBoard = () => {
  const {
    columns,
    filteredTasks,
    updateTaskStatus,
    searchQuery,
    selectedPriority,
    selectedStatus,
    resetFilters,
  } = useAppContext();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 6, 
      },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const taskId = String(active.id);
    const destinationColumnId = (over.data.current?.columnId || over.id) as ColumnId;

    if (
      destinationColumnId &&
      ["Todo", "In Progress", "Completed"].includes(destinationColumnId)
    ) {
      updateTaskStatus(taskId, destinationColumnId);
    }
  };

  const isFiltered =
    searchQuery.trim() !== "" ||
    selectedPriority !== "all" ||
    selectedStatus !== "all";

  const hasZeroResults = isFiltered && filteredTasks.length === 0;

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {hasZeroResults ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-800 bg-gray-900/60 p-12 text-center">
            <div className="mb-3 rounded-full bg-gray-800 p-3 text-gray-400">
              <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white">No tasks match your search</h3>
            <p className="mt-1 max-w-sm text-sm text-gray-400">
              We couldn't find any tasks matching "{searchQuery}" or the selected filters.
            </p>
            <button
              onClick={resetFilters}
              type="button"
              className="mt-4 cursor-pointer rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {columns.map((column) => {
              const columnTasks = filteredTasks.filter(
                (task) => task.status === column.id
              );

              return (
                <Column
                  key={column.id}
                  column={column}
                  tasks={columnTasks}
                  isFiltered={isFiltered}
                />
              );
            })}
          </div>
        )}
      </main>
    </DndContext>
  );
};

export default KanbanBoard;
