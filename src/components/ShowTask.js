import React from "react";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import Tooltip from '@mui/material/Tooltip';

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
  // TASKS LENGTH FUNCTIONS (Returns the length of tasks)
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
    window.scrollTo(0, 0);
    setEditMode(true);
    const selectedTask = taskList.find((todo) => todo.id === id);
    setTask(selectedTask);
  };

  const clearAllTasks = () => {
    let warning = "Are you sure you want to clear all tasks?";
    // eslint-disable-next-line no-restricted-globals
    if (confirm(warning) === true) {
      setTaskList([]);
    } else {
      return;
    }
  };
  const clearCompletedTasks = () => {
    let warning = "Are you sure you want to clear all completed tasks?";
    // eslint-disable-next-line no-restricted-globals
    if (confirm(warning) === true) {
      const completedTasks = taskList.filter(
        (todo) => todo.status !== "Completed"
      );
      setTaskList(completedTasks);
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
          <div className="clearBtns">
            {completedTasks() > 0 && (
              <Tooltip title="Clear all completed tasks" arrow>
                <button onClick={clearCompletedTasks}>Clear Completed</button>
              </Tooltip>
            )}
            <Tooltip title="Clear all tasks" arrow>
              <button onClick={clearAllTasks}>Clear All</button>
            </Tooltip>
          </div>
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
                    todoItem.status === "Completed" ? "#249e49" : "#d9b40f",
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
                className="editBtn"
              >
                <Tooltip title="Edit Task" arrow>
                  <EditIcon sx={{ color: "#27ba5f", fontSize: "30px" }} />
                </Tooltip>
              </button>
              <button
                onClick={() => deleteTask(todoItem.id)}
                className="deleteBtn"
              >
                <Tooltip title="Delete Task" arrow>
                  <DeleteIcon sx={{ color: "#E04242", fontSize: "30px" }} />
                </Tooltip>
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ShowTask;
