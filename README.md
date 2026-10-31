# 📋 Kanban Task Board

A responsive, feature-rich Kanban board built with **React 19**, **TypeScript**, and **Tailwind CSS**. Users can organize and manage tasks across three workflow stages: **To Do**, **In Progress**, and **Completed**.

---

## ✨ Features

- **Task Management**:
  - **Create**: Add new tasks with title, description, priority (`Low`, `Medium`, `High`), and due date.
  - **Edit & Delete**: Update existing task details or remove tasks with one click.
  - **Status Transitions**: Move tasks across columns using **Drag-and-Drop** (`@dnd-kit`) or the quick status selector on each card.
- **Search & Filtering**:
  - **Live Search**: Instant search by task title or description.
  - **Multi-Filter**: Filter tasks by priority and column status simultaneously.
  - **Clear Filters**: One-click reset to return to the full task board.
- **Data Persistence**:
  - Saved automatically to `localStorage` so tasks persist across page refreshes.
- **UX & Form Validation**:
  - Form validation with `react-hook-form` (required fields, character limits, whitespace protection).
  - Empty states for columns and no-results feedback when searches match nothing.
  - Overdue date indicators on incomplete tasks.
- **Responsive Layout**:
  - Mobile-first design that adapts from a single-column layout on phones to a 3-column grid on desktop.

---

## 🛠️ Tech Stack

- **Framework**: React 19 + Vite
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS
- **Drag and Drop**: `@dnd-kit/core`
- **Form Management**: `react-hook-form`
- **Icons**: Heroicons / SVG

---

## 📁 Project Structure

```text
src/
├── types.ts                    # Central TypeScript interfaces and union types
├── AppContext.tsx              # Global state management and persistence logic
├── App.tsx                     # Main layout container
├── main.tsx                    # React root entry wrapped with AppProvider
├── index.css                   # Tailwind theme setup
└── components/
    ├── Navbar.tsx              # Top navigation bar with "+ Add Task" button
    ├── FilterBar.tsx           # Search input and priority/status dropdown filters
    ├── KanbanBoard.tsx         # DndContext container and column layout
    ├── Column.tsx              # Droppable column target with task counter
    ├── TaskCard.tsx            # Draggable task card with edit/delete actions
    └── AddTaskForm.tsx         # Modal form handling both task creation and editing
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```

### 3. Build for Production
```bash
npm run build
```

---

## 💡 Key Architectural Decisions

1. **Centralized State with Context API**:
   - Kept state management lightweight without external heavyweight libraries (e.g. Redux). `AppContext` serves as the single source of truth for task CRUD operations.
2. **Reactive Filtering with `useMemo`**:
   - Filtered results are derived on the fly based on search queries and active filters without modifying or duplicating the core `tasks` array.
3. **Accessible Hybrid Move Controls**:
   - Combined `@dnd-kit/core` drag-and-drop for desktop convenience with inline dropdown controls for seamless mobile touchscreen usability.

