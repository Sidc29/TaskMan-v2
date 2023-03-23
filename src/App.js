import { useEffect, useState } from "react";

import AddTask from "./components/AddTask";
import ShowTask from "./components/ShowTask";

import AssignmentIcon from "@mui/icons-material/Assignment";

const App = () => {
  const [task, setTask] = useState({});
  const [taskList, setTaskList] = useState(
    JSON.parse(localStorage.getItem("taskList")) || []
  );
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    localStorage.setItem("taskList", JSON.stringify(taskList));
  }, [taskList]);

  return (
    <>
      <div className="main">
        <div className="container">
          <h1>
            <AssignmentIcon sx={{ fontSize: "60px" }} />
          </h1>
          <AddTask
            task={task}
            setTask={setTask}
            taskList={taskList}
            setTaskList={setTaskList}
            editMode={editMode}
            setEditMode={setEditMode}
          />
          <ShowTask
            task={task}
            setTask={setTask}
            taskList={taskList}
            setTaskList={setTaskList}
            editMode={editMode}
            setEditMode={setEditMode}
          />
        </div>
      </div>
    </>
  );
};

export default App;
