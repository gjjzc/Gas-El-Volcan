import { useState } from 'react'
import { Container, Table, Form, Button } from 'react-bootstrap'

const formularioInicial = {
  nombre: '',
  categoria: '',
  precio: '',
  stock: '',
  descuento: ''
}

function AdminProductos({ productos, setProductos }) {
  const [formulario, setFormulario] = useState(formularioInicial)
  const [idEditando, setIdEditando] = useState(null)

  const manejarCambio = (evento) => {
    const { name, value } = evento.target

    setFormulario({
      ...formulario,
      [name]: value
    })
  }


  const guardarProducto = (evento) => {
    evento.preventDefault()

    const datos = {
      nombre: formulario.nombre.trim(),
      categoria: formulario.categoria.trim(),
      precio: Number(formulario.precio),
      stock: Number(formulario.stock),
      descuento: Number(formulario.descuento || 0)
    }

    if (!datos.nombre || !datos.categoria) return
    if (formulario.precio === '' || formulario.stock === '') return
    if (!Number.isFinite(datos.precio) || datos.precio < 0) return
    if (!Number.isInteger(datos.stock) || datos.stock < 0) return

    if (
      !Number.isInteger(datos.descuento) ||
      datos.descuento < 0 ||
      datos.descuento > 100
    ) return

    if (idEditando !== null) {
      setProductos((actuales) =>
        actuales.map((producto) =>
          producto.id === idEditando
            ? { ...producto, ...datos }
            : producto
        )
      )
    } else {
      const numeros = productos
        .map((producto) => String(producto.id))
        .filter((id) => /^CL\d+$/.test(id))
        .map((id) => Number(id.slice(2)))

      const ultimoGuardado = Number(
        localStorage.getItem('ultimoIdProducto') || 0
      )

      const siguienteNumero =
        Math.max(0, ultimoGuardado, ...numeros) + 1

      const nuevoId = `CL${String(siguienteNumero).padStart(3, '0')}`

      localStorage.setItem(
        'ultimoIdProducto',
        String(siguienteNumero)
      )

      const nuevoProducto = {
        id: nuevoId,
        ...datos,
        descripcion: '',
        imagen: 'img/logovolcan.jpg'
      }

      setProductos((actuales) => [...actuales, nuevoProducto])
    }

    setFormulario(formularioInicial)
    setIdEditando(null)
  }


  const editarProducto = (producto) => {
    setIdEditando(producto.id)

    setFormulario({
      nombre: producto.nombre ?? '',
      categoria: producto.categoria ?? '',
      precio: String(producto.precio ?? ''),
      stock: String(producto.stock ?? ''),
      descuento: String(producto.descuento ?? 0)
    })
  }

  const eliminarProducto = (id) => {
    const confirmar = window.confirm(
      '¿Seguro que deseas eliminar este producto?'
    )

    if (!confirmar) return

    setProductos((actuales) =>
      actuales.filter((producto) => producto.id !== id)
    )

    if (idEditando === id) {
      setFormulario(formularioInicial)
      setIdEditando(null)
    }
  }

  const cancelarEdicion = () => {
    setFormulario(formularioInicial)
    setIdEditando(null)
  }

  return (
    <Container className="py-4">
      <h1>Administración de productos</h1>

      <p>
        Agrega, modifica y elimina productos de Gas El Volcán.
      </p>

      <h2 className="h4 mt-4">
        {idEditando !== null ? 'Editar producto' : 'Agregar producto'}
      </h2>

      <Form onSubmit={guardarProducto} className="mb-4">
        <Form.Group className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            name="nombre"
            value={formulario.nombre}
            onChange={manejarCambio}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Categoría</Form.Label>
          <Form.Control
            name="categoria"
            value={formulario.categoria}
            onChange={manejarCambio}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Precio</Form.Label>
          <Form.Control
            type="number"
            name="precio"
            value={formulario.precio}
            onChange={manejarCambio}
            min="0"
            step="any"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Stock</Form.Label>
          <Form.Control
            type="number"
            name="stock"
            value={formulario.stock}
            onChange={manejarCambio}
            min="0"
            step="1"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Descuento (%)</Form.Label>
          <Form.Control
            type="number"
            name="descuento"
            value={formulario.descuento}
            onChange={manejarCambio}
            min="0"
            max="100"
            step="1"
            placeholder="0"
          />
        </Form.Group>

        <Button type="submit" variant="success">
          {idEditando !== null ? 'Guardar cambios' : 'Agregar producto'}
        </Button>

        {idEditando !== null && (
          <Button
            type="button"
            variant="secondary"
            className="ms-2"
            onClick={cancelarEdicion}
          >
            Cancelar
          </Button>
        )}
      </Form>

      <h2 className="h4">Listado de productos</h2>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Producto</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {productos.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center">
                No hay productos registrados.
              </td>
            </tr>
          ) : (
            productos.map((producto) => (
              <tr key={producto.id}>
                <td>{producto.id}</td>
                <td>{producto.nombre}</td>
                <td>{producto.categoria}</td>
                <td>
                  ${Number(producto.precio ?? 0).toLocaleString('es-CL')}
                </td>
                <td>{producto.stock ?? 0}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => editarProducto(producto)}
                  >
                    Editar
                  </Button>

                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => eliminarProducto(producto.id)}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </Container>
  )
}

export default AdminProductos
