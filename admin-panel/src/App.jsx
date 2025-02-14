import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';
import Navbar from './components/Navbar';
import LoginPanel from './components/LoginPanel';
import Dashboard from './components/Dashboard';

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

function App() {
  const [apiKey, setApiKey] = useState('');
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchApiKey();
    fetchUsers();
  }, []);

  const fetchApiKey = async () => {
    try {
      const response = await axios.get('/admin/api-key');
      setApiKey(response.data);
    } catch (error) {
      console.error('Error fetching API key:', error);
    }
  };

  const updateApiKey = async () => {
    const newApiKey = prompt('Enter the new API key:');
    if (newApiKey) {
      try {
        const response = await axios.post('/admin/api-key', { key: newApiKey });
        alert(response.data);
        fetchApiKey();
      } catch (error) {
        console.error('Error updating API key:', error);
      }
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/users');
      setUsers(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching users:', error);
      setUsers([]);
    }
  };

  const deleteUser = async (chatId) => {
    try {
      const response = await axios.delete(`/users/${chatId}`);
      alert(response.data.message);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const userInfo = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        });
        setUser(userInfo.data);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    },
    onError: () => console.error('Login Failed'),
  });

  const logout = () => setUser(null);

  return (
    <div>
      <Navbar user={user} onLogout={logout} />
      <div className="max-w-3xl mx-auto p-6">
        {!user ? (
          <LoginPanel onLogin={login} />
        ) : (
          <Dashboard
            apiKey={apiKey}
            users={users}
            onUpdateApiKey={updateApiKey}
            onDeleteUser={deleteUser}
          />
        )}
      </div>
    </div>
  );
}

export default App;
