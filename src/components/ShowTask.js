import React from "react";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import _ from "lodash";

const ShowTask = ({
  setTask,
  taskList,
  setTaskList,
  setEditMode,
  darkMode,
  filterTasks,
  setFilterTasks,
}) => {
  // TASKS LENGTH
  const pendingTasks = () => {
    const result = taskList.filter((todo) => todo.status === "Pending");
    return result.length;
  };
  const completedTasks = () => {
    const result = taskList.filter((todo) => todo.status === "Completed");
    return result.length;
  };

  const deleteTask = (id) => {
    let warning = "Are you sure you want to delete this task?";
    // eslint-disable-next-line no-restricted-globals
    if (confirm(warning) === true) {
      const updatedTasks = taskList.filter((todo) => todo.id !== id);
      setTaskList(updatedTasks);
    } else {
      return;
    }
  };

  const editTask = (id) => {
    setEditMode(true);
    const selectedTask = taskList.find((todo) => todo.id === id);
    setTask(selectedTask);
  };

  const handleClearTasks = () => {
    let warning = "Are you sure you want to clear all tasks?";
    // eslint-disable-next-line no-restricted-globals
    if (confirm(warning) === true) {
      setTaskList([]);
    } else {
      return;
    }
  };

  const filteredTasks = taskList.filter((task) => {
    if (filterTasks === "All") {
      return true;
    } else if (filterTasks === "Pending") {
      return task.status === "Pending";
    } else {
      return task.status === "Completed";
    }
  });

  return (
    <>
      <div className="clear-tasks">
        {taskList.length !== 0 ? (
          <h3 style={{ color: darkMode && "#b3b3b3" }}>
            Total Tasks: {taskList.length}
          </h3>
        ) : (
          <h3 style={{ color: darkMode && "#b3b3b3" }}>No Tasks for now</h3>
        )}
        {taskList.length > 0 && (
          <button onClick={handleClearTasks}>Clear tasks</button>
        )}
      </div>
      {taskList.length > 0 && (
        <div className="tasks-filter">
          <button
            onClick={() => setFilterTasks("All")}
            style={{
              color: darkMode && "#b3b3b3",
              opacity: filterTasks === "All" && "1",
            }}
          >
            All
          </button>
          <button
            onClick={() => setFilterTasks("Pending")}
            style={{
              color: darkMode && "#b3b3b3",
              opacity: filterTasks === "Pending" && "1",
            }}
          >
            Pending ({pendingTasks()})
          </button>
          <button
            onClick={() => setFilterTasks("Completed")}
            style={{
              color: darkMode && "#b3b3b3",
              opacity: filterTasks === "Completed" && "1",
            }}
          >
            Completed ({completedTasks()})
          </button>
        </div>
      )}
      <div className="tasks-container">
        {filteredTasks.map((todoItem) => (
          <div
            className="task-card"
            key={todoItem.id}
            style={{ backgroundColor: darkMode && "#282828" }}
          >
            <h2>{_.capitalize(todoItem.name)}</h2>
            <p>Last updated: {todoItem.time}</p>
            <span className="statusMessage">
              <p>{todoItem.status}</p>
              <p
                style={{
                  marginTop: "6px",
                  color:
                    todoItem.status === "Completed" ? "#18ba49" : "#cf2d3e",
                }}
              >
                {todoItem.status === "Completed" ? (
                  <TaskAltIcon />
                ) : (
                  <PendingActionsIcon />
                )}
              </p>
            </span>
            <div>
              <button
                onClick={() => editTask(todoItem.id)}
                title="Edit task"
                className="editBtn"
              >
                <EditIcon sx={{ color: "#e8bb59", fontSize: "30px" }} />
              </button>
              <button
                onClick={() => deleteTask(todoItem.id)}
                title="Delete task"
                className="deleteBtn"
              >
                <DeleteIcon sx={{ color: "#E04242", fontSize: "30px" }} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ShowTask;
