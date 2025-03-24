import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);

  const login = async (credentials) => {
    await axios.get('/sanctum/csrf-cookie', { withCredentials: true });
    const response = await axios.post('/api/login', credentials, { withCredentials: true });
    setUser(response.data.data.user);
  };
  const logout = async () => {
    await axios.post('/api/logout', {}, { withCredentials: true });
    setUser(null); 
  };

  const fetchUser = async () => {
    try {
      const response = await axios.get('/api/v1/user', { withCredentials: true });
      setUser(response.data);
    } catch {
      setUser(null);
    } finally {
      setChecking(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, checking }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
