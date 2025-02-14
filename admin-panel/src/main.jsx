import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import WrappedApp from './WrappedApp.jsx'; // Import WrappedApp, not App

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WrappedApp />
  </StrictMode>
);
