import { useState, useEffect, useRef } from "react";
import { updateTask } from "../actions/TaskActions";
import useSound from "use-sound";
import onAddSfx from "../sounds/onAdd.mp3";
import { useToast } from "../hooks/use-toast";

interface UpdateTaskProps {
  className?: string;
  taskID: string;
  content: string;
  setEditingTaskId: React.Dispatch<React.SetStateAction<string | null>>; // Add this prop
}

const UpdateTask: React.FC<UpdateTaskProps> = ({
  className,
  taskID,
  content,
  setEditingTaskId,
}) => {
  const [tasks, setTasks] = useState<string>(content); // Initialize with existing content
  const [playOnAdd] = useSound(onAddSfx, { volume: 0.5 });
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement | null>(null);

  const handleAddTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    playOnAdd();
    await updateTask(taskID, tasks);

    setTasks(""); // Clear the input field

    toast({
      variant: "default",
      title: "Task Updated",
      description: "Task has been updated successfully",
    });

    setEditingTaskId(null); // Reset editingTaskId to null in parent
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === "Enter" &&
        event.target instanceof HTMLTextAreaElement &&
        tasks.trim() !== ""
      ) {
        event.preventDefault();
        formRef.current?.dispatchEvent(
          new Event("submit", { bubbles: true, cancelable: true })
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [tasks]);

  useEffect(() => {
    if (formRef.current) {
      formRef.current.querySelector("textarea")?.focus();
    }
  }, []);

  return (
    <section className={`${className}`}>
      <form
        ref={formRef}
        onSubmit={handleAddTask}
        className="flex flex-col gap-4 p-4 border-2 rounded-lg shadow-md bg-white dark:bg-background"
      >
        <textarea
          value={tasks}
          onChange={(e) => setTasks(e.target.value)}
          className="h-24 p-4 bg-white dark:bg-background resize-none border-b-2 focus:outline-none"
          required
        />
        <button
          className="bg-green-800 text-white px-4 py-2 rounded-lg mx-auto"
          type="submit"
        >
          Edit Note
        </button>
      </form>
    </section>
  );
};

export default UpdateTask;
