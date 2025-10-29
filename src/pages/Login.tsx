import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/api";
import { AuthContext } from "../context/AuthContext";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axiosInstance.post("/auth/login", { username, password });
      const { token } = res.data;

      // decode JWT to get tenantId and role
      const payload = JSON.parse(atob(token.split(".")[1]));
      const tenantId = payload.tenantId;
      const role = payload.role;

      auth?.login(token, tenantId, role);
      navigate("/dashboard");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
      <button onClick={() => navigate("/signup")}>Signup</button>
    </div>
  );
};
