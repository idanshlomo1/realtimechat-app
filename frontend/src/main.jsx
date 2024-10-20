import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext'; // Import the context provider
import { SocketContextProvider } from './context/SocketContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <SocketContextProvider>

        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SocketContextProvider>
    </AuthContextProvider>
  </StrictMode>
);
