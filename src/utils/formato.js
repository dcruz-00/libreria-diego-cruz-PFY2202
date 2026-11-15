// Formateador de pesos chilenos: 18990 → "$18.990". Se crea una sola vez y se reutiliza.
const formatoCLP = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
})

export function formatearPrecio(valor) {
  return formatoCLP.format(valor)
}

// Reglas de plural del español según Intl. select(n) devuelve una categoría:
// "one" para 1 y "other" (o "many" en cifras como 1.000.000) para el resto, incluido el 0.
const reglasPlural = new Intl.PluralRules('es-CL')

// pluralizar(1, 'libro', 'libros') → "1 libro"; pluralizar(3, 'libro', 'libros') → "3 libros".
export function pluralizar(cantidad, singular, plural) {
  const palabra = reglasPlural.select(cantidad) === 'one' ? singular : plural
  return `${cantidad} ${palabra}`
}