import React, { useEffect, useState, useContext } from "react";
import axiosInstance from "../api/api";
import { Navbar } from "../components/NavBar";
import { AuthContext } from "../context/AuthContext";

interface Task {
  id: number;
  title: string;
  description: string;
}

export const Admin = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const auth = useContext(AuthContext)!;

  // Fetch tasks when page loads
  useEffect(() => {
    fetchTasks();
    fetchUsers();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axiosInstance.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error("Failed to fetch tasks", err);
      alert("Unauthorized or failed to fetch tasks");
    }
  };

  const handleCreate = async () => {
    if (auth.role !== "ADMIN") {
      alert("Only admins can create tasks!");
      return;
    }

    if (!title || !description) {
      alert("Please fill in all fields");
      return;
    }

    try {
      await axiosInstance.post("/tasks", { title, description });
      setTitle("");
      setDescription("");
      fetchTasks();
    } catch (err) {
      console.error("Failed to create task", err);
      alert("Task creation failed");
    }
  };

  const handleUpdate = async (id: number) => {
    if (auth.role !== "ADMIN") {
      alert("Only admins can update tasks!");
      return;
    }

    const newTitle = prompt("New title:");
    const newDesc = prompt("New description:");
    if (!newTitle || !newDesc) return;

    try {
      await axiosInstance.put(`/tasks/${id}`, {
        title: newTitle,
        description: newDesc,
      });
      fetchTasks();
    } catch (err) {
      console.error("Failed to update task", err);
      alert("Task update failed");
    }
  };

  const handleDelete = async (id: number) => {
    if (auth.role !== "ADMIN") {
      alert("Only admins can delete tasks!");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      await axiosInstance.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      console.error("Failed to delete task", err);
      alert("Task deletion failed");
    }
  };

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [users, setUsers] = useState<any[]>([]);
const handleCreateUser = async () => {
  if (auth.role !== "ADMIN") {
    alert("Only admins can create users!");
    return;
  }

  // const username = prompt("Enter username:");
  // const email = prompt("Enter email:");
  // const password = prompt("Enter password:");

  if (!username || !email || !password || !name) {
    alert("Please fill in all fields");
    return;
  }

  try {
    await axiosInstance.post("/users", { username, email, password , name });
    alert("User created successfully");
  } catch (err) {
    console.error("Failed to create user", err);
    alert("User creation failed");
  }
};
const fetchUsers = async () => {
  try {
    const res = await axiosInstance.get("/users");
    setUsers(res.data);
    return res.data;
  } catch (err) {
    console.error("Failed to fetch users", err);
    alert("User fetching failed");
  }
};

const updateUser = async (id: number) => {
  if (auth.role !== "ADMIN") {
    alert("Only admins can update users!");
    return;
  }
  
}
const deleteUser = async (id: number) => {
    if (auth.role !== "ADMIN") {
      alert("Only admins can delete users!");
      return;
    }
    try {
      await axiosInstance.delete(`/users/${id}`);
      alert("User deleted successfully");
    } catch (err) {
      console.error("Failed to delete user", err);
      alert("User deletion failed");
    }
  };
  return (
    <div>
      <Navbar />
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Admin Task Management</h2>
        <p className="mb-2">
          Tenant: <strong>{auth.tenantId}</strong> | Role:{" "}
          <strong>{auth.role}</strong>
        </p>

        {/* Only ADMIN can create */}
        {auth.role === "ADMIN" && (
          <div className="mb-6 space-y-2">
            <input
              placeholder="Task Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border p-2 w-full rounded"
            />
            <input
              placeholder="Task Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border p-2 w-full rounded"
            />
            <button
              onClick={handleCreate}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Create Task
            </button>
          </div>
        )}

        <h3 className="text-xl font-semibold mb-2">Tenant Tasks</h3>
        <ul className="space-y-3">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="border p-3 rounded flex justify-between items-center"
            >
              <div>
                <b>{task.title}</b>
                <p className="text-gray-600">{task.description}</p>
              </div>
              {auth.role === "ADMIN" && (
                <div className="space-x-2">
                  <button
                    onClick={() => handleUpdate(task.id)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
      {auth.role === "ADMIN" && (
        <div>
          <h3 className="text-xl font-semibold mb-2">Create New User</h3>
        </div>
      )}
      <div className="mb-6 space-y-2">
            <input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border p-2 w-full rounded"
            />
            <input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 w-full rounded"
            />
            <input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-2 w-full rounded"
            />
            <input
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-2 w-full rounded"
            />
            <button
              onClick={handleCreateUser}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Create User
            </button>
            <h3 className="text-xl font-semibold mb-2">Tenant Users</h3>
        <ul className="space-y-3">
          {users && users.map((user) => (
            <li
              key={user.id}
              className="border p-3 rounded flex justify-between items-center"
            >
              <div>
                <b>{user.username}</b>
                <p className="text-gray-600">{user.role}</p>
                <p className="text-gray-600">{user.email}</p>
              </div>
              {auth.role === "ADMIN" && (
                <div className="space-x-2">
                  <button
                    onClick={() => handleUpdate(user.id)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
        
          </div>
    </div>
  );
};
