import { useEffect, useState } from 'react';
import { fetchRegions } from '../services/api';

export default function RegionSelector({ onSelect }) {
    const [regions, setRegions] = useState([]);
    const [selectedRegion, setSelectedRegion] = useState('');
    const [selectedComuna, setSelectedComuna] = useState('');
  
    useEffect(() => {
      fetchRegions()
        .then((res) => setRegions(res.data.data))
        .catch((err) => console.error('Error al obtener regiones:', err));
    }, []);
  
    const handleRegionChange = (e) => {
      const region = regions.find(r => r.region === e.target.value);
      setSelectedRegion(region);
      setSelectedComuna('');
    };
  
    const handleComunaChange = (e) => {
      const comuna = e.target.value;
      setSelectedComuna(comuna);
      if (selectedRegion) {
        onSelect({
          region: selectedRegion.region,
          comuna: comuna,
        });
      }
    };
  
    return (
      <div className="bg-white p-6 rounded-2xl shadow-md space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Región</label>
          <select
            onChange={handleRegionChange}
            className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Seleccione región</option>
            {regions.map((r) => (
              <option key={r.region} value={r.region}>{r.region}</option>
            ))}
          </select>
        </div>
  
        {selectedRegion && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Comuna</label>
            <select
              onChange={handleComunaChange}
              className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Seleccione comuna</option>
              {selectedRegion.comunas.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        )}
      </div>
    );
  }
  