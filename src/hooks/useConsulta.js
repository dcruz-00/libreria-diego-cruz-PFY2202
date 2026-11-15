import { useEffect, useEffectEvent, useState } from 'react'

// Caché en memoria compartida por toda la app: clave → datos ya recibidos.
// Vive fuera del componente, así que sobrevive al cambiar de página (no a una recarga).
// Solo guarda respuestas exitosas: un error siempre se vuelve a intentar.
const cache = new Map()

/**
 * Ejecuta una consulta a la API y expone su estado.
 * @param {string} clave Identifica los datos en la caché (por ejemplo, "categoria:fantasia").
 * @param {(opciones: { signal: AbortSignal }) => Promise<any>} consultar Función que hace la petición.
 * @returns {{ datos: any, error: Error | null, cargando: boolean, reintentar: () => void }}
 */
export function useConsulta(clave, consultar) {
  // Contador de intentos: incrementarlo vuelve a ejecutar el efecto (eso es "reintentar").
  const [intento, setIntento] = useState(0)
  // Último resultado, marcado con la clave y el intento a los que corresponde.
  const [resultado, setResultado] = useState(null)

  // useEffectEvent: el efecto siempre llama a la versión más reciente de "consultar"
  // sin tenerla como dependencia (es una función nueva en cada render).
  const ejecutarConsulta = useEffectEvent((opciones) => consultar(opciones))

  useEffect(() => {
    // Optimización: si ya tenemos estos datos, no se repite la petición.
    if (cache.has(clave)) {
      return
    }

    // Permite cancelar esta petición si el efecto se limpia antes de que responda.
    const controlador = new AbortController()

    ejecutarConsulta({ signal: controlador.signal })
      .then((datos) => {
        cache.set(clave, datos)
        setResultado({ clave, intento, datos, error: null })
      })
      .catch((error) => {
        // La cancelación la pedimos nosotros (cleanup): no es un error que mostrar.
        if (error.name === 'AbortError') {
          return
        }
        setResultado({ clave, intento, datos: null, error })
      })

    // Cleanup: se ejecuta al salir de la página o antes de repetir el efecto
    // (otra clave u otro intento). La respuesta vieja ya no sirve, así que se cancela.
    return () => controlador.abort()
  }, [clave, intento])

  const reintentar = () => setIntento((anterior) => anterior + 1)

  // El estado se deriva en cada render, sin useState extra para "cargando":
  // 1) Datos en caché → se muestran al instante.
  if (cache.has(clave)) {
    return { datos: cache.get(clave), error: null, cargando: false, reintentar }
  }

  // 2) Hay un resultado (error) y corresponde a la consulta actual → se muestra.
  if (resultado?.clave === clave && resultado.intento === intento) {
    return { datos: resultado.datos, error: resultado.error, cargando: false, reintentar }
  }

  // 3) Cualquier otro caso: la petición actual todavía no responde.
  return { datos: null, error: null, cargando: true, reintentar }
}