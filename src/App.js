import { Fragment } from "react";

import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";
import useGET from "./hooks/useGET";

function App() {
  const [fetchTasks, tasks, setTasks, isLoading, error] = useGET(
    "https://react-course-31c1e-default-rtdb.firebaseio.com/tasks.json"
  );

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </Fragment>
  );
}

export default App;
