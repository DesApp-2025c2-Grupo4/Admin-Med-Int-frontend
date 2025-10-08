import { useState, useEffect } from 'react';
import { listPrestador } from '../Mock/listPrestadores.js'; 
import { fetchPrestadoresData } from '../services/agenda/getDetallePrestadores.js'; 

const initialDataOptions = {
    PRESTADORES: [],
    ESPECIALIDADES: [],
    LUGARES_ATENCION: [],
    rawList: [],
};

export const useGetPrestadoresNuevaAgenda = () => {
    const [dataOptions, setDataOptions] = useState(initialDataOptions);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const data = await fetchPrestadoresData(listPrestador);
                setDataOptions(data);   
            } catch (err) {
                console.error("Error al cargar datos en el hook:", err);
                setError('Error al cargar la configuración de datos.');
            } finally {
                setIsLoading(false);
            }
        };
        loadData();
    }, []); 
    return { dataOptions, isLoading, error };
};