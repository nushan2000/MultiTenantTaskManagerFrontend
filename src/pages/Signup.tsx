import React, { useState } from "react";
import axios from "axios";

export const Signup = () => {
  const [form, setForm] = useState({
    tenantName: "",
    adminUsername: "",
    adminPassword: "",
    adminEmail: ""
  });
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/tenants/signup", form);
      setMessage("Tenant created successfully! You can now log in.");
    } catch (err) {
      setMessage("Error creating tenant");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl mb-4">Tenant Signup</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-80">
        <input name="tenantName" placeholder="Tenant Name" onChange={handleChange} />
        <input name="adminUsername" placeholder="Admin Username" onChange={handleChange} />
        <input type="password" name="adminPassword" placeholder="Password" onChange={handleChange} />
        <input name="adminEmail" placeholder="Admin Email" onChange={handleChange} />
        <button className="bg-blue-500 text-white py-2 rounded">Signup</button>
      </form>
      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
};
