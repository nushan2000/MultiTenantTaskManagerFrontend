import { createContext, useState, ReactNode, useContext } from "react";

interface AuthContextType {
  token: string | null;
  tenantId: string | null;
  role: string | null;
  login: (token: string, tenantId: string, role: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [tenantId, setTenantId] = useState<string | null>(localStorage.getItem("tenantId"));
  const [role, setRole] = useState<string | null>(localStorage.getItem("role"));

  const login = (token: string, tenantId: string, role: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("tenantId", tenantId);
    localStorage.setItem("role", role);
    setToken(token);
    setTenantId(tenantId);
    setRole(role);
  };

  const logout = () => {
    localStorage.clear();
    setToken(null);
    setTenantId(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ token, tenantId, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Add this helper hook at the bottom
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
