import React from "react";
import { useAuth } from "../context/AuthContext";

const tenantThemes: Record<string, { backgroundColor: string; color: string }> = {
  "1": { backgroundColor: "#cce0ff", color: "#001a33" }, // tenant 1
  "2": { backgroundColor: "#ffe0e0", color: "#330000" }, // tenant 2
  "3": { backgroundColor: "#e0ffe0", color: "#003300" }, // tenant 3
};


// Default theme when tenantId is missing or invalid
const defaultTheme = { backgroundColor: "#ffffff", color: "#000000" };

export const TenantThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { tenantId } = useAuth(); // ✅ use tenantId instead of tenant

  // Pick the theme for this tenant or fallback
  const theme = tenantThemes[tenantId || ""] || defaultTheme;

  const style: React.CSSProperties = {
    backgroundColor: theme.backgroundColor,
    color: theme.color,
    minHeight: "100vh",
    transition: "background-color 0.3s ease",
  };

  return <div style={style}>{children}
  <p style={{ padding: 10 }}>Current Tenant: {tenantId}</p>
</div>;
};
