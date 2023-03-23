import React from "react";
import uniqid from "uniqid";

const AddTask = ({
  task,
  setTask,
  taskList,
  setTaskList,
  editMode,
  setEditMode,
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
      />
      {editMode ? <button>Edit</button> : <button>Add</button>}
    </form>
  );
};

export default AddTask;
