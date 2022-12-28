import usePOST from "../../hooks/usePOST";
import Section from "../UI/Section";
import TaskForm from "./TaskForm";

const NewTask = (props) => {
  const [AddTask, isLoading, error] = usePOST(
    "https://react-course-31c1e-default-rtdb.firebaseio.com/tasks.json"
  );

  const handleEnterTask = async (taskText) => {
    await AddTask(taskText).then((task) => props.onAddTask(task));
  };

  return (
    <Section>
      <TaskForm onEnterTask={handleEnterTask} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
