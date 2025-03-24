import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import AdminHistoryPage from './Pages/AdminHistoryPage';
import LoginPage from './Pages/LoginPage';
import { useAuth } from './hooks/useAuth';


function ProtectedRoute({ children, role }) {
  const { user, checking } = useAuth();

  if (checking) return <p className="text-center mt-10">Cargando...</p>;
  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/" />;

  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/login" element={<LoginPage />} />

        <Route path="/" element={<HomePage />} />

        <Route path="/admin/historial" element={<AdminHistoryPage />} />
      </Routes>
    </BrowserRouter>
  );
}
