import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axiosInstance from "../api/api";
// Mock data for demonstration

interface Task {
  id: number;
  title: string;
  description: string;
}

// Mock data for demonstration
const mockTasks = [
  { id: 1, title: "Complete Project Proposal", description: "Draft and submit Q4 proposal" },
  { id: 2, title: "Review Code Changes", description: "Review PR #234 and provide feedback" },
];

const mockUsers = [
  { id: 1, username: "john_doe", email: "john@example.com", role: "ADMIN" },
  { id: 2, username: "jane_smith", email: "jane@example.com", role: "USER" },
];
interface ModernGlassThemeProps {
  children?: React.ReactNode;
}
export default function ModernGlassTheme({ children }: ModernGlassThemeProps) {
  const [tasks, setTasks] = useState(mockTasks);
  const [users, setUsers] = useState(mockUsers);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const auth = useContext(AuthContext)!;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500">
      {/* Navbar */}
      <nav className="backdrop-blur-md bg-white/10 border-b border-white/20 px-4 sm:px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-white text-xl sm:text-2xl font-bold">Admin Portal</h1>
          <div className="text-white text-sm sm:text-base">
            <span className="hidden sm:inline">Tenant: </span>
            <span className="font-semibold">{auth.tenantId}</span>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header Card */}
        <div className="backdrop-blur-md bg-white/10 rounded-2xl p-4 sm:p-6 mb-6 border border-white/20 shadow-xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Task Management</h2>
          <p className="text-white/80 text-sm sm:text-base">Role: <span className="font-semibold">{auth.role}</span></p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Create Task Card */}
          {auth.role === "ADMIN" && (
            <div className="backdrop-blur-md bg-white/10 rounded-2xl p-4 sm:p-6 border border-white/20 shadow-xl">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">Create New Task</h3>
              <div className="space-y-3">
                <input
                  placeholder="Task Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <input
                  placeholder="Task Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <button className="w-full bg-white text-purple-600 font-semibold px-6 py-3 rounded-xl hover:bg-white/90 transition-all shadow-lg">
                  Create Task
                </button>
              </div>
            </div>
          )}

          {/* Tasks List */}
          <div className="backdrop-blur-md bg-white/10 rounded-2xl p-4 sm:p-6 border border-white/20 shadow-xl">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">Active Tasks</h3>
            <div className="space-y-3">
              {tasks.map((task) => (
                <div key={task.id} className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                    <div className="flex-1">
                      <h4 className="text-white font-semibold text-base sm:text-lg">{task.title}</h4>
                      <p className="text-white/70 text-sm mt-1">{task.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="flex-1 sm:flex-none bg-yellow-400 text-yellow-900 font-medium px-4 py-2 rounded-lg hover:bg-yellow-300 transition-all text-sm">
                        Edit
                      </button>
                      <button className="flex-1 sm:flex-none bg-red-500 text-white font-medium px-4 py-2 rounded-lg hover:bg-red-400 transition-all text-sm">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Create User Card */}
          {auth.role === "ADMIN" && (
            <div className="backdrop-blur-md bg-white/10 rounded-2xl p-4 sm:p-6 border border-white/20 shadow-xl">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">Create New User</h3>
              <div className="space-y-3">
                <input
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <input
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <input
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <input
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <button className="w-full bg-white text-purple-600 font-semibold px-6 py-3 rounded-xl hover:bg-white/90 transition-all shadow-lg">
                  Create User
                </button>
              </div>
            </div>
          )}

          {/* Users List */}
          <div className="backdrop-blur-md bg-white/10 rounded-2xl p-4 sm:p-6 border border-white/20 shadow-xl">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">Tenant Users</h3>
            <div className="space-y-3">
              {users.map((user) => (
                <div key={user.id} className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                    <div className="flex-1">
                      <h4 className="text-white font-semibold text-base sm:text-lg">{user.username}</h4>
                      <p className="text-white/70 text-sm">{user.role}</p>
                      <p className="text-white/70 text-sm">{user.email}</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="flex-1 sm:flex-none bg-yellow-400 text-yellow-900 font-medium px-4 py-2 rounded-lg hover:bg-yellow-300 transition-all text-sm">
                        Edit
                      </button>
                      <button className="flex-1 sm:flex-none bg-red-500 text-white font-medium px-4 py-2 rounded-lg hover:bg-red-400 transition-all text-sm">
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
  );
}