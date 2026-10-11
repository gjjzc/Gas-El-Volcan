import { Container, Button, Card, Badge } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function CompraExitosa({ pedido }) {
  if (!pedido) {
    return (
      <Container className="text-center py-5">
        <h1 className="h3">No hay una compra reciente</h1>

        <p>
          Realiza una compra para ver su confirmación.
        </p>

        <Button as={Link} to="/productos" variant="warning">
          Ver productos
        </Button>
      </Container>
    )
  }

  const fecha = new Date(pedido.fecha).toLocaleString('es-CL')

  const nombreMetodoPago =
    pedido.metodoPago === 'efectivo'
      ? 'Efectivo al recibir'
      : 'Tarjeta (simulación)'

  return (
    <Container className="py-5">
      <Card
        className="mx-auto shadow-sm"
        style={{ maxWidth: '650px' }}
      >
        <Card.Body className="p-4">
          <div className="text-center mb-4">
            <i
              className="bi bi-check-circle-fill text-success"
              style={{ fontSize: '55px' }}
            ></i>

            <h1 className="h3 text-success mt-3">
              ¡Compra realizada con éxito!
            </h1>

            <p>
              Gracias por comprar en Gas El Volcán.
            </p>

            <p>
              Tu pedido ha sido registrado correctamente.
            </p>
          </div>

          <hr />

          <h2 className="h5 mb-3">
            Detalles de tu pedido
          </h2>

          <p>
            <strong>Número de pedido:</strong> {pedido.id}
          </p>

          <p>
            <strong>Fecha:</strong> {fecha}
          </p>

          <p>
            <strong>Método de pago:</strong> {nombreMetodoPago}
          </p>

          <p>
            <strong>Estado:</strong>{' '}
            <Badge bg="warning" text="dark">
              Pendiente
            </Badge>
          </p>

          <hr />

          <h3 className="h5 mb-3">
            Productos comprados
          </h3>

          {pedido.productos.map((producto) => (
            <div
              key={producto.id}
              className="d-flex justify-content-between mb-2"
            >
              <span>
                {producto.nombre} x {producto.cantidad}
              </span>

              <span>
                $
                {(producto.precio * producto.cantidad)
                  .toLocaleString('es-CL')}
              </span>
            </div>
          ))}

          <hr />

          <h3 className="h5 text-end">
            Total: ${pedido.total.toLocaleString('es-CL')}
          </h3>

          <div className="text-center mt-4">
            <Button
              as={Link}
              to="/productos"
              variant="warning"
            >
              Volver a productos
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default CompraExitosa
