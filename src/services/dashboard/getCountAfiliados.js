export const getCountAfiliados = async () => {
  const res = await fetch('http://localhost:4000/persona')
  const data = await res.json()
  const size = Object.keys(data).length
  //Despues reemplazar por la logica
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(size); // simula respuesta del backend
    }, 1000);
  });
};