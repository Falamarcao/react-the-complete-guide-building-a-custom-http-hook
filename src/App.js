import { Fragment, useEffect } from "react";

import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";
import useRequests from "./hooks/useRequests";

function App() {
  const [fetchTasks, isLoading, error, tasks, setTasks] = useRequests({
    url: "https://react-course-31c1e-default-rtdb.firebaseio.com/tasks.json",
    transform: (json) =>
      Object.keys(json || {}).map((key) => ({
        id: key,
        text: json[key].text,
      })),
  });

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
