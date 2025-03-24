export default function Cart({ items, onRemove }) {
    if (items.length === 0) {
      return <p className="mt-4 text-gray-500 italic">El carrito está vacío.</p>;
    }
  
    return (
      <div className="bg-white mt-6 p-6 rounded-2xl shadow space-y-4">
        <h2 className="text-lg font-semibold text-gray-800">Carrito de Productos</h2>
        <ul className="divide-y divide-gray-200">
          {items.map((item, idx) => (
            <li key={idx} className="py-2 flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-700">
                  <strong>{item.quantity}</strong> x {item.weight}kg
                </p>
                {(item.width || item.height || item.length) && (
                  <p className="text-xs text-gray-500">
                    Dimensiones: {item.width || '-'}x{item.height || '-'}x{item.length || '-'}
                  </p>
                )}
              </div>
              <button
                onClick={() => onRemove(idx)}
                className="text-sm text-red-600 hover:underline"
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  