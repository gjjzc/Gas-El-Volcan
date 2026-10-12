import { Button, Col, Container, Row } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'

function DetalleProducto({ productos, agregarAlCarrito }) {
  const { id } = useParams()
  const producto = productos.find((item) => String(item.id) === id)

  if (!producto) {
    return (
      <Container className="py-5">
        <h1>Producto no encontrado</h1>
        <p>El producto solicitado no está disponible en el catálogo.</p>
        <Button as={Link} to="/productos" variant="outline-success">Volver al catálogo</Button>
      </Container>
    )
  }

  const descuento = Number(producto.descuento ?? 0)
  const precioFinal = Math.round(Number(producto.precio) * (1 - descuento / 100))
  const disponible = Number(producto.stock) > 0

  return (
    <Container className="py-4">
      <nav aria-label="Ruta de navegación" className="mb-4">
        <Link to="/productos" className="text-success">Productos</Link>
        <span aria-hidden="true"> / </span>
        <span>{producto.nombre}</span>
      </nav>
      <Row className="g-4 align-items-start">
        <Col md={6}>
          <div className="detalle-producto-imagen-contenedor">
            <img
              src={`/${producto.imagen}`}
              alt={producto.nombre}
              className="detalle-producto-imagen"
            />
          </div>
        </Col>
        <Col md={6}>
          <p className="text-success fw-semibold mb-2">{producto.categoria}</p>
          <h1>{producto.nombre}</h1>
          <p>{producto.descripcion || 'Descripción no disponible.'}</p>
          {descuento > 0 && (
            <>
              <p className="text-danger fw-semibold mb-1">{descuento}% de descuento</p>
              <p className="text-decoration-line-through text-muted mb-1">
                ${Number(producto.precio).toLocaleString('es-CL')}
              </p>
            </>
          )}
          <p className="h3 text-success">${precioFinal.toLocaleString('es-CL')}</p>
          <p className={disponible ? 'text-success' : 'text-danger'}>
            {disponible ? `Stock disponible: ${producto.stock}` : 'Producto sin stock'}
          </p>
          <div className="d-flex flex-wrap gap-2 mt-4">
            <Button
              variant="warning"
              disabled={!disponible}
              onClick={() => agregarAlCarrito(producto)}
            >
              Agregar al carrito
            </Button>
            <Button as={Link} to="/carrito" variant="outline-success">Ver carrito</Button>
            <Button as={Link} to="/productos" variant="outline-secondary">Seguir comprando</Button>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default DetalleProducto
