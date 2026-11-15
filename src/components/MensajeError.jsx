import { Link } from 'react-router'

// Título según el tipo de fallo que entrega ErrorApi (paso 5).
const TITULOS = {
  red: 'Sin conexión',
  servidor: 'Error del servidor',
  'no-encontrado': 'No encontramos lo que buscas',
}

// Muestra un error de la API con dos salidas para el usuario:
// "Reintentar" (solo si el fallo puede resolverse así) y un enlace alternativo (siempre).
function MensajeError({ error, onReintentar, alternativa }) {
  const titulo = TITULOS[error.tipo] ?? 'Algo salió mal'

  return (
    // role="alert": los lectores de pantalla lo anuncian de inmediato.
    <div role="alert" className="my-4 rounded-lg border border-error/40 bg-error/5 p-4">
      <p className="font-semibold text-error">{titulo}</p>
      <p className="mt-1">{error.message}</p>

      <div className="mt-4 flex flex-wrap items-center gap-4">
        {error.reintentable && onReintentar && (
          <button
            type="button"
            onClick={onReintentar}
            className="rounded bg-primario px-4 py-2 font-semibold text-white hover:opacity-90"
          >
            Reintentar
          </button>
        )}
        {alternativa && (
          <Link to={alternativa.to} className="font-semibold text-primario underline">
            {alternativa.texto}
          </Link>
        )}
      </div>
    </div>
  )
}

export default MensajeError