import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import TaskForm from "./TaskForm";
import { useNavigate } from "react-router-dom";
import "./todoList.css";

const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const { authData, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      if (!authData || !authData.token) {
        console.log("No auth data available");
        return;
      }
      console.log("Fetching tasks with token:", authData.token);
      try {
        const response = await axios.get("http://localhost:3333/api/tasks", {
          headers: { Authorization: `Bearer ${authData.token}` },
        });
        setTasks(response.data);
      } catch (e) {
        console.log("Error while fetching data ", e);
      }
    };
    fetchTasks();
  }, [authData]);

  const handleDelete = async (id) => {
    console.log("Deleting task with id:", id);
    if (!authData || !authData.token) {
      console.log("No auth data available");
      return;
    }

    try {
      await axios.delete(`http://localhost:3333/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${authData.token}` },
      });
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (e) {
      console.log("Error while deleting the data ", e);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleEdit = (task) => {
    setSelectedTask(task);
  };

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundImage: "url('/background.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    flexDirection: "column",
    paddingTop: "60px",
  };

  return (
    <div style={containerStyle}>
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top w-100">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">To Do List</span>
          <button onClick={handleLogout} className="btn btn-outline-danger">
            Logout
          </button>
        </div>
      </nav>
      <div className="content-container">
        <h2>My Tasks</h2>
        <TaskForm
          setTasks={setTasks}
          selectedTask={selectedTask}
          setSelectedTask={setSelectedTask}
        />
        <ul className="list-group">
          {tasks.map((task) => (
            <li
              key={task._id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {task.title}
              <div>
                <button
                  onClick={() => handleEdit(task)}
                  className="btn btn-secondary btn-sm mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ToDoList;
