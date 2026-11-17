# Librería Capítulo

Tienda de libros en React donde los usuarios exploran categorías (Ficción, Ciencia ficción, Fantasía, etc.) y ven los libros de cada una. Los datos se obtienen de una **API REST simulada con MSW (Mock Service Worker)**, sin backend real.

Actividad formativa de la semana 4 de **Desarrollo Frontend II (PFY2202)**, Duoc UC: *Utilizando tecnologías de integración entre frontend y backend*.

## Funcionalidades

- **Listado de categorías** (`/categorias`), obtenido desde `GET /api/categorias`.
- **Detalle de categoría** (`/categorias/:id`) con sus libros, obtenido desde `GET /api/categorias/:id`.
- **Navegación con React Router**: ruta de layout, rutas anidadas, parámetro dinámico `:id` y página 404.
- **Indicador de carga** en cada petición, accesible para lectores de pantalla (`role="status"`).
- **Manejo de errores** con mensajes claros según el tipo de fallo y una salida para el usuario:
  - Error del servidor (500) o sin conexión → botón **Reintentar** y enlace alternativo.
  - Recurso inexistente (404) → enlace a las categorías disponibles (reintentar no lo resolvería).
- **Estado vacío** cuando una categoría no tiene libros.
- **Consultas optimizadas**: caché en memoria (no se repiten peticiones ya resueltas) y cancelación con `AbortController` de las peticiones que dejan de servir.
- Precios en pesos chilenos con `Intl.NumberFormat` y plurales correctos con `Intl.PluralRules` ("1 libro", "3 libros").

## Tecnologías

- React 19 + Vite 8
- React Router 8 (`react-router`)
- MSW 3 (Mock Service Worker)
- Tailwind CSS 4

## Requisitos

- Node.js 22.22 o superior

## Instalación y ejecución

```bash
git clone https://github.com/dcruz-00/libreria-diego-cruz-PFY2202.git
cd libreria-diego-cruz-PFY2202
npm install
npm run dev
```

Abrir la URL que indica la terminal (por defecto `http://localhost:5173`). En la consola del navegador debe aparecer `[MSW] Mocking enabled.`

> La API simulada solo se activa en desarrollo (`npm run dev`). El build de producción no incluye MSW.

## API simulada

Definida en `src/mocks/handlers.js`, con datos en `src/mocks/datos.js`. Todas las respuestas tienen 1 segundo de latencia simulada para que el estado de carga sea visible.

| Método | Ruta | Respuesta |
|---|---|---|
| GET | `/api/categorias` | 200: listado de categorías con `cantidadLibros` |
| GET | `/api/categorias/:id` | 200: categoría con su arreglo `libros` · 404 si no existe |
| * | `/api/*` (otra ruta) | 404 en JSON |

Los errores se responden como `{ "mensaje": "..." }`.

### Casos para probar

| Caso | Cómo probarlo | Resultado esperado |
|---|---|---|
| Datos normales | Abrir Ficción, Fantasía, etc. | Indicador de carga y luego los libros |
| Caché | Volver al listado y reabrir una categoría | Se muestra al instante, sin nueva petición en *Network* |
| Error 500 | Abrir **Historia** | Mensaje "Error del servidor" + Reintentar; al reintentar carga bien (falla un intento sí y otro no) |
| Error 404 | Ir a `/categorias/xyz` | "La categoría solicitada no existe." sin botón Reintentar |
| Vacío | Abrir **Poesía** | "Esta categoría todavía no tiene libros." |

## Estructura

```
src/
├── api/
│   ├── cliente.js           # fetch + ErrorApi: traduce cada fallo a un mensaje claro
│   └── categorias.js        # funciones de la API (obtenerCategorias, obtenerCategoria)
├── components/
│   ├── Cargando.jsx         # indicador de carga
│   ├── MensajeError.jsx     # error con Reintentar y enlace alternativo
│   └── EstadoVacio.jsx      # respuesta exitosa sin datos
├── hooks/
│   └── useConsulta.js       # estado de la petición, caché, cancelación y reintento
├── layouts/
│   └── LayoutPrincipal.jsx  # encabezado, menú y <Outlet />
├── mocks/
│   ├── browser.js           # setupWorker(...handlers)
│   ├── handlers.js          # endpoints simulados
│   └── datos.js             # datos de categorías y libros
├── pages/                   # Inicio, ListadoCategorias, DetalleCategoria, NoEncontrado
├── routes/
│   └── AppRoutes.jsx        # definición de rutas
├── utils/
│   └── formato.js           # formatearPrecio y pluralizar
└── main.jsx                 # activa MSW antes de renderizar la app
```

## Decisiones técnicas

- **Cliente HTTP propio** (`api/cliente.js`): `fetch` no lanza error ante un 404 o un 500, así que se revisa `response.ok` y se distingue entre fallo de red, recurso inexistente, error del servidor y respuesta no válida. Cada caso indica si tiene sentido reintentar.
- **Hook `useConsulta`**: centraliza el estado de cada petición. Los estados de carga y error se derivan del último resultado, marcado con la consulta a la que pertenece, para que nunca se muestren datos de una categoría en otra.
- **Cancelación con `AbortController`**: al cambiar de página o de categoría se cancela la petición anterior, lo que evita condiciones de carrera.
- **Caché en memoria**: las respuestas exitosas se guardan durante la sesión; los errores no, para poder reintentarlos.
- **MSW se inicia antes del primer render**: así ninguna petición sale antes de que el service worker esté interceptando.

## Limitaciones conocidas

- La caché no expira: adecuado para un catálogo estático, pero con datos que cambian se necesitaría expiración o invalidación.
- En desarrollo, `StrictMode` ejecuta cada efecto dos veces, por lo que en *Network* aparece una petición cancelada antes de la definitiva. En producción hay una sola petición.
- Como la API es simulada y solo existe en desarrollo, el sitio no está publicado en GitHub Pages.