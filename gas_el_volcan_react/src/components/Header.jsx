import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

function Header({ carrito }) {
  const [menuAbierto, setMenuAbierto] = useState(false)

  const cantidadCarrito = carrito.reduce(
    (total, producto) => total + producto.cantidad,
    0
  )
  const enlaces = [
    { nombre: 'Inicio', ruta: '/' },
    { nombre: 'Productos', ruta: '/productos' },
    { nombre: 'Categorías', ruta: '/categorias' },
    { nombre: 'Ofertas', ruta: '/ofertas' },
    { nombre: 'Nosotros', ruta: '/nosotros' },
    { nombre: 'Blog', ruta: '/blog' },
    { nombre: 'Contacto', ruta: '/contacto' }
  ]

  return (
    <header>
      <nav className="contenedor nav" aria-label="Menú principal">

        <Link to="/">
          <img
            src="/img/logovolcan.jpg"
            alt="Gas El Volcán"
            className="logo"
          />
        </Link>

        <ul className={`menu ${menuAbierto ? 'abierto' : ''}`}>
          {enlaces.map((enlace) => (
            <li key={enlace.ruta}>
              <NavLink
                to={enlace.ruta}
                onClick={() => setMenuAbierto(false)}
              >
                {enlace.nombre}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="acciones">

          <Link className="icono-btn" to="/login">
            <i className="bi bi-person-circle"></i>
            <span className="texto-accion">Ingresar</span>
          </Link>

          <Link className="icono-btn" to="/carrito">
            <i className="bi bi-cart3"></i>
            <span className="contador contador-carrito">
              {cantidadCarrito}
            </span>
          </Link>

          <button
            type="button"
            className="hamburguesa"
            aria-label={menuAbierto ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuAbierto}
            onClick={() => setMenuAbierto(!menuAbierto)}
          >
            {menuAbierto ? (
              <i className="bi bi-x-lg" aria-hidden="true"></i>
            ) : (
              <i className="bi bi-list" aria-hidden="true"></i>
            )}
          </button>

        </div>


      </nav>
    </header>
  )
}

export default Header
