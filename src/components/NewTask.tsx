import { useState } from "react";
import { addTask } from "../actions/TaskActions";

const TaskList = () => {
  const [tasks, setTasks] = useState<string>("");

  const handleAddTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await addTask(tasks);
    setTasks("");
  };

  return (
    <>
      <section className="mx-auto w-3/6">
        <form onSubmit={handleAddTask} className="flex flex-col gap-4">
          <textarea
            value={tasks}
            onChange={(e) => setTasks(e.target.value)}
            placeholder="Write task..."
            className="w-full h-36 p-4 border-2 rounded-lg"
            required
          />
          <button className="bg-green-800 text-white px-4 py-2 rounded-lg w-1/6 mx-auto" type="submit">Add Task</button>
        </form>
      </section>
    </>
  );
};

export default TaskList;