import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { TenantThemeProvider } from "./context/TenantThemeContext";
import { Login } from "./pages/Login";
import { Tasks } from "./pages/Tasks";
import { Admin } from "./pages/Admin";
import { Unauthorized } from "./pages/Unauthorized";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { Signup } from "./pages/Signup";
import DarkProfessionalTheme from "./themes/DarkProfessionalTheme";

function App() {
  return (
    <AuthProvider>
      <TenantThemeProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/admin2" element={<DarkProfessionalTheme />} />

            {/* USER/ADMIN can view tasks */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Tasks />
                </ProtectedRoute>
              }
            />

            {/* Only ADMIN */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute requiredRole="ADMIN">
                  <Admin />
                </ProtectedRoute>
              }
            />
          </Routes>
      </TenantThemeProvider>
    </AuthProvider>
  );
}

export default App;
