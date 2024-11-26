import { useState, useEffect } from "react";
import { deleteTask, getTasks } from "../actions/TaskActions";
import { DATABASE_ID, COLLECTION_ID, client } from "../lib/appwrite";
import useSound from "use-sound";
import onDeleteSfx from "../sounds/onDelete.mp3";
import { useToast } from "../hooks/use-toast";
import UpdateTask from "./UpdateTask";

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]); // State to store tasks
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [playOnDelete] = useSound(onDeleteSfx);
  const { toast } = useToast();

  const [editingTaskId, setEditingTaskId] = useState<string | null>(null); // Track the task being edited

  const handleEditToggle = (taskID: string) => {
    setEditingTaskId((prev) => (prev === taskID ? null : taskID)); // Toggle the edit state for the selected task
  };

  const handleDelete = async (taskID: string) => {
    deleteTask(taskID);
    playOnDelete();
    toast({
      variant: "destructive",
      title: "Task Deleted",
      description: "Task has been deleted successfully",
    });
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const fetchedTasks = await getTasks();
        setTasks(fetchedTasks);
        //        console.log(fetchedTasks);
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
          setTasks((prevTask) => [...prevTask, changedTask]);
        }

        if (eventType.includes("delete")) {
          setTasks((prevTask) =>
            prevTask.filter((task) => task.$id !== changedTask.$id)
          );
        }

        if (eventType.includes("update")) {
          setTasks((prevTask) =>
            prevTask.map((task) =>
              task.$id === changedTask.$id ? changedTask : task
            )
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
        <ul className="flex gap-4 flex-col-reverse">
          {tasks.map((task) => (
            <li
              key={task.$id}
              id={task.$id}
              className="border-[1px] w-5/6 md:w-3/6 flex flex-col mx-auto rounded-lg shadow-md hover:scale-[102%] transition-all duration-300 justify-between"
            >
              <div className="flex gap-4 p-4">
                <p className="w-5/6">{task.content}</p>

                {/* Edit Button */}
                <button
                  onClick={() => {
                    handleEditToggle(task.$id); // Toggle the edit mode
                    setTimeout(() => {
                      const taskElement = document.getElementById(task.$id); // Find the task element by ID
                      if (taskElement) {
                        // Scroll smoothly to the task if it exists
                        taskElement.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                      }
                    }, 100); // Delay to ensure the DOM is updated
                  }}
                >
                  <span>
                    <span role="img" aria-label="Edit">
                      ✏️
                    </span>
                  </span>
                </button>

                <button onClick={() => handleDelete(task.$id)}>
                  <span role="img" aria-label="Delete">
                    ❌
                  </span>
                </button>
              </div>

              {/* Conditional Rendering of <UpdateTask /> */}
              {editingTaskId === task.$id && (
                <div className="w-[100%] rounded-b-lg mt-2">
                  <UpdateTask
                    taskID={task.$id}
                    content={task.content}
                    setEditingTaskId={setEditingTaskId}
                    className="mx-auto text-sm"
                  />
                  <button
                    className="mx-auto flex px-4 py-2 hover:font-semibold"
                    onClick={() => setEditingTaskId(null)}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default TaskList;
