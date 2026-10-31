import { useAppContext } from "../AppContext";
import type { ColumnId, Priority } from "../types";

const FilterBar = () => {
  const {
    searchQuery,
    setSearchQuery,
    selectedPriority,
    setSelectedPriority,
    selectedStatus,
    setSelectedStatus,
    resetFilters,
    tasks,
    filteredTasks,
  } = useAppContext();

  const isFiltered =
    searchQuery.trim() !== "" ||
    selectedPriority !== "all" ||
    selectedStatus !== "all";

  return (
    <div className="mx-auto w-full max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 rounded-xl border border-gray-800 bg-gray-900/60 p-4 shadow-sm backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <svg
              className="h-4 w-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tasks by title..."
            className="w-full rounded-lg border border-gray-700 bg-gray-800/80 py-2 pl-9 pr-9 text-sm text-white placeholder-gray-400 outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-white"
            >
              ✕
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5">
            <label htmlFor="filter-priority" className="text-xs font-medium text-gray-400">
              Priority:
            </label>
            <select
              id="filter-priority"
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value as Priority | "all")}
              className="cursor-pointer rounded-lg border border-gray-700 bg-gray-800 py-1.5 px-3 text-xs font-medium text-gray-200 outline-none transition focus:border-indigo-500"
            >
              <option value="all">All Priorities</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <label htmlFor="filter-status" className="text-xs font-medium text-gray-400">
              Status:
            </label>
            <select
              id="filter-status"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as ColumnId | "all")}
              className="cursor-pointer rounded-lg border border-gray-700 bg-gray-800 py-1.5 px-3 text-xs font-medium text-gray-200 outline-none transition focus:border-indigo-500"
            >
              <option value="all">All Columns</option>
              <option value="Todo">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          {isFiltered && (
            <button
              onClick={resetFilters}
              type="button"
              className="cursor-pointer rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-400 transition hover:bg-red-500/20"
            >
              Clear Filters
            </button>
          )}
        </div>

        <div className="hidden text-xs text-gray-400 lg:block">
          Showing <span className="font-semibold text-white">{filteredTasks.length}</span> of{" "}
          <span className="font-semibold text-white">{tasks.length}</span> tasks
        </div>
      </div>
    </div>
  );
};

export default FilterBar;

