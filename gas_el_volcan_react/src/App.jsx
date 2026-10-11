import { Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header.jsx'
import './estilos.css'
import ProductList from './components/ProductList.jsx'
import { useState, useEffect } from 'react'
import ShoppingCart from './pages/ShoppingCart.jsx'
import CompraExitosa from './pages/CompraExitosa.jsx'
import CompraFallida from './pages/CompraFallida.jsx'
import AdminProductos from './pages/AdminProductos.jsx'
import Categorias from './pages/Categorias.jsx'
import Ofertas from './pages/Ofertas.jsx'
import Inicio from './pages/Inicio.jsx'
import Blog from './pages/Blog.jsx'
import ArticuloBlog from './pages/ArticuloBlog.jsx'
import Nosotros from './pages/Nosotros.jsx'
import Contacto from './pages/Contacto.jsx'
import Login from './pages/Login.jsx'
import Registro from './pages/Registro.jsx'

function App() {
  const [productos, setProductos] = useState([])
  const [productosCargados, setProductosCargados] = useState(false)

  const [usuario, setUsuario] = useState(null)

  const iniciarSesion = (datosUsuario) => {
    setUsuario(datosUsuario)
  }

  const cerrarSesion = () => {
    setUsuario(null)
  }

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const guardados = localStorage.getItem('productosGas')

        if (guardados !== null) {
          const datos = JSON.parse(guardados)

          if (Array.isArray(datos)) {
            setProductos(datos)
            return
          }
        }

        const respuesta = await fetch('/data/productos.json')

        if (!respuesta.ok) {
          throw new Error('No se pudo cargar el catálogo')
        }

        const datos = await respuesta.json()
        setProductos(datos)
      } catch (error) {
        console.error('Error al cargar productos:', error)
      } finally {
        setProductosCargados(true)
      }
    }

    cargarProductos()
  }, [])

  useEffect(() => {
    if (productosCargados) {
      localStorage.setItem('productosGas', JSON.stringify(productos))
    }
  }, [productos, productosCargados])

  const [carrito, setCarrito] = useState(() => {
    try {
      const carritoGuardado = localStorage.getItem('carritoGas')

      const datos = carritoGuardado ? JSON.parse(carritoGuardado) : []

      if (!Array.isArray(datos)) {
        return []
      }

      return datos
        .filter((producto) =>
          producto &&
          producto.id &&
          typeof producto.precio === 'number'
        )
        .map((producto) => ({
          ...producto,
          cantidad: Number.isInteger(producto.cantidad) && producto.cantidad > 0
            ? producto.cantidad
            : 1
        }))
    } catch (error) {
      console.error('Error al recuperar el carrito:', error)
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('carritoGas', JSON.stringify(carrito))
  }, [carrito])


  const agregarAlCarrito = (producto) => {
    const descuento = Number(producto.descuento ?? 0)

    const precioFinal = Math.round(
      Number(producto.precio) * (1 - descuento / 100)
    )

    const productoConPrecioFinal = {
      ...producto,
      precio: precioFinal
    }

    setCarrito((carritoActual) => {
      const productoExistente = carritoActual.find(
        (item) => item.id === producto.id
      )

      if (productoExistente) {
        return carritoActual.map((item) =>
          item.id === producto.id
            ? {
              ...item,
              precio: precioFinal,
              cantidad: item.cantidad + 1
            }
            : item
        )
      }

      return [
        ...carritoActual,
        { ...productoConPrecioFinal, cantidad: 1 }
      ]
    })
  }


  const eliminarDelCarrito = (indiceEliminar) => {
    setCarrito((carritoActual) =>
      carritoActual.filter((producto, index) => index !== indiceEliminar)
    )
  }

  const cambiarCantidad = (id, cambio) => {
    setCarrito((carritoActual) =>
      carritoActual
        .map((producto) =>
          producto.id === id
            ? { ...producto, cantidad: producto.cantidad + cambio }
            : producto
        )
        .filter((producto) => producto.cantidad > 0)
    )
  }

  const finalizarCompra = (simularFallo = false) => {
    if (carrito.length === 0) {
      return false
    }

    if (simularFallo) {
      return false
    }

    setCarrito([])
    return true
  }

  return (
    <>
      <Header
        carrito={carrito}
        usuario={usuario}
        cerrarSesion={cerrarSesion}
      />

      <main className="contenedor">

        <Routes>
          <Route
            path="/"
            element={
              <Inicio
                productos={productos}
                agregarAlCarrito={agregarAlCarrito}
              />
            }
          />

          <Route
            path="/productos"
            element={
              <ProductList
                productos={productos}
                agregarAlCarrito={agregarAlCarrito}
              />
            }
          />

          <Route
            path="/carrito"
            element={
              <ShoppingCart
                carrito={carrito}
                eliminarDelCarrito={eliminarDelCarrito}
                cambiarCantidad={cambiarCantidad}
                finalizarCompra={finalizarCompra}
              />
            }
          />

          <Route path="/contacto"
            element={<Contacto />}
          />

          <Route path="/nosotros"
            element={<Nosotros />}
          />

          <Route path="/blog"
            element={<Blog />}
          />

          <Route
            path="/blog/:articulo"
            element={<ArticuloBlog />}
          />

          <Route
            path="/login"
            element={<Login iniciarSesion={iniciarSesion} />}
          />

          <Route path="/registro"
            element={<Registro />}
          />

          <Route
            path="/compra-exitosa"
            element={<CompraExitosa />}
          />

          <Route
            path="/compra-fallida"
            element={<CompraFallida />}
          />

          <Route
            path="/admin/productos"
            element={
              usuario?.rol === 'admin' ? (
                <AdminProductos
                  productos={productos}
                  setProductos={setProductos}
                />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route
            path="/categorias"
            element={<Categorias productos={productos} />}
          />

          <Route
            path="/ofertas"
            element={
              <Ofertas
                productos={productos}
                agregarAlCarrito={agregarAlCarrito}
              />
            }
          />

        </Routes>
      </main>
    </>
  )
}

export default App