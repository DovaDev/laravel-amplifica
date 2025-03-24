import { useCallback, useState } from 'react';
import RegionSelector from '@/components/RegionSelector';
import ProductForm from '@/components/ProductForm';
import RateResults from '@/components/RateResults';
import { getRates } from '@/services/api';
import { useCart } from '@/hooks/useCart';
import Layout from '@/Components/Layout';

export default function HomePage() {
    const [ubicacion, setUbicacion] = useState({ region: null, comuna: null });
    const [rates, setRates] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { items, clearCart } = useCart();

    const handleGetRates = useCallback(async () => {
        setError('');
        setRates([]);
        setLoading(true);

        try {
            const response = await getRates(ubicacion.region, ubicacion.comuna, items);
            setRates(response.data.data);
        } catch (err) {
            console.error(err);
            setError('Error al obtener tarifas. Intenta nuevamente.');
        } finally {
            setLoading(false);
        }
    }, [ubicacion, items]);

    return (
        <Layout onConsultar={handleGetRates}>
            <RegionSelector onSelect={setUbicacion} />

            {ubicacion.region && ubicacion.comuna && (
                <>
                    <ProductForm />
                    {error && <p className="text-red-600 mt-4">{error}</p>}
                    <RateResults rates={rates} />
                </>
            )}
        </Layout>
    );
}
