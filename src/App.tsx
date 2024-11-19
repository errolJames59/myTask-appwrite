import TaskList from "./components/TaskList";
import NewTask from "./components/NewTask";

function App() {

  return (
    <main className="min-h-screen place-content-center gap-12 flex flex-col p-8">
      <TaskList />
      <NewTask />
    </main>
  );
}

export default App;
