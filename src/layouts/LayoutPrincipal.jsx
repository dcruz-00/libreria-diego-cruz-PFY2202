import { NavLink, Outlet } from 'react-router'

// NavLink entrega isActive para resaltar el enlace de la página actual.
const claseEnlace = ({ isActive }) =>
  `rounded px-3 py-2 font-semibold ${isActive ? 'bg-primario text-white' : 'text-primario hover:bg-borde'}`

// Estructura común a todas las páginas. <Outlet /> es el hueco donde
// React Router dibuja la página de la ruta hija que coincide con la URL.
function LayoutPrincipal() {
  return (
    <>
      <header className="bg-primario px-6 py-4 text-white">
        <p className="text-2xl font-bold">Librería Capítulo</p>
        <p className="mt-1 opacity-85">Explora nuestros libros por categoría</p>
      </header>

      <nav aria-label="Principal" className="border-b border-borde bg-superficie px-4 py-2">
        <ul className="mx-auto flex max-w-240 gap-2">
          {/* end: "/" solo queda activo en la portada, no en todas las rutas que empiezan con "/" */}
          <li><NavLink to="/" end className={claseEnlace}>Inicio</NavLink></li>
        </ul>
      </nav>

      <main className="mx-auto max-w-240 px-4 py-6">
        <Outlet />
      </main>
    </>
  )
}

export default LayoutPrincipal