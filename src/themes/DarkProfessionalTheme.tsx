import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axiosInstance from "../api/api";
// Mock data for demonstration

interface Task {
  id: number;
  title: string;
  description: string;
}

// const mockTasks = [
//   { id: 1, title: "Complete Project Proposal", description: "Draft and submit Q4 proposal" },
//   { id: 2, title: "Review Code Changes", description: "Review PR #234 and provide feedback" },
// ];

// const mockUsers = [
//   { id: 1, username: "john_doe", email: "john@example.com", role: "ADMIN" },
//   { id: 2, username: "jane_smith", email: "jane@example.com", role: "USER" },
// ];

interface DarkProfessionalThemeProps {
  children?: React.ReactNode;
}

const DarkProfessionalTheme: React.FC<DarkProfessionalThemeProps> = ({ children }) => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
 const auth = useContext(AuthContext)!;
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
    <div className="min-h-screen bg-gray-900">
      {/* Navbar */}
      <nav className="bg-gray-800 border-b border-gray-700 px-4 sm:px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
            <h1 className="text-white text-2xl sm:text-3xl font-bold">Admin Dashboard</h1>
            <div className="flex items-center gap-4">
              <span className="text-gray-400 text-sm">Tenant:</span>
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">{auth.tenantId}</span>
              <span className="bg-emerald-600 text-white px-3 py-1 rounded-full text-sm font-medium">{auth.role}</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Main Grid */}
        <div className="space-y-6">
          {/* Task Section */}
          <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 sm:px-6 py-4">
              <h2 className="text-xl sm:text-2xl font-bold text-white">Task Management</h2>
            </div>
            
            <div className="p-4 sm:p-6">
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {/* Create Task */}
                {auth.role === "ADMIN" && (
                  <div className="bg-gray-900 rounded-lg p-4 sm:p-6 border border-gray-700">
                    <h3 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      Create New Task
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-gray-400 text-sm mb-2">Task Title</label>
                        <input
                          placeholder="Enter task title"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-400 text-sm mb-2">Description</label>
                        <input
                          placeholder="Enter task description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors mt-2">
                        Create Task
                      </button>
                    </div>
                  </div>
                )}

                {/* Tasks List */}
                <div className="bg-gray-900 rounded-lg p-4 sm:p-6 border border-gray-700">
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                    Active Tasks ({tasks.length})
                  </h3>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {tasks.map((task) => (
                      <div key={task.id} className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-colors">
                        <div className="flex flex-col gap-3">
                          <div>
                            <h4 className="text-white font-semibold text-base mb-1">{task.title}</h4>
                            <p className="text-gray-400 text-sm">{task.description}</p>
                          </div>
                          <div className="flex gap-2 pt-2 border-t border-gray-700">
                            <button className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white font-medium px-4 py-2 rounded text-sm transition-colors">
                              Edit
                            </button>
                            <button className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded text-sm transition-colors">
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* User Section */}
          <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 px-4 sm:px-6 py-4">
              <h2 className="text-xl sm:text-2xl font-bold text-white">User Management</h2>
            </div>
            
            <div className="p-4 sm:p-6">
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {/* Create User */}
                {auth.role === "ADMIN" && (
                  <div className="bg-gray-900 rounded-lg p-4 sm:p-6 border border-gray-700">
                    <h3 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                      Create New User
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-gray-400 text-sm mb-2">Username</label>
                        <input
                          placeholder="Enter username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-400 text-sm mb-2">Email</label>
                        <input
                          placeholder="Enter email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-400 text-sm mb-2">Password</label>
                        <input
                          placeholder="Enter password"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-400 text-sm mb-2">Full Name</label>
                        <input
                          placeholder="Enter full name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                        />
                      </div>
                      <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors mt-2">
                        Create User
                      </button>
                    </div>
                  </div>
                )}

                {/* Users List */}
                <div className="bg-gray-900 rounded-lg p-4 sm:p-6 border border-gray-700">
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    Tenant Users ({users.length})
                  </h3>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {users.map((user) => (
                      <div key={user.id} className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-colors">
                        <div className="flex flex-col gap-3">
                          <div>
                            <h4 className="text-white font-semibold text-base mb-1">{user.username}</h4>
                            <p className="text-gray-400 text-sm">{user.email}</p>
                            <span className="inline-block bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs mt-2">
                              {user.role}
                            </span>
                          </div>
                          <div className="flex gap-2 pt-2 border-t border-gray-700">
                            <button className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white font-medium px-4 py-2 rounded text-sm transition-colors">
                              Edit
                            </button>
                            <button className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded text-sm transition-colors">
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DarkProfessionalTheme;