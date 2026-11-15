import { delay } from 'msw'
import { http, HttpResponse } from 'msw/http'
import { categorias, libros } from './datos.js'

// Latencia simulada, para que el indicador de carga alcance a verse.
const LATENCIA_MS = 1000

// "Historia" falla una vez sí y otra no, para probar el error 500 y el botón "Reintentar".
let intentosHistoria = 0

// Cada handler atiende un método + una ruta. MSW usa el primero que coincide,
// así que el orden importa: el comodín /api/* va al final.
export const handlers = [
  // GET /api/categorias → listado resumido (sin los libros, solo cuántos tiene cada una).
  http.get('/api/categorias', async () => {
    await delay(LATENCIA_MS)

    const resumen = categorias.map((categoria) => ({
      ...categoria,
      cantidadLibros: libros.filter((libro) => libro.categoriaId === categoria.id).length,
    }))

    return HttpResponse.json(resumen)
  }),

  // GET /api/categorias/:id → una categoría con sus libros. ":id" es un parámetro de ruta.
  http.get('/api/categorias/:id', async ({ params }) => {
    await delay(LATENCIA_MS)

    const categoria = categorias.find((c) => c.id === params.id)

    if (!categoria) {
      return HttpResponse.json(
        { mensaje: 'La categoría solicitada no existe.' },
        { status: 404 },
      )
    }

    if (categoria.id === 'historia') {
      intentosHistoria++
      if (intentosHistoria % 2 === 1) {
        return HttpResponse.json(
          { mensaje: 'Error interno del servidor.' },
          { status: 500 },
        )
      }
    }

    return HttpResponse.json({
      ...categoria,
      libros: libros.filter((libro) => libro.categoriaId === categoria.id),
    })
  }),

  // Cualquier otra ruta bajo /api responde 404 en JSON, como lo haría un backend real.
  // Sin esto, un error de tipeo en la URL llegaría al servidor de Vite y devolvería HTML.
  http.all('/api/*', () =>
    HttpResponse.json({ mensaje: 'Recurso no encontrado.' }, { status: 404 }),
  ),
]