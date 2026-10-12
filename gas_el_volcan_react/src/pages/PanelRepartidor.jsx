import { Container, Card, Table, Badge, Button, Alert } from 'react-bootstrap'
import { useState } from 'react'

function PanelRepartidor({ pedidos = [], usuario, actualizarEstadoPedido }) {
  const [mensaje, setMensaje] = useState('')
  const [error, setError] = useState(false)

  const misEntregas = pedidos
    .filter((pedido) => pedido.repartidorRun === usuario?.run)
    .slice()
    .reverse()

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

  const siguientesEstados = {
    pendiente: 'preparacion',
    preparacion: 'camino',
    camino: 'entregado'
  }

  const cambiarEstado = (pedido) => {
    const nuevoEstado = siguientesEstados[pedido.estado]

    if (!nuevoEstado) return

    const resultado = actualizarEstadoPedido(pedido.id, nuevoEstado)

    setMensaje(resultado.mensaje)
    setError(!resultado.correcto)
  }

  const formatoPrecio = (precio) =>
    Number(precio).toLocaleString('es-CL', {
      style: 'currency',
      currency: 'CLP',
      maximumFractionDigits: 0
    })

  return (
    <Container className="py-4">
      <h1 className="mb-3">Panel de entregas</h1>

      <p>
        Bienvenido, <strong>{usuario?.nombre}</strong>.
        Aquí puedes gestionar los pedidos asignados.
      </p>

      {mensaje && (
        <Alert
          variant={error ? 'danger' : 'success'}
          dismissible
          onClose={() => setMensaje('')}
        >
          {mensaje}
        </Alert>
      )}

      {misEntregas.length === 0 ? (
        <Alert variant="info">
          Actualmente no tienes pedidos asignados.
        </Alert>
      ) : (
        <Card>
          <Card.Body>
            <Table responsive striped hover className="align-middle">
              <thead>
                <tr>
                  <th>Pedido</th>
                  <th>Cliente</th>
                  <th>Productos</th>
                  <th>Total</th>
                  <th>Estado</th>
                  <th>Acción</th>
                </tr>
              </thead>

              <tbody>
                {misEntregas.map((pedido) => (
                  <tr key={pedido.id}>
                    <td>{pedido.id}</td>

                    <td>
                      {pedido.cliente?.nombre || 'Compra sin cuenta'}
                    </td>

                    <td>
                      {pedido.productos.map((producto) => (
                        <div key={producto.id}>
                          {producto.nombre} × {producto.cantidad}
                        </div>
                      ))}
                    </td>

                    <td>{formatoPrecio(pedido.total)}</td>

                    <td>
                      <Badge bg={colores[pedido.estado] || 'secondary'}>
                        {estados[pedido.estado] || pedido.estado}
                      </Badge>
                    </td>

                    <td>
                      {pedido.estado === 'entregado' ? (
                        <span className="text-success fw-semibold">
                          Entrega completada
                        </span>
                      ) : (
                        <Button
                          variant="primary"
                          size="sm"
                          disabled={!siguientesEstados[pedido.estado]}
                          onClick={() => cambiarEstado(pedido)}
                        >
                          Avanzar a {
                            estados[siguientesEstados[pedido.estado]]
                          }
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      )}
    </Container>
  )
}

export default PanelRepartidor
