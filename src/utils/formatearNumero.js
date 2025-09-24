export function formatearNumero(numero){
  // Funcion que coloca los puntos de las unidades y comas utilizando el formato alemán.
  return Number(numero).toLocaleString('de-DE')
}