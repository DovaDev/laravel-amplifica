import { useCart } from '@/hooks/useCart';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function ProductForm() {
  const { addItem } = useCart();
  const [form, setForm] = useState({
    quantity: 1,
    weight: '',
    width: '',
    height: '',
    length: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const parseDimension = (val) => val.trim() === '' ? null : parseFloat(val);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.weight || !form.quantity) return;

    const item = {
      quantity: parseInt(form.quantity),
      weight: parseFloat(form.weight),
      width: parseDimension(form.width),
      height: parseDimension(form.height),
      length: parseDimension(form.length)
    };

    addItem(item);
    toast.success('Producto agregado al carrito');
    setForm({ quantity: 1, weight: '', width: '', height: '', length: '' });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-2xl shadow space-y-4"
    >
      <h2 className="text-lg font-semibold text-gray-800">Agregar Producto</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm text-gray-600">Cantidad</label>
          <input
            type="number"
            name="quantity"
            min="1"
            value={form.quantity}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600">Peso (kg)</label>
          <input
            type="number"
            step="0.01"
            name="weight"
            value={form.weight}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600">Ancho (opcional)</label>
          <input
            type="text"
            name="width"
            value={form.width}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600">Alto (opcional)</label>
          <input
            type="text"
            name="height"
            value={form.height}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600">Largo (opcional)</label>
          <input
            type="text"
            name="length"
            value={form.length}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>

      <button
        type="submit"
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded-lg transition"
      >
        Agregar al Carrito
      </button>
    </form>
  );
}
