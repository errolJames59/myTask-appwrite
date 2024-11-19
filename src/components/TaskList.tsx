import { useState, useEffect } from "react";
import { deleteTask, getTasks } from "../actions/TaskActions";
import { DATABASE_ID, COLLECTION_ID, client } from "../utils/appwrite";

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]); // State to store tasks
  const [loading, setLoading] = useState(true); // State for loading indicator

  const handleDelete = async (taskID: string) => {
    deleteTask(taskID);
  };

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

    const unsubscribe = client.subscribe(
      `databases.${DATABASE_ID}.collections.${COLLECTION_ID}.documents`,
      (response) => {
        const eventType = response.events[0];

        const changedTask = response.payload as Task;

        if (eventType.includes("create")) {
          setTasks((prevTask) => [changedTask, ...prevTask]);
        }

        if (eventType.includes("delete")) {
          setTasks((prevTask) =>
            prevTask.filter((task) => task.$id !== changedTask.$id)
          );
        }
      }
    );

    fetchTasks();
    return () => {
      unsubscribe();
    };
  }, []); // Empty dependency array to run only once

  if (loading) {
    return (
      <>
        <section className="flex mx-auto items-center">
          <img
            src="/loading-svgrepo-com.svg"
            className="h-10 animate-spin"
            alt=""
          />
          <p>Loading...</p>
        </section>
      </>
    );
  }

  return (
    <>
      <section>
        <ul className="flex flex-col gap-4 text-center">
          {tasks.map((task) => (
            <li
              key={task.$id}
              className="bg-white w-3/6 flex gap-4 p-4 mx-auto rounded-lg shadow-sm hover:animate-pulse duration-500 justify-between"
            >
              <p>{task.content}</p>

              <button onClick={() => handleDelete(task.$id)}>
                <span
                  role="img"
                  aria-label="Delete"
                >
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
