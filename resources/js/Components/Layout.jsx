import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/hooks/useCart';
import { ShoppingCart } from 'lucide-react';
import CartDropdown from './CartDropdown';

export default function Layout({ children, onConsultar }) {
  const { user, logout } = useAuth(); // <-- aquí
  const { items, toggleCart } = useCart();

  const handleLogout = async () => {
    try {
      await logout();
      // Opcional: redirigir a login si quieres
      window.location.href = '/login';
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      {/* Header */}
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-indigo-700">Cotizador de Envíos</h1>

        <div className="flex items-center gap-4">
          {/* Ejemplo de info usuario */}
          {user ? (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700">
                Bienvenido, <strong>{user.name || 'SinNombre'}</strong>
              </span>
              <button
                onClick={handleLogout}
                className="text-sm bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <a
              href="/login"
              className="text-indigo-600 hover:text-indigo-700 font-medium"
            >
              Iniciar sesión
            </a>
          )}

          {/* Ícono de carrito */}
          <div className="relative">
            <button onClick={toggleCart} className="relative">
              <ShoppingCart className="w-6 h-6 text-gray-700" />
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-1">
                  {items.length}
                </span>
              )}
            </button>
            <CartDropdown onConsultar={onConsultar} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-6 space-y-6">{children}</main>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-400 mt-10">
        &copy; {new Date().getFullYear()} Amplifica Cotizador
      </footer>
    </div>
  );
}
