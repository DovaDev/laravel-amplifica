import { useCart } from '@/hooks/useCart';
import { Trash2 } from 'lucide-react';

export default function CartDropdown({ onConsultar }) {
    const { items, removeItem, isOpen, toggleCart } = useCart();

    console.log(items)
    if (!isOpen) return null;

    return (
        <div className="absolute right-0 mt-2 w-80 bg-white shadow-xl rounded-xl p-4 z-50">
            <div className="flex justify-between items-center mb-2">
                <h2 className="font-semibold text-lg">Tu Carrito</h2>
                <button
                    onClick={toggleCart}
                    className="text-sm text-gray-400 hover:text-gray-600"
                >
                    ✕
                </button>
            </div>

            {items.length === 0 ? (
                <p className="text-gray-500 text-sm">El carrito está vacío.</p>
            ) : (
                <ul className="divide-y divide-gray-200 max-h-64 overflow-y-auto">
                    {items.map((item, i) => (
                        <li key={i} className="py-2 text-sm flex justify-between items-start">
                            <div className="pr-2">
                                <p className="text-gray-700 font-medium">
                                    {item.quantity} x {item.weight}kg
                                </p>
                                <p className="text-xs text-gray-500">
                                    Dimensiones: {item.width ?? '-'}x{item.height ?? '-'}x{item.length ?? '-'}
                                </p>
                            </div>
                            <button
                                onClick={() => removeItem(i)}
                                className="text-red-500 hover:text-red-700"
                            >
                                <Trash2 size={16} />
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            {items.length > 0 && (
                <button
                    onClick={() => {
                        onConsultar();
                        toggleCart();
                    }}
                    className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
                >
                    Consultar Tarifas
                </button>
            )}
        </div>
    );
}
