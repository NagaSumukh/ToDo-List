import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const TaskForm = ({ setTasks, selectedTask, setSelectedTask }) => {
  const [title, setTitle] = useState("");
  const { authData } = useContext(AuthContext);

  useEffect(() => {
    if (selectedTask) {
      setTitle(selectedTask.title);
    }
  }, [selectedTask]);

  const addTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      const response = await axios.post(
        "http://localhost:3333/api/tasks",
        { title },
        {
          headers: { Authorization: `Bearer ${authData.token}` },
        }
      );
      setTasks((tasks) => [...tasks, response.data]);
      setTitle("");
    } catch (error) {
      console.log("Error while adding task to db ", error);
    }
  };

  const updateTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      const response = await axios.put(
        `http://localhost:3333/api/tasks/${selectedTask._id}`,
        { title },
        {
          headers: { Authorization: `Bearer ${authData.token}` },
        }
      );
      setTasks((tasks) =>
        tasks.map((task) =>
          task._id === selectedTask._id ? response.data : task
        )
      );
      setTitle("");
      setSelectedTask(null);
    } catch (error) {
      console.log("Error while updating task in db ", error);
    }
  };

  return (
    <form onSubmit={selectedTask ? updateTask : addTask} className="mb-3">
      <div className="input-group">
        <input
          type="text"
          value={title}
          className="form-control"
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">
          {selectedTask ? "Update" : "Add"}
        </button>
        {selectedTask && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              setSelectedTask(null);
              setTitle("");
            }}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TaskForm;
