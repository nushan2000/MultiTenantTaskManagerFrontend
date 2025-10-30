import { useContext } from 'react';
import { Navbar } from '../components/NavBar';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';


export const Tasks = () => {
  const auth = useContext(AuthContext)!;
  const role = auth.role;
  const navigate = useNavigate();

  const handleNavigateToAdmin = () => {
    navigate("/admin");
    // navigation logic to admin page
  }
return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Header section */}
        <div className="px-4 py-5 sm:px-6 bg-white shadow-sm rounded-lg mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Tasks Dashboard</h2>
              <p className="mt-1 text-sm text-gray-500">
                Manage and view your tasks here
              </p>
            </div>
            {role === "ADMIN" && (
              <button
                onClick={handleNavigateToAdmin}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <svg 
                  className="-ml-1 mr-2 h-5 w-5" 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
                Admin Dashboard
              </button>
            )}
          </div>
        </div>

        {/* Tasks Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Sample Task Card - You can map over your tasks here */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="w-0 flex-1">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-green-400"></div>
                    <p className="ml-2 text-sm font-medium text-gray-900">In Progress</p>
                  </div>
                  <h3 className="mt-3 text-lg font-medium text-gray-900">Sample Task</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    This is a sample task card. Replace with your actual task data.
                  </p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-end space-x-2">
                <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200">
                  View
                </button>
                {role === "ADMIN" && (
                  <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200">
                    Delete
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Add Task Card (visible only to admins) */}
          {role === "ADMIN" && (
            <div className="bg-gray-50 overflow-hidden shadow rounded-lg border-2 border-dashed border-gray-300 p-6">
              <div className="flex items-center justify-center h-full">
                <button className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900">
                  <svg className="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add New Task
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

