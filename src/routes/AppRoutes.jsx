import { Routes, Route } from 'react-router'
import LayoutPrincipal from '../layouts/LayoutPrincipal.jsx'
import Inicio from '../pages/Inicio.jsx'
import NoEncontrado from '../pages/NoEncontrado.jsx'

// Todas las rutas del sitio en un solo lugar.
function AppRoutes() {
  return (
    <Routes>
      {/* Ruta "de layout": no tiene path, solo envuelve a sus hijas con LayoutPrincipal */}
      <Route element={<LayoutPrincipal />}>
        <Route index element={<Inicio />} />
        {/* "*" coincide con cualquier URL que no coincida con las rutas anteriores */}
        <Route path="*" element={<NoEncontrado />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes