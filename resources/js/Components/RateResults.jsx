export default function RateResults({ rates }) {
    if (!rates || rates.length === 0) {
      return null;
    }
  
    return (
      <div className="bg-white mt-6 p-6 rounded-2xl shadow space-y-4">
        <h2 className="text-lg font-semibold text-gray-800">Tarifas Disponibles</h2>
        <ul className="divide-y divide-gray-200">
          {rates.map((rate, idx) => (
            <li key={idx} className="py-2">
              <p className="text-sm text-gray-800 font-medium">
                {rate.name}: <span className="text-indigo-600">${rate.price.toLocaleString()}</span>
              </p>
              {rate.description && (
                <p className="text-xs text-gray-500">{rate.description}</p>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
  