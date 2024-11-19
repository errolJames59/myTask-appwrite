import { useState, useEffect } from "react";
import { getTasks } from "../actions/TaskActions";

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]); // State to store tasks
  const [loading, setLoading] = useState(true); // State for loading indicator

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const fetchedTasks = await getTasks();
        setTasks(fetchedTasks);
        console.log(tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []); // Empty dependency array to run only once

  if (loading) {
    return <div>Loading tasks...</div>;
  }

  return (
    <>
      <section>
        <ul className="flex flex-col gap-4 w-3/6 mx-auto text-center">
          {tasks.map((task) => (
            <li
              key={task.$id}
              className="bg-white flex justify-between p-4 rounded-lg shadow-sm hover:animate-pulse duration-500"
            >
              <p>{task.content}</p>
              <button>
                <span role="img" aria-label="Delete">
                  ❌
                </span>
              </button>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default TaskList;
