import { Container, Card, Badge, Alert, Table } from 'react-bootstrap'

const estados = {
  pendiente: { nombre: 'Pendiente', color: 'warning' },
  preparacion: { nombre: 'En preparación', color: 'info' },
  camino: { nombre: 'En camino', color: 'primary' },
  entregado: { nombre: 'Entregado', color: 'success' }
}

function MisPedidos({ pedidos = [], usuario }) {
  const correoCliente = usuario?.correo?.trim().toLowerCase()

  const misPedidos = pedidos
    .filter(
      (pedido) =>
        pedido.cliente?.correo?.trim().toLowerCase() === correoCliente
    )
    .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))

  const formatearPrecio = (valor) =>
    Number(valor).toLocaleString('es-CL', {
      style: 'currency',
      currency: 'CLP',
      maximumFractionDigits: 0
    })

  return (
    <Container className="py-4">
      <h1 className="mb-2">Mis pedidos</h1>

      <p className="text-muted mb-4">
        Consulta tus compras y revisa el estado de sus entregas.
      </p>

      {misPedidos.length === 0 ? (
        <Alert variant="info">
          Todavía no tienes pedidos registrados con esta cuenta.
        </Alert>
      ) : (
        misPedidos.map((pedido) => {
          const estado = estados[pedido.estado] || estados.pendiente

          return (
            <Card key={pedido.id} className="shadow-sm mb-4">
              <Card.Header className="d-flex flex-wrap justify-content-between align-items-center gap-2">
                <strong>{pedido.id}</strong>

                <Badge
                  bg={estado.color}
                  text={
                    estado.color === 'warning' ||
                    estado.color === 'info'
                      ? 'dark'
                      : undefined
                  }
                >
                  {estado.nombre}
                </Badge>
              </Card.Header>

              <Card.Body>
                <p>
                  <strong>Fecha:</strong>{' '}
                  {new Date(pedido.fecha).toLocaleString('es-CL')}
                </p>

                <p>
                  <strong>Método de pago:</strong>{' '}
                  {pedido.metodoPago === 'efectivo'
                    ? 'Efectivo'
                    : 'Tarjeta'}
                </p>

                <div className="table-responsive">
                  <Table striped className="align-middle">
                    <thead>
                      <tr>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Subtotal</th>
                      </tr>
                    </thead>

                    <tbody>
                      {pedido.productos.map((producto, indice) => (
                        <tr key={`${producto.id}-${indice}`}>
                          <td>{producto.nombre}</td>
                          <td>{producto.cantidad}</td>
                          <td>
                            {formatearPrecio(
                              producto.precio * producto.cantidad
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>

                <p className="text-end fs-5 fw-bold mb-0">
                  Total: {formatearPrecio(pedido.total)}
                </p>
              </Card.Body>
            </Card>
          )
        })
      )}
    </Container>
  )
}

export default MisPedidos
