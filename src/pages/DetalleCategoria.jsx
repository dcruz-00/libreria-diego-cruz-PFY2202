import { Link, useParams } from 'react-router'

// Página /categorias/:id. En el paso 6 pedirá la categoría a GET /api/categorias/:id.
function DetalleCategoria() {
  // useParams devuelve los parámetros dinámicos de la URL: en /categorias/fantasia, id = "fantasia".
  const { id } = useParams()

  return (
    <section>
      <Link to="/categorias" className="font-semibold text-primario underline">
        ← Volver a categorías
      </Link>
      <h1 className="mt-4 mb-2 text-2xl font-bold">Categoría: {id}</h1>
    </section>
  )
}

export default DetalleCategoria