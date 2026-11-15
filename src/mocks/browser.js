import { setupWorker } from 'msw/browser'
import { handlers } from './handlers.js'

// Crea el worker con todos los handlers. "...handlers" pasa cada handler como argumento separado.
export const worker = setupWorker(...handlers)