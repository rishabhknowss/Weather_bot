import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import {
  Container,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Link,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

// Set the Axios base URL using environment variables
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

  const deleteUser = async (chatId) => {
    try {
      const response = await axios.delete(`/users/${chatId}`);
      alert(response.data.message);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
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
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>Weather Admin Dashboard</Typography>

      {!user ? (
        <Button variant="contained" color="primary" onClick={login} style={{ marginBottom: '20px' }}>
          Login with Google
        </Button>
      ) : (
        <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
          <Typography variant="h6">Welcome, {user.name}!</Typography>
          <Typography variant="body2">Email: {user.email}</Typography>
          <Button variant="outlined" color="secondary" onClick={logout} style={{ marginTop: '10px' }}>
            Logout
          </Button>
        </Paper>
      )}

      {user && (
        <>
          <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
            <Typography variant="h5" gutterBottom>Manage API Key</Typography>
            <Typography variant="body1" gutterBottom>Current API Key: {apiKey}</Typography>
            <Button variant="contained" color="primary" onClick={updateApiKey} style={{ marginTop: '10px' }}>
              Update API Key
            </Button>
          </Paper>

          <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h5" gutterBottom>Current Users</Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Username</TableCell>
                    <TableCell>Chat ID</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.length > 0 ? (
                    users.map((user) => (
                      <TableRow key={user.chatId}>
                        <TableCell>{user.username}</TableCell>
                        <TableCell>{user.chatId}</TableCell>
                        <TableCell>
                          <IconButton aria-label="delete" onClick={() => deleteUser(user.chatId)}>
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3} style={{ textAlign: 'center' }}>No users found.</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </>
      )}

      <Typography variant="body2" style={{ marginTop: '20px' }}>
        You can find the bot at: <Link href="https://telegram-link-to-bot" target="_blank" rel="noopener noreferrer">https://telegram-link-to-bot</Link>
      </Typography>
    </Container>
  );
}

export default function WrappedApp() {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  if (!clientId) {
    console.error('Google Client ID is not defined.');
    return null;
  }

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <App />
    </GoogleOAuthProvider>
  );
}
