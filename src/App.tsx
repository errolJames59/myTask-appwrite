import TaskList from "./components/TaskList";
import NewTask from "./components/NewTask";
import { ModeToggle } from "./components/toggleSwitch";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <>
      <main className="min-h-screen place-content-center gap-12 flex flex-col">
        <div className="sticky top-3">
          <ModeToggle className="flex justify-end"/>
        </div>
        <TaskList />
        <NewTask className="sticky bottom-3"/>
        <Toaster />
      </main>
    </>
  );
}

export default App;
