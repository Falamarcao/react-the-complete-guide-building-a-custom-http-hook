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
      transform: (json) => ({
        id: json.name, // Firebase data.name is ID of the created document.
        text: taskText,
      }),
    }).then((task) => props.onAddTask(task));

  return (
    <Section>
      <TaskForm onEnterTask={handleEnterTask} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
