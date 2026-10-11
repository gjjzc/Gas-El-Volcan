import { useState } from 'react'
import {
  Container,
  Card,
  Table,
  Badge,
  Form,
  Alert
} from 'react-bootstrap'

const estados = {
  pendiente: 'Pendiente',
  preparacion: 'En preparación',
  camino: 'En camino',
  entregado: 'Entregado'
}

const colores = {
  pendiente: 'warning',
  preparacion: 'info',
  camino: 'primary',
  entregado: 'success'
}

function AdminPedidos({
  pedidos = [],
  usuarios = [],
  asignarRepartidor
}) {
  const [mensaje, setMensaje] = useState('')
  const [error, setError] = useState('')

  const repartidores = usuarios.filter(
    (usuario) => usuario.rol === 'repartidor'
  )

  const manejarAsignacion = (pedidoId, repartidorRun) => {
    setMensaje('')
    setError('')

    const resultado = asignarRepartidor(pedidoId, repartidorRun)

    if (!resultado?.correcto) {
      setError(
        resultado?.mensaje || 'No se pudo asignar el repartidor.'
      )
      return
    }

    setMensaje('Repartidor asignado correctamente.')
  }

  const formatearPrecio = (precio) => {
    return Number(precio).toLocaleString('es-CL', {
      style: 'currency',
      currency: 'CLP',
      maximumFractionDigits: 0
    })
  }

  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleString('es-CL')
  }

  return (
    <Container className="py-4">
      <h1 className="mb-2">Administración de pedidos</h1>

      <p className="text-muted mb-4">
        Consulta las compras y asigna repartidores a las entregas.
      </p>

      {mensaje && (
        <Alert variant="success">{mensaje}</Alert>
      )}

      {error && (
        <Alert variant="danger">{error}</Alert>
      )}

      <Card className="shadow-sm">
        <Card.Header className="fw-bold">
          Pedidos registrados ({pedidos.length})
        </Card.Header>

        <Card.Body>
          {pedidos.length === 0 ? (
            <Alert variant="info" className="mb-0">
              Todavía no hay pedidos registrados.
            </Alert>
          ) : (
            <div className="table-responsive">
              <Table striped hover className="align-middle">
                <thead>
                  <tr>
                    <th>Pedido</th>
                    <th>Fecha</th>
                    <th>Cliente</th>
                    <th>Productos</th>
                    <th>Total</th>
                    <th>Pago</th>
                    <th>Estado</th>
                    <th>Repartidor</th>
                  </tr>
                </thead>

                <tbody>
                  {[...pedidos].reverse().map((pedido) => (
                    <tr key={pedido.id}>
                      <td className="fw-bold">
                        {pedido.id}
                      </td>

                      <td>
                        {formatearFecha(pedido.fecha)}
                      </td>

                      <td>
                        {pedido.cliente ? (
                          <>
                            <div>{pedido.cliente.nombre}</div>
                            <small className="text-muted">
                              {pedido.cliente.correo}
                            </small>
                          </>
                        ) : (
                          <span className="text-muted">
                            Compra sin cuenta
                          </span>
                        )}
                      </td>

                      <td>
                        {(pedido.productos || []).map((producto) => (
                          <div key={producto.id}>
                            {producto.nombre} × {producto.cantidad}
                          </div>
                        ))}
                      </td>

                      <td className="fw-semibold">
                        {formatearPrecio(pedido.total)}
                      </td>

                      <td>
                        {pedido.metodoPago === 'efectivo'
                          ? 'Efectivo'
                          : 'Tarjeta'}
                      </td>

                      <td>
                        <Badge bg={colores[pedido.estado] || 'secondary'}>
                          {estados[pedido.estado] || pedido.estado}
                        </Badge>
                      </td>

                      <td>
                        <Form.Select
                          size="sm"
                          value={pedido.repartidorRun || ''}
                          onChange={(evento) =>
                            manejarAsignacion(
                              pedido.id,
                              evento.target.value
                            )
                          }
                          disabled={pedido.estado === 'entregado'}
                          aria-label={`Repartidor del pedido ${pedido.id}`}
                        >
                          <option value="">
                            Sin asignar
                          </option>

                          {repartidores.map((repartidor) => (
                            <option
                              key={repartidor.run}
                              value={repartidor.run}
                            >
                              {repartidor.nombre}{' '}
                              {repartidor.apellidoPaterno}
                            </option>
                          ))}
                        </Form.Select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </Card.Body>
      </Card>
    </Container>
  )
}

export default AdminPedidos
