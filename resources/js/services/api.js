import axios from 'axios';

const api = axios.create({
  baseURL: '/api/v1',
  withCredentials: true, 
});

/**
 * Obtiene la configuración regional (regiones y comunas)
 * @returns {Promise}
 */
export const fetchRegions = () => api.get('/regions');

export const fetchHistory = (region = '', days = 4) => {
    const params = new URLSearchParams();
  
    if (region) params.append('region', region);
    if (days) params.append('days', days);
  
    return api.get(`/history?${params.toString()}`);
  };
/**
 * Consulta tarifas disponibles para una ubicación y productos.
 * @param {string} region - Región seleccionada.
 * @param {string} comuna - Comuna seleccionada.
 * @param {Array} products - Lista de productos.
 * @returns {Promise}
 */
export const getRates = (region, comuna, products) => {
    return api.post('/rates', {
      region,
      comuna,
      products,
    });
  };
