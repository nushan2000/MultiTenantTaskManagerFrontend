import React from "react";
import { useAuth } from "../context/AuthContext";

const tenantThemes: Record<string, { backgroundColor: string; color: string }> = {
  tenant1: { backgroundColor: "#f0f4ff", color: "#003366" },
  tenant2: { backgroundColor: "#fff0f0", color: "#660000" },
  tenant3: { backgroundColor: "#f0fff0", color: "#004400" },
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

  return <div style={style}>{children}</div>;
};
