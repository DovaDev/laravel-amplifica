import { useEffect, useState } from 'react';
import { fetchRegions, fetchHistory } from '@/services/api';
import { ShieldCheck, AlertCircle } from 'lucide-react';

export default function AdminHistoryPage() {
  const [histories, setHistories] = useState([]);
  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [days, setDays] = useState(4);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRegions()
      .then(res => setRegions(res.data.data))
      .catch(err => console.error('Error al obtener regiones:', err));
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchHistory(selectedRegion, days)
      .then(res => setHistories(res.data.data))
      .catch(err => console.error('Error al obtener el historial:', err))
      .finally(() => setLoading(false));
  }, [selectedRegion, days]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <ShieldCheck className="text-indigo-600" />
        Historial de Tarifas
      </h1>

      {/* Filtros */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Región</label>
          <select
            value={selectedRegion}
            onChange={e => setSelectedRegion(e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 p-2"
          >
            <option value="">Todas las regiones</option>
            {regions.map(region => (
              <option key={region.region} value={region.region}>
                {region.region}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Últimos días</label>
          <select
            value={days}
            onChange={e => setDays(Number(e.target.value))}
            className="mt-1 w-full rounded-md border border-gray-300 p-2 pr-10"
          >
            {[1, 3, 7, 15, 30].map(option => (
              <option key={option} value={option}>
                Últimos {option} días
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Resultados */}
      {loading ? (
        <p className="text-gray-600">Cargando historial...</p>
      ) : histories.length === 0 ? (
        <p className="text-gray-500 flex items-center gap-2">
          <AlertCircle className="text-yellow-500" />
          No hay registros aún.
        </p>
      ) : (
        <div className="overflow-x-auto bg-white shadow rounded-xl">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="px-4 py-2">Fecha</th>
                <th className="px-4 py-2">Región</th>
                <th className="px-4 py-2">Comuna</th>
                <th className="px-4 py-2"># Productos</th>
                <th className="px-4 py-2">Estado</th>
              </tr>
            </thead>
            <tbody>
              {histories.map((h, i) => (
                <tr key={i} className="border-t">
                  <td className="px-4 py-2">{new Date(h.created_at).toLocaleString()}</td>
                  <td className="px-4 py-2">{h.region}</td>
                  <td className="px-4 py-2">{h.comuna}</td>
                  <td className="px-4 py-2">{h.products.length}</td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${h.status === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {h.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
