import TaskList from "./components/TaskList";
import NewTask from "./components/NewTask";
import { ModeToggle } from "./components/toggleSwitch";

function App() {
  return (
    <>
      <main className="min-h-screen place-content-center gap-12 flex flex-col p-8">
        <div className="sticky top-3 w-5/6 mx-auto flex justify-end">
          <ModeToggle />
        </div>
        <TaskList />
        <NewTask className="sticky bottom-3"/>
      </main>
    </>
  );
}

export default App;
