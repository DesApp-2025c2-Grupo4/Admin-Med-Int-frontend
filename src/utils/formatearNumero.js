export function formatearNumero(numero){
  // Funcion que coloca los puntos de las unidades y comas utilizando el formato alemán.
  if(isNaN(numero)) return numero
  return Number(numero).toLocaleString('de-DE')
}