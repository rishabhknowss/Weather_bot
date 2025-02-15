import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import LoginPanel from "./components/LoginPanel";
import Dashboard from "./components/Dashboard";

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

function App() {
  const [apiKey, setApiKey] = useState("");
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchApiKey();
    fetchUsers();
  }, []);

  const fetchApiKey = async () => {
    try {
      const response = await axios.get("/admin/api-key");
      setApiKey(response.data);
    } catch (error) {
      console.error("Error fetching API key:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/users");
      setUsers(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]);
    }
  };

  const updateApiKey = async (newApiKey) => {
    try {
      const response = await axios.post("/admin/api-key", { key: newApiKey });
      alert(response.data);
      setApiKey(newApiKey);
    } catch (error) {
      console.error("Error updating API key:", error);
    }
  };

  const deleteUser = async (chatId) => {
    try {
      const response = await axios.delete(`/users/${chatId}`);
      alert(response.data.message);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const onLogin = (userData) => {
    setUser(userData);
  };

  const onLogout = () => {
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-300">
      <Navbar user={user} onLogout={onLogout} />
      <div className="mx-auto p-4 sm:p-6">
        {!user ? (
          <LoginPanel onLogin={onLogin} />
        ) : (
          <Dashboard apiKey={apiKey} users={users} onUpdateApiKey={updateApiKey} onDeleteUser={deleteUser} />
        )}
      </div>
    </div>
  );
}

export default App;
