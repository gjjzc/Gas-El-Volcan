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
import AdminUsuarios from './pages/AdminUsuarios.jsx'
import AdminPedidos from './pages/AdminPedidos.jsx'

function App() {
  const [productos, setProductos] = useState([])
  const [productosCargados, setProductosCargados] = useState(false)

  const [usuario, setUsuario] = useState(null)

  const [clientes, setClientes] = useState([])


  const crearUsuario = (datos) => {
    const correo = datos.correo.trim().toLowerCase()
    const run = datos.run.replace(/[.-]/g, '').toUpperCase()

    const existe = clientes.some(
      (cliente) =>
        cliente.correo === correo ||
        cliente.run === run
    )

    if (existe) {
      return {
        correcto: false,
        mensaje: 'Ya existe una cuenta con ese correo o RUN.'
      }
    }

    const nuevoUsuario = {
      ...datos,
      run,
      nombre: datos.nombre.trim(),
      apellidoPaterno: datos.apellidoPaterno.trim(),
      apellidoMaterno: datos.apellidoMaterno.trim(),
      correo,
      rol: datos.rol === 'repartidor' ? 'repartidor' : 'cliente'
    }

    setClientes((anteriores) => [
      ...anteriores,
      nuevoUsuario
    ])

    return {
      correcto: true,
      mensaje: 'Cuenta creada correctamente.'
    }
  }

  const editarUsuario = (runOriginal, datos) => {
    const correo = datos.correo.trim().toLowerCase()
    const run = datos.run.replace(/[.-]/g, '').toUpperCase()

    const existe = clientes.some(
      (cliente) =>
        cliente.run !== runOriginal &&
        (cliente.correo === correo || cliente.run === run)
    )

    if (existe) {
      return {
        correcto: false,
        mensaje: 'El correo o RUN ya pertenece a otra cuenta.'
      }
    }

    setClientes((anteriores) =>
      anteriores.map((cliente) => {
        if (cliente.run !== runOriginal) {
          return cliente
        }

        return {
          ...cliente,
          ...datos,
          run,
          nombre: datos.nombre.trim(),
          apellidoPaterno: datos.apellidoPaterno.trim(),
          apellidoMaterno: datos.apellidoMaterno.trim(),
          correo,
          clave: datos.clave || cliente.clave,
          rol: datos.rol === 'repartidor' ? 'repartidor' : 'cliente'
        }
      })
    )

    return {
      correcto: true,
      mensaje: 'Cuenta actualizada correctamente.'
    }
  }

  const eliminarUsuario = (run) => {
    setClientes((anteriores) =>
      anteriores.filter((cliente) => cliente.run !== run)
    )

    return {
      correcto: true,
      mensaje: 'Cuenta eliminada correctamente.'
    }
  }

  const ingresarRepartidor = (correo, clave) => {
    const correoNormalizado = correo.trim().toLowerCase()

    const repartidor = clientes.find(
      (cliente) =>
        cliente.correo === correoNormalizado &&
        cliente.clave === clave &&
        cliente.rol === 'repartidor'
    )

    if (!repartidor) {
      return false
    }

    const { clave: clavePrivada, ...datosPublicos } = repartidor

    iniciarSesion(datosPublicos)
    return true
  }


  const [pedidos, setPedidos] = useState(() => {
    try {
      const guardados = localStorage.getItem('pedidosGas')
      const datos = guardados ? JSON.parse(guardados) : []

      return Array.isArray(datos) ? datos : []
    } catch (error) {
      console.error('Error al recuperar pedidos:', error)
      return []
    }
  })


  const [ultimoPedido, setUltimoPedido] = useState(() => {
    try {
      const pedidosGuardados = localStorage.getItem('pedidosGas')

      const listaPedidos = pedidosGuardados
        ? JSON.parse(pedidosGuardados)
        : []

      if (!Array.isArray(listaPedidos) || listaPedidos.length === 0) {
        return null
      }

      return listaPedidos[listaPedidos.length - 1]
    } catch (error) {
      console.error('Error al recuperar el último pedido:', error)
      return null
    }
  })


  useEffect(() => {
    localStorage.setItem('pedidosGas', JSON.stringify(pedidos))
  }, [pedidos])

  const iniciarSesion = (datosUsuario) => {
    setUsuario(datosUsuario)
  }

  const cerrarSesion = () => {
    setUsuario(null)
  }

  const registrarCliente = (datos) => {
    const correo = datos.correo.trim().toLowerCase()
    const run = datos.run.replace(/[.-]/g, '').toUpperCase()

    const clienteExistente = clientes.some(
      (cliente) =>
        cliente.correo === correo ||
        cliente.run === run
    )

    if (clienteExistente) {
      return {
        correcto: false,
        mensaje: 'Ya existe una cuenta con ese correo o RUN.'
      }
    }

    const nuevoCliente = {
      run,
      nombre: datos.nombre.trim(),
      apellidoPaterno: datos.apellidoPaterno.trim(),
      apellidoMaterno: datos.apellidoMaterno.trim(),
      correo,
      clave: datos.clave,
      region: datos.region,
      comuna: datos.comuna,
      rol: 'cliente'
    }

    setClientes((anteriores) => [
      ...anteriores,
      nuevoCliente
    ])

    return {
      correcto: true,
      mensaje: 'Cuenta creada correctamente. Ya puedes iniciar sesión.'
    }
  }

  const ingresarCliente = (correo, clave) => {
    const correoNormalizado = correo.trim().toLowerCase()

    const cliente = clientes.find(
      (item) =>
        item.correo === correoNormalizado &&
        item.clave === clave &&
        item.rol === 'cliente'
    )

    if (!cliente) {
      return false
    }

    const { clave: clavePrivada, ...datosPublicos } = cliente

    iniciarSesion(datosPublicos)
    return true
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


  const finalizarCompra = (simularFallo = false, metodoPago = '') => {
    if (carrito.length === 0) {
      return false
    }

    if (!['efectivo', 'tarjeta'].includes(metodoPago)) {
      return false
    }

    if (simularFallo) {
      return false
    }

    const numeroActual = Number(
      localStorage.getItem('ultimoNumeroPedidoGas') || 0
    )

    const mayorNumeroGuardado = pedidos.reduce((mayor, pedido) => {
      const numero = Number(
        String(pedido.id).replace('PED-', '')
      )

      return Number.isFinite(numero)
        ? Math.max(mayor, numero)
        : mayor
    }, 0)

    const siguienteNumero = Math.max(
      numeroActual,
      mayorNumeroGuardado
    ) + 1

    const numeroPedido = `PED-${String(siguienteNumero).padStart(6, '0')}`

    const total = carrito.reduce(
      (suma, producto) =>
        suma + producto.precio * producto.cantidad,
      0
    )

    const nuevoPedido = {
      id: numeroPedido,
      fecha: new Date().toISOString(),
      cliente: usuario
        ? {
          nombre: usuario.nombre,
          correo: usuario.correo,
          rol: usuario.rol
        }
        : null,
      productos: carrito.map((producto) => ({
        id: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        cantidad: producto.cantidad
      })),
      total,
      metodoPago,
      estado: 'pendiente'
    }

    setPedidos((anteriores) => [
      ...anteriores,
      nuevoPedido
    ])

    setUltimoPedido(nuevoPedido)

    localStorage.setItem(
      'ultimoNumeroPedidoGas',
      String(siguienteNumero)
    )

    setCarrito([])


    
    return true
  }

  const asignarRepartidor = (pedidoId, repartidorRun) => {
    const pedido = pedidos.find(
      (item) => item.id === pedidoId
    )

    if (!pedido) {
      return {
        correcto: false,
        mensaje: 'El pedido no existe.'
      }
    }

    if (pedido.estado === 'entregado') {
      return {
        correcto: false,
        mensaje: 'No puedes modificar un pedido entregado.'
      }
    }

    if (repartidorRun !== '') {
      const repartidor = clientes.find(
        (usuario) =>
          usuario.run === repartidorRun &&
          usuario.rol === 'repartidor'
      )

      if (!repartidor) {
        return {
          correcto: false,
          mensaje: 'El repartidor seleccionado no existe.'
        }
      }
    }

    setPedidos((anteriores) =>
      anteriores.map((item) =>
        item.id === pedidoId
          ? {
              ...item,
              repartidorRun
            }
          : item
      )
    )

    return {
      correcto: true,
      mensaje: 'Asignación actualizada correctamente.'
    }
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
            element={
              <Login
                iniciarSesion={iniciarSesion}
                ingresarCliente={ingresarCliente}
                ingresarRepartidor={ingresarRepartidor}
              />
            }
          />

          <Route
            path="/registro"
            element={
              <Registro registrarCliente={registrarCliente} />
            }
          />

          <Route
            path="/compra-exitosa"
            element={
              <CompraExitosa pedido={ultimoPedido} />
            }
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
            path="/admin/usuarios"
            element={
              usuario?.rol === 'admin' ? (
                <AdminUsuarios
                  usuarios={clientes}
                  crearUsuario={crearUsuario}
                  editarUsuario={editarUsuario}
                  eliminarUsuario={eliminarUsuario}
                />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          
          <Route
            path="/admin/pedidos"
            element={
              usuario?.rol === 'admin' ? (
                <AdminPedidos
                  pedidos={pedidos}
                  usuarios={clientes}
                  asignarRepartidor={asignarRepartidor}
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