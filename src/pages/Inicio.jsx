import { Link } from 'react-router'

function Inicio() {
  return (
    <section>
      <h1 className="mb-2 text-2xl font-bold">Bienvenido a Librería Capítulo</h1>
      <p className="mb-4 text-texto-suave">
        Encuentra tu próxima lectura navegando por nuestras categorías.
      </p>
      <Link
        to="/categorias"
        className="inline-block rounded bg-primario px-4 py-2 font-semibold text-white hover:opacity-90"
      >
        Ver categorías
      </Link>
    </section>
  )
}

export default Inicio