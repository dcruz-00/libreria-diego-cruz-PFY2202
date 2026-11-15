import { Link } from 'react-router'

function NoEncontrado() {
  return (
    <section>
      <h1 className="mb-2 text-2xl font-bold">Página no encontrada</h1>
      <p className="mb-4">La dirección que buscas no existe.</p>
      <Link to="/" className="font-semibold text-primario underline">Volver al inicio</Link>
    </section>
  )
}

export default NoEncontrado