import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App';

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
