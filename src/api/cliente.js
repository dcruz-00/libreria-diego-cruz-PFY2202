// Cliente HTTP de la app: el único lugar que llama a fetch.
// Convierte cada tipo de fallo en un ErrorApi con un mensaje claro para el usuario.

// Error propio: además del mensaje, guarda qué tipo de fallo fue y si tiene sentido reintentar.
export class ErrorApi extends Error {
  constructor(mensaje, { tipo, estado = null }) {
    super(mensaje)
    this.name = 'ErrorApi'
    this.tipo = tipo // 'red' | 'no-encontrado' | 'servidor' | 'solicitud' | 'respuesta-invalida'
    this.estado = estado // código HTTP, o null si no hubo respuesta
    // Un 404 no se arregla reintentando; una caída de red o del servidor, quizás sí.
    this.reintentable = tipo === 'red' || tipo === 'servidor'
  }
}

// Intenta leer el { mensaje } que envía la API en sus respuestas de error.
async function leerMensajeDelServidor(respuesta) {
  try {
    const cuerpo = await respuesta.json()
    return typeof cuerpo?.mensaje === 'string' ? cuerpo.mensaje : null
  } catch {
    return null // el cuerpo no era JSON
  }
}

// Traduce una respuesta HTTP fallida (4xx o 5xx) a un ErrorApi.
async function crearErrorHttp(respuesta) {
  const { status } = respuesta

  if (status === 404) {
    const mensaje = await leerMensajeDelServidor(respuesta)
    return new ErrorApi(mensaje ?? 'El recurso solicitado no existe.', { tipo: 'no-encontrado', estado: status })
  }

  if (status >= 500) {
    return new ErrorApi(
      'El servidor tuvo un problema y no pudo responder. Intenta de nuevo en unos segundos.',
      { tipo: 'servidor', estado: status },
    )
  }

  return new ErrorApi(
    `No se pudo completar la solicitud (código ${status}).`,
    { tipo: 'solicitud', estado: status },
  )
}

// GET a la API que devuelve el JSON ya convertido a objeto, o lanza un ErrorApi.
// signal (opcional) permite cancelar la petición con un AbortController.
export async function obtenerJSON(url, { signal } = {}) {
  let respuesta

  // 1) fetch solo se rechaza si NO hubo respuesta: sin conexión, servidor caído o cancelación.
  try {
    respuesta = await fetch(url, { signal })
  } catch (error) {
    // Una cancelación no es un fallo: se relanza tal cual para que quien llamó la ignore.
    if (error.name === 'AbortError') {
      throw error
    }
    throw new ErrorApi(
      'No se pudo conectar con el servidor. Revisa tu conexión a internet e intenta de nuevo.',
      { tipo: 'red' },
    )
  }

  // 2) Hubo respuesta, pero con código de error. fetch NO lanza error por un 404 o un 500:
  //    hay que revisar respuesta.ok (true solo para códigos 200 a 299).
  if (!respuesta.ok) {
    throw await crearErrorHttp(respuesta)
  }

  // 3) Respuesta exitosa, pero el cuerpo podría no ser JSON válido.
  try {
    return await respuesta.json()
  } catch (error) {
    if (error.name === 'AbortError') {
      throw error
    }
    throw new ErrorApi(
      'El servidor envió una respuesta que no se pudo leer.',
      { tipo: 'respuesta-invalida', estado: respuesta.status },
    )
  }
}