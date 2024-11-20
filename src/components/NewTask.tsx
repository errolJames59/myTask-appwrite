import { useState } from "react";
import { addTask } from "../actions/TaskActions";
import useSound from "use-sound";
import onAddSfx from "../sounds/onAdd.mp3";

interface TaskListProps{
  className?: string;
}


const TaskList: React.FC<TaskListProps> = ({className}) => {
  const [tasks, setTasks] = useState<string>("");
  const [playOnAdd] = useSound(onAddSfx, { volume: 0.5 });

  const handleAddTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    playOnAdd();
    await addTask(tasks);
    setTasks("");
  };

  return (
    <>
      <section className={`mx-auto w-full md:w-3/6 ${className}`}>
        <form onSubmit={handleAddTask} className="flex flex-col gap-4 p-4 border-2 rounded-lg shadow-md bg-white dark:bg-background">
          <textarea
            value={tasks}
            onChange={(e) => setTasks(e.target.value)}
            placeholder="Write task..."
            className="h-28 p-4 bg-white dark:bg-background resize-none border-b-2 focus:outline-none"
            required
            
          />
          <button className="bg-green-800 text-white px-4 py-2 rounded-lg md:w-1/6 mx-auto" type="submit">Add Task</button>
        </form>
      </section>
    </>
  );
};

export default TaskList;
