import React from "react";
import uniqid from "uniqid";

const AddTask = ({
  task,
  setTask,
  taskList,
  setTaskList,
  editMode,
  setEditMode,
  darkMode,
}) => {
  const handleChange = (e) => {
    const userInput = e.target.value;
    setTask({ ...task, name: userInput });
  };

  const addTask = (e) => {
    const date = new Date();
    e.preventDefault();
    if (task.name !== undefined) {
      if (task.id) {
        const date = new Date();
        const updatedTasks = taskList.map((todo) =>
          todo.id === task.id
            ? {
                id: task.id,
                name: task.name,
                time: `${date.toLocaleTimeString()} ${date.toLocaleDateString()}`,
                status: task.status,
              }
            : todo
        );
        setTaskList(updatedTasks);
        setEditMode(false);
        setTask({});
      } else {
        setTaskList((prevTasks) => {
          return [
            {
              id: uniqid(),
              name: e.target.task.value,
              time: `${date.toLocaleTimeString()} ${date.toLocaleDateString()}`,
              status: task.status || "Pending",
            },
            ...prevTasks,
          ];
        });
        setTask({});
      }
    } else {
      return;
    }
  };

  return (
    <form className="input-container" onSubmit={addTask}>
      <input
        type="text"
        placeholder="Add a task..."
        name="task"
        onChange={handleChange}
        value={task.name || ""}
        style={{
          backgroundColor: darkMode && "#404040",
          color: darkMode && "#fff",
        }}
      />
      <select
        className="taskStatus"
        name="status"
        onChange={(e) => setTask({ ...task, status: e.target.value })}
        value={task.status || "Pending"}
      >
        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>
      </select>
      {editMode ? <button>Edit</button> : <button>Add</button>}
    </form>
  );
};

export default AddTask;
