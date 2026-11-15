import { Routes, Route } from 'react-router'
import LayoutPrincipal from '../layouts/LayoutPrincipal.jsx'
import Inicio from '../pages/Inicio.jsx'
import ListadoCategorias from '../pages/ListadoCategorias.jsx'
import DetalleCategoria from '../pages/DetalleCategoria.jsx'
import NoEncontrado from '../pages/NoEncontrado.jsx'

// Todas las rutas del sitio en un solo lugar.
function AppRoutes() {
  return (
    <Routes>
      {/* Ruta "de layout": no tiene path, solo envuelve a sus hijas con LayoutPrincipal */}
      <Route element={<LayoutPrincipal />}>
        <Route index element={<Inicio />} />

        {/* Rutas anidadas: los path de las hijas se suman al del padre */}
        <Route path="categorias">
          <Route index element={<ListadoCategorias />} />
          {/* :id es un parámetro dinámico; DetalleCategoria lo lee con useParams */}
          <Route path=":id" element={<DetalleCategoria />} />
        </Route>

        {/* "*" coincide con cualquier URL que no coincida con las rutas anteriores */}
        <Route path="*" element={<NoEncontrado />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes