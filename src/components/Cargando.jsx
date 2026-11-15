// Indicador de carga. role="status" hace que los lectores de pantalla anuncien el texto
// sin interrumpir lo que el usuario esté escuchando.
function Cargando({ mensaje = 'Cargando…' }) {
  return (
    <div role="status" className="flex items-center gap-3 py-6 text-texto-suave">
      {/* Círculo que gira. aria-hidden: es decorativo, el texto ya dice lo que pasa.
          motion-reduce: si el sistema pide reducir animaciones, se queda quieto. */}
      <span
        aria-hidden="true"
        className="size-5 animate-spin rounded-full border-2 border-borde border-t-primario motion-reduce:animate-none"
      />
      <span>{mensaje}</span>
    </div>
  )
}

export default Cargando