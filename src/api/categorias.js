import { obtenerJSON } from './cliente.js'

// Funciones de la API de categorías: los componentes las usan sin saber de URLs ni de fetch.

export function obtenerCategorias({ signal } = {}) {
  return obtenerJSON('/api/categorias', { signal })
}

export function obtenerCategoria(id, { signal } = {}) {
  // encodeURIComponent evita que un id con caracteres especiales (/, ?, #) rompa la URL.
  return obtenerJSON(`/api/categorias/${encodeURIComponent(id)}`, { signal })
}