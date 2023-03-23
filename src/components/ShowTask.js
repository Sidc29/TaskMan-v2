import React from "react";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const ShowTask = ({
  setTask,
  taskList,
  setTaskList,
  setEditMode,
  darkMode,
}) => {
  const deleteTask = (id) => {
    const updatedTasks = taskList.filter((todo) => todo.id !== id);
    setTaskList(updatedTasks);
  };

  const editTask = (id) => {
    setEditMode(true);
    const selectedTask = taskList.find((todo) => todo.id === id);
    setTask(selectedTask);
  };

  return (
    <>
      <div className="clear-tasks">
        {taskList.length !== 0 ? (
          <h3 style={{ color: darkMode && "#b3b3b3" }}>
            Tasks Pending: {taskList.length}
          </h3>
        ) : (
          <h3 style={{ color: darkMode && "#b3b3b3" }}>
            You have no tasks pending
          </h3>
        )}
        {taskList.length > 0 && (
          <button onClick={() => setTaskList([])}>Clear tasks</button>
        )}
      </div>
      <div className="tasks-container">
        {taskList.map((todoItem) => (
          <div
            className="task-card"
            key={todoItem.id}
            style={{ backgroundColor: darkMode && "#282828" }}
          >
            <h2>{todoItem.name}</h2>
            <p>{todoItem.time}</p>
            <div>
              <button onClick={() => editTask(todoItem.id)}>
                <EditIcon />
              </button>
              <button onClick={() => deleteTask(todoItem.id)}>
                <DeleteIcon />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ShowTask;
