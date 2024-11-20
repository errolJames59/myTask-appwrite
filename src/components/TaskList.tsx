import { useState, useEffect } from "react";
import { deleteTask, getTasks } from "../actions/TaskActions";
import { DATABASE_ID, COLLECTION_ID, client } from "../lib/appwrite";
import useSound from "use-sound";
import onDeleteSfx from "../sounds/onDelete.mp3";
import { useToast } from "../hooks/use-toast";

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]); // State to store tasks
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [playOnDelete] = useSound(onDeleteSfx);
  const {toast} = useToast();

  const handleDelete = async (taskID: string) => {
    deleteTask(taskID);
    playOnDelete();
    toast({
      variant: "destructive",
      title: "Task Deleted",
      description: "Task has been deleted successfully",
    })
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
        <section className="flex h-screen">
          <div className="absolute w-full flex place-content-center items-center">
            <img
              src="/loading-svgrepo-com.svg"
              className="h-10 animate-spin"
              alt=""
            />
            <p>Loading...</p>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <section>
        <ul className="grid gap-4">
          {tasks.map((task) => (
            <li
              key={task.$id}
              className="border-[1px] w-5/6 md:w-3/6 flex gap-4 p-4 mx-auto rounded-lg shadow-md hover:scale-[102%] transition-all duration-300 justify-between"
            >
              <p className="w-5/6">{task.content}</p>

              <button onClick={() => handleDelete(task.$id)}>
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
