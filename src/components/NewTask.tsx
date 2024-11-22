import { useState, useEffect, useRef } from "react";
import { addTask } from "../actions/TaskActions";
import useSound from "use-sound";
import onAddSfx from "../sounds/onAdd.mp3";
import { useToast } from "../hooks/use-toast";

interface TaskListProps {
  className?: string;
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const TaskList: React.FC<TaskListProps> = ({ className }) => {
  const [tasks, setTasks] = useState<string>(""); // State for task input
  const [playOnAdd] = useSound(onAddSfx, { volume: 0.5 });
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement | null>(null); // Ref for the form

  const handleAddTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    playOnAdd();
    await addTask(tasks);
    setTasks("");
    scrollToTop();

    toast({
      variant: "default",
      title: "Task Added",
      description: "Task has been added successfully",
    });
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter" && tasks.trim() !== "") {
        // Prevent default behavior if "Enter" is pressed inside the form
        event.preventDefault();

        // Submit the form programmatically
        formRef.current?.dispatchEvent(
          new Event("submit", { bubbles: true, cancelable: true })
        );
      }
    };

    // Add event listener for keydown
    window.addEventListener("keydown", handleKeyDown);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [tasks]);

  return (
    <section className={`mx-auto w-full md:w-3/6 ${className}`}>
      <form
        ref={formRef}
        onSubmit={handleAddTask}
        className="flex flex-col gap-4 p-4 border-2 rounded-lg shadow-md bg-white dark:bg-background"
      >
        <textarea
          value={tasks}
          onChange={(e) => setTasks(e.target.value)}
          placeholder="Write task..."
          className="h-24 p-4 bg-white dark:bg-background resize-none border-b-2 focus:outline-none"
          required
        />
        <button
          className="bg-green-800 text-white px-4 py-2 rounded-lg md:w-1/6 mx-auto"
          type="submit"
        >
          Add Notes
        </button>
      </form>
    </section>
  );
};

export default TaskList;
