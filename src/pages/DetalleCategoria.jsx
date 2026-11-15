import { Link, useParams } from 'react-router'
import { obtenerCategoria } from '../api/categorias.js'
import Cargando from '../components/Cargando.jsx'
import EstadoVacio from '../components/EstadoVacio.jsx'
import MensajeError from '../components/MensajeError.jsx'
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

      {cargando && <Cargando mensaje="Cargando libros…" />}

      {error && (
        <MensajeError
          error={error}
          onReintentar={reintentar}
          alternativa={{ to: '/categorias', texto: 'Ver las categorías disponibles' }}
        />
      )}

      {categoria && (
        <>
          <h1 className="mt-4 mb-2 text-2xl font-bold">{categoria.nombre}</h1>
          <p className="mb-6 text-texto-suave">{categoria.descripcion}</p>

          {categoria.libros.length === 0 ? (
            <EstadoVacio mensaje="Esta categoría todavía no tiene libros.">
              <Link to="/categorias" className="font-semibold text-primario underline">
                Explorar otras categorías
              </Link>
            </EstadoVacio>
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