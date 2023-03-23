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
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("darkMode")) || false
  );

  useEffect(() => {
    localStorage.setItem("taskList", JSON.stringify(taskList));
  }, [taskList]);

  useEffect(() => {
    if (darkMode) {
      document.body.style.backgroundColor = "#404040";
      document.body.style.backgroundImage = "none";
      document.querySelectorAll("input")[1].style.color = "#fff";
    } else {
      document.body.style.backgroundColor = "#f5e9cf";
    }

    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <>
      <div className="main">
        <div className="toggle">
          <input
            type="checkbox"
            className="checkbox"
            onChange={() => setDarkMode(!darkMode)}
            checked={darkMode}
            id="checkbox"
          />
          <label htmlFor="checkbox" className="label">
            <i className="fas fa-moon"></i>
            <i className="fas fa-sun"></i>
            <div className="ball"></div>
          </label>
        </div>
        <div
          className="container"
          style={{ backgroundColor: darkMode && "#181818" }}
        >
          <h1 style={{ color: darkMode && "#f5e9cf" }}>
            <AssignmentIcon sx={{ fontSize: "60px" }} />
          </h1>
          <AddTask
            task={task}
            setTask={setTask}
            taskList={taskList}
            setTaskList={setTaskList}
            editMode={editMode}
            setEditMode={setEditMode}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />
          <ShowTask
            task={task}
            setTask={setTask}
            taskList={taskList}
            setTaskList={setTaskList}
            editMode={editMode}
            setEditMode={setEditMode}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />
        </div>
      </div>
    </>
  );
};

export default App;
