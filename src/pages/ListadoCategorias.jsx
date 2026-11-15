import { Link } from 'react-router'
import { obtenerCategorias } from '../api/categorias.js'
import Cargando from '../components/Cargando.jsx'
import MensajeError from '../components/MensajeError.jsx'
import { useConsulta } from '../hooks/useConsulta.js'
import { pluralizar } from '../utils/formato.js'

// Página /categorias: pide el listado a GET /api/categorias.
function ListadoCategorias() {
  const { datos: categorias, error, cargando, reintentar } = useConsulta('categorias', obtenerCategorias)

  return (
    <section>
      <h1 className="mb-2 text-2xl font-bold">Categorías</h1>
      <p className="mb-6 text-texto-suave">Elige una categoría para ver sus libros.</p>

      {cargando && <Cargando mensaje="Cargando categorías…" />}

      {error && (
        <MensajeError
          error={error}
          onReintentar={reintentar}
          alternativa={{ to: '/', texto: 'Volver al inicio' }}
        />
      )}

      {categorias && (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categorias.map((categoria) => (
            <li key={categoria.id}>
              <Link
                to={categoria.id}
                className="block h-full rounded-lg border border-borde bg-superficie p-4 hover:border-primario"
              >
                <h2 className="text-lg font-semibold text-primario">{categoria.nombre}</h2>
                <p className="mt-1 text-sm text-texto-suave">{categoria.descripcion}</p>
                <p className="mt-3 text-sm font-semibold">{pluralizar(categoria.cantidadLibros, 'libro', 'libros')}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default ListadoCategorias