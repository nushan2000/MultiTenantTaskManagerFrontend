import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axiosInstance from "../api/api";
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

interface LightMinimalThemeProps {
  children?: React.ReactNode;
}

export default function LightMinimalTheme({ children }: LightMinimalThemeProps) {
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
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 shadow-sm px-4 sm:px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
            <div>
              <h1 className="text-gray-900 text-2xl sm:text-3xl font-bold">Admin Portal</h1>
              <p className="text-gray-500 text-sm mt-1">Manage your tasks and users efficiently</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-xs text-gray-500">Tenant ID</p>
                <p className="text-sm font-semibold text-gray-900">{auth.tenantId}</p>
              </div>
              <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg text-sm font-medium">
                {auth.role}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Tasks Section */}
        <div className="mb-8">
          <div className="mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Tasks</h2>
            <p className="text-gray-600">Create and manage your team's tasks</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Create Task Card */}
            {auth.role === "ADMIN" && (
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-blue-600 font-bold text-lg">+</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">New Task</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                      <input
                        placeholder="Task title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                      <textarea
                        placeholder="Task description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={3}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      />
                    </div>
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors shadow-sm">
                      Create Task
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Tasks List */}
            <div className={auth.role === "ADMIN" ? "lg:col-span-2" : "lg:col-span-3"}>
              <div className="space-y-4">
                {tasks.map((task) => (
                  <div key={task.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
                    <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                            <span className="text-blue-600 text-sm font-bold">T</span>
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-1">{task.title}</h4>
                            <p className="text-gray-600 text-sm">{task.description}</p>
                          </div>
                        </div>
                      </div>
                      {auth.role === "ADMIN" && (
                        <div className="flex gap-2 sm:flex-col lg:flex-row">
                          <button className="flex-1 sm:flex-none bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-4 py-2 rounded-lg transition-colors text-sm">
                            Edit
                          </button>
                          <button className="flex-1 sm:flex-none bg-red-50 hover:bg-red-100 text-red-600 font-medium px-4 py-2 rounded-lg transition-colors text-sm">
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Users Section */}
        <div>
          <div className="mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Users</h2>
            <p className="text-gray-600">Manage tenant user accounts</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Create User Card */}
            {auth.role === "ADMIN" && (
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <span className="text-emerald-600 font-bold text-lg">+</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">New User</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                      <input
                        placeholder="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        placeholder="user@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                      <input
                        placeholder="••••••••"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      <input
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>
                    <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-6 py-3 rounded-lg transition-colors shadow-sm">
                      Create User
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Users List */}
            <div className={auth.role === "ADMIN" ? "lg:col-span-2" : "lg:col-span-3"}>
              <div className="space-y-4">
                {users.map((user) => (
                  <div key={user.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
                    <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-sm font-bold">{user.username.charAt(0).toUpperCase()}</span>
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900">{user.username}</h4>
                            <p className="text-gray-600 text-sm mb-2">{user.email}</p>
                            <span className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                              {user.role}
                            </span>
                          </div>
                        </div>
                      </div>
                      {auth.role === "ADMIN" && (
                        <div className="flex gap-2 sm:flex-col lg:flex-row">
                          <button className="flex-1 sm:flex-none bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-4 py-2 rounded-lg transition-colors text-sm">
                            Edit
                          </button>
                          <button className="flex-1 sm:flex-none bg-red-50 hover:bg-red-100 text-red-600 font-medium px-4 py-2 rounded-lg transition-colors text-sm">
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}