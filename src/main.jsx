import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import App from './App.jsx'

// Activa la API simulada solo en desarrollo (npm run dev).
// En el build de producción import.meta.env.DEV es false y MSW ni siquiera se incluye.
async function activarMocks() {
  if (!import.meta.env.DEV) {
    return
  }

  // Import dinámico: el código de MSW se carga solo cuando se necesita.
  const { worker } = await import('./mocks/browser.js')

  // start() registra el service worker y devuelve una promesa que se resuelve cuando ya intercepta.
  // onUnhandledRequest: 'bypass' deja pasar sin avisos las peticiones que no son de la API
  // (archivos de Vite, fuentes, imágenes).
  return worker.start({ onUnhandledRequest: 'bypass' })
}

// Se renderiza recién cuando el worker está listo; si no, la primera petición
// podría salir antes de que MSW esté escuchando y fallar.
activarMocks().then(() => {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>,
  )
})