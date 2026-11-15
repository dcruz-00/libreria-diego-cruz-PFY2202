import { Link, useParams } from 'react-router'
import { obtenerCategoria } from '../api/categorias.js'
import { useConsulta } from '../hooks/useConsulta.js'
import { formatearPrecio } from '../utils/formato.js'

// Página /categorias/:id: pide la categoría y sus libros a GET /api/categorias/:id.
function DetalleCategoria() {
  // useParams devuelve los parámetros dinámicos de la URL: en /categorias/fantasia, id = "fantasia".
  const { id } = useParams()
  const { datos: categoria, error, cargando, reintentar } = useConsulta(
    `categoria:${id}`,
    (opciones) => obtenerCategoria(id, opciones),
  )

  return (
    <section>
      <Link to="/categorias" className="font-semibold text-primario underline">
        ← Volver a categorías
      </Link>

      {/* Provisorio: en el paso 7 estos dos bloques pasan a ser componentes reutilizables. */}
      {cargando && <p className="mt-4">Cargando libros…</p>}
      {error && (
        <div className="mt-4">
          <p className="text-error">{error.message}</p>
          {error.reintentable && <button type="button" onClick={reintentar}>Reintentar</button>}
        </div>
      )}

      {categoria && (
        <>
          <h1 className="mt-4 mb-2 text-2xl font-bold">{categoria.nombre}</h1>
          <p className="mb-6 text-texto-suave">{categoria.descripcion}</p>

          {categoria.libros.length === 0 ? (
            <p>Esta categoría todavía no tiene libros.</p>
          ) : (
            <ul className="grid gap-4 sm:grid-cols-2">
              {categoria.libros.map((libro) => (
                <li key={libro.id} className="rounded-lg border border-borde bg-superficie p-4">
                  <h2 className="text-lg font-semibold">{libro.titulo}</h2>
                  <p className="text-sm text-texto-suave">{libro.autor}</p>
                  <p className="mt-2 font-semibold text-primario">{formatearPrecio(libro.precio)}</p>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </section>
  )
}

export default DetalleCategoria