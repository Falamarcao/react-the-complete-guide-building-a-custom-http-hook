import useRequests from "../../hooks/useRequests";
import Section from "../UI/Section";
import TaskForm from "./TaskForm";

const NewTask = (props) => {
  const [AddTask, isLoading, error] = useRequests();

  const handleEnterTask = async (taskText) =>
    await AddTask({
      url: "https://react-course-31c1e-default-rtdb.firebaseio.com/tasks.json",
      init: {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: { text: taskText },
      },
      transform: (data, input) => ({
        id: data.name,
        text: input.text,
      }),

      // Firebase data.name is ID of the created document.
    }).then((task) => props.onAddTask(task));

  return (
    <Section>
      <TaskForm onEnterTask={handleEnterTask} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
