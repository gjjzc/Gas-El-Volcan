import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

function Header({ carrito, usuario, cerrarSesion }) {
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

  const cerrarMenu = () => {
    setMenuAbierto(false)
  }

  return (
    <header>
      <nav className="contenedor nav" aria-label="Menú principal">

        <Link to="/" onClick={cerrarMenu}>
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
                onClick={cerrarMenu}
              >
                {enlace.nombre}
              </NavLink>
            </li>
          ))}

          {usuario?.rol === 'admin' && (
            <>
              
              <li>
                <NavLink
                  to="/admin/pedidos"
                  onClick={cerrarMenu}
                >
                  Administrar pedidos
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/admin/productos"
                  onClick={cerrarMenu}
                >
                  Administrar productos
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/admin/usuarios"
                  onClick={cerrarMenu}
                >
                  Administrar usuarios
                </NavLink>
              </li>
            </>
          )}

          {usuario?.rol === 'cliente' && (
            <li>
              <NavLink
                to="/mis-pedidos"
                onClick={cerrarMenu}
              >
                Mis pedidos
              </NavLink>
            </li>
          )}

          {usuario?.rol === 'repartidor' && (
            <li>
              <NavLink
                to="/repartidor"
                onClick={cerrarMenu}
              >
                Panel de entregas
              </NavLink>
            </li>
          )}
        </ul>

        <div className="acciones">

          {usuario ? (
            <>
              {usuario.rol === 'admin' ? (
                <Link
                  className="icono-btn"
                  to="/admin/productos"
                  onClick={cerrarMenu}
                >
                  <i className="bi bi-gear"></i>
                  <span className="texto-accion">
                    Administración
                  </span>
                </Link>
              ) : (
                <span className="icono-btn">
                  <i className="bi bi-person-circle"></i>
                  <span className="texto-accion">
                    Hola, {usuario.nombre}
                  </span>
                </span>
              )}

              <button
                type="button"
                className="icono-btn"
                onClick={() => {
                  cerrarSesion()
                  cerrarMenu()
                }}
              >
                <i className="bi bi-box-arrow-right"></i>
                <span className="texto-accion">
                  Salir
                </span>
              </button>
            </>
          ) : (
            <Link
              className="icono-btn"
              to="/login"
              onClick={cerrarMenu}
            >
              <i className="bi bi-person-circle"></i>
              <span className="texto-accion">
                Ingresar
              </span>
            </Link>
          )}

          {usuario?.rol !== 'repartidor' && (
            <Link
              className="icono-btn"
              to="/carrito"
              onClick={cerrarMenu}
            >
              <i className="bi bi-cart3"></i>
              <span className="contador contador-carrito">
                {cantidadCarrito}
              </span>
            </Link>
          )}

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
