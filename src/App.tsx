import TaskList from "./components/TaskList";
import NewTask from "./components/NewTask";

function App() {

  return (
    <main className="min-h-screen place-content-center flex flex-col gap-10">
      <TaskList />
      <NewTask />
    </main>
  );
}

export default App;
