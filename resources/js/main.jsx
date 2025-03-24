import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import { Toaster } from 'react-hot-toast';
import '../css/app.css';
import { CartProvider } from './hooks/useCart';
import { AuthProvider } from './hooks/useAuth';

ReactDOM.createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
    <AuthProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);
