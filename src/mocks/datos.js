// "Base de datos" de la API simulada. Solo la usan los handlers:
// los componentes nunca importan este archivo, reciben los datos por HTTP.

export const categorias = [
  { id: 'ficcion', nombre: 'Ficción', descripcion: 'Novelas y relatos de la literatura universal.' },
  { id: 'ciencia-ficcion', nombre: 'Ciencia ficción', descripcion: 'Futuros posibles, viajes espaciales y tecnología.' },
  { id: 'fantasia', nombre: 'Fantasía', descripcion: 'Mundos imaginarios, magia y aventuras épicas.' },
  { id: 'misterio', nombre: 'Misterio', descripcion: 'Crímenes, detectives y enigmas por resolver.' },
  { id: 'historia', nombre: 'Historia', descripcion: 'Ensayos sobre el pasado de la humanidad.' },
  // Sin libros a propósito, para probar el estado "vacío".
  { id: 'poesia', nombre: 'Poesía', descripcion: 'Antologías y obras poéticas.' },
]

// Precios en pesos chilenos (enteros).
export const libros = [
  { id: '1', titulo: 'Cien años de soledad', autor: 'Gabriel García Márquez', precio: 18990, categoriaId: 'ficcion' },
  { id: '2', titulo: 'La casa de los espíritus', autor: 'Isabel Allende', precio: 16990, categoriaId: 'ficcion' },
  { id: '3', titulo: 'Rayuela', autor: 'Julio Cortázar', precio: 15990, categoriaId: 'ficcion' },
  { id: '4', titulo: 'Fahrenheit 451', autor: 'Ray Bradbury', precio: 12990, categoriaId: 'ciencia-ficcion' },
  { id: '5', titulo: 'Dune', autor: 'Frank Herbert', precio: 21990, categoriaId: 'ciencia-ficcion' },
  { id: '6', titulo: 'Fundación', autor: 'Isaac Asimov', precio: 14990, categoriaId: 'ciencia-ficcion' },
  { id: '7', titulo: 'El hobbit', autor: 'J. R. R. Tolkien', precio: 15490, categoriaId: 'fantasia' },
  { id: '8', titulo: 'Un mago de Terramar', autor: 'Ursula K. Le Guin', precio: 13990, categoriaId: 'fantasia' },
  { id: '9', titulo: 'Asesinato en el Orient Express', autor: 'Agatha Christie', precio: 11990, categoriaId: 'misterio' },
  { id: '10', titulo: 'El nombre de la rosa', autor: 'Umberto Eco', precio: 19990, categoriaId: 'misterio' },
  { id: '11', titulo: 'Sapiens', autor: 'Yuval Noah Harari', precio: 22990, categoriaId: 'historia' },
]