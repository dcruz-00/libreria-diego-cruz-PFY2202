// Formateador de pesos chilenos: 18990 → "$18.990". Se crea una sola vez y se reutiliza.
const formatoCLP = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
})

export function formatearPrecio(valor) {
  return formatoCLP.format(valor)
}