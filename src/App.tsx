import AddTaskForm from "./components/AddTaskForm";
import FilterBar from "./components/FilterBar";
import KanbanBoard from "./components/KanbanBoard";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="min-h-screen bg-black text-white antialiased selection:bg-indigo-500 selection:text-white">
      <Navbar />
      <FilterBar />
      <KanbanBoard />
      <AddTaskForm />
    </div>
  );
};

export default App;
