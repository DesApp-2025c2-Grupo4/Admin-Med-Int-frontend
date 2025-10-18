export function formatearTelefono(input) {
  // Elimina todo lo que no sea número
  const soloNumeros = input.replace(/\D/g, '');

  // Divide en bloques
  const parte1 = soloNumeros.slice(0, 2);   // Código de área (ej: 11)
  const parte2 = soloNumeros.slice(2, 8);   // Parte media (6 dígitos)
  const parte3 = soloNumeros.slice(8, 14);  // Parte final (6 dígitos)

  let resultado = parte1;
  if (parte2) resultado += '-' + parte2;
  if (parte3) resultado += '-' + parte3;

  return resultado;
}