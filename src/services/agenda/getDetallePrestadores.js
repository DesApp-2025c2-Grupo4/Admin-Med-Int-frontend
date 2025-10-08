export const procesarPrestadores = (prestadoresData) => {
    const PRESTADORES = prestadoresData.map(p => ({
        id: p.prestadorId,
        descripcion: `${p.nombre} ${p.apellido}`
    }));

    const especialidadesSet = new Set();
    prestadoresData.forEach(p => {
        if (p.especialidad && p.especialidad.length > 0) {
            especialidadesSet.add(JSON.stringify({
                id: p.especialidad[0].idEspecialidad,
                descripcion: p.especialidad[0].descripcion
            }));
        }
    });
    const ESPECIALIDADES = Array.from(especialidadesSet).map(s => JSON.parse(s));

    const direccionesSet = new Set();
    prestadoresData.forEach(p => {
        if (p.direccion && p.direccion.length > 0) {
            const dir = p.direccion[0];
            const dirString = `${dir.calle} ${dir.nro}`;
            direccionesSet.add(JSON.stringify({
                id: dir.idDireccion,
                descripcion: dirString
            }));
        }
    });
    const LUGARES_ATENCION = Array.from(direccionesSet).map(s => JSON.parse(s));

    return { PRESTADORES, ESPECIALIDADES, LUGARES_ATENCION };
};


export const fetchPrestadoresData = (listPrestadorMock) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const datosProcesados = procesarPrestadores(listPrestadorMock);
            resolve({
                ...datosProcesados,
                rawList: listPrestadorMock 
            });
        }, 1000); 
    });
};