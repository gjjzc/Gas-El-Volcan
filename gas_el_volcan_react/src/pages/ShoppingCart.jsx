import { useState } from 'react'
import { Container, Card, Form, Button, Alert } from 'react-bootstrap'
import DireccionFormulario from '../components/DireccionFormulario.jsx'
import { normalizarDireccion, validarDireccion } from '../utils/direccionDespacho.js'
import { useNavigate } from 'react-router-dom'

function ShoppingCart({
  carrito,
  usuario,
  eliminarDelCarrito,
  cambiarCantidad,
  finalizarCompra
}) {
  const [metodoPago, setMetodoPago] = useState('')
  const [error, setError] = useState('')
  const [direccion, setDireccion] = useState(() => normalizarDireccion(usuario))

  const cambiarDireccion = (evento) => {
    const { name, value } = evento.target
    setDireccion((anterior) => ({
      ...anterior,
      [name]: value,
      ...(name === 'region' ? { comuna: '' } : {})
    }))
    setError('')
  }

  const navigate = useNavigate()

  const total = carrito.reduce(
    (suma, producto) =>
      suma + producto.precio * producto.cantidad,
    0
  )

  const confirmarCompra = (simularFallo = false) => {
    if (!metodoPago) {
      setError('Selecciona un método de pago para continuar.')
      return
    }

    const domicilio = validarDireccion(direccion)
    if (!domicilio.correcto) {
      setError(domicilio.mensaje)
      return
    }

    setError('')

    const compraExitosa = finalizarCompra(simularFallo, metodoPago, domicilio.direccion)

    if (compraExitosa) {
      navigate('/compra-exitosa')
    } else {
      navigate('/compra-fallida')
    }
  }

  return (
    <Container className="py-4">
      <h1 className="mb-4">Tu carrito de compras</h1>

      {carrito.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <>
          {carrito.map((producto, index) => (
            <Card className="mb-3 shadow-sm" key={producto.id}>
              <Card.Body>
                <h3 className="h5">{producto.nombre}</h3>

                <p>
                  Precio unitario: $
                  {producto.precio.toLocaleString('es-CL')}
                </p>

                <div className="d-flex align-items-center gap-3 mb-3">
                  <Button
                    type="button"
                    variant="outline-secondary"
                    onClick={() => cambiarCantidad(producto.id, -1)}
                  >
                    −
                  </Button>

                  <span>Cantidad: {producto.cantidad}</span>

                  <Button
                    type="button"
                    variant="outline-secondary"
                    onClick={() => cambiarCantidad(producto.id, 1)}
                  >
                    +
                  </Button>
                </div>

                <p>
                  Subtotal: $
                  {(producto.precio * producto.cantidad)
                    .toLocaleString('es-CL')}
                </p>

                <Button
                  type="button"
                  variant="danger"
                  onClick={() => eliminarDelCarrito(index)}
                >
                  Eliminar
                </Button>
              </Card.Body>
            </Card>
          ))}

          <Card className="shadow-sm mt-4">
            <Card.Body>
              <h2 className="h4">
                Total: ${total.toLocaleString('es-CL')}
              </h2>

              <hr />

              <h3 className="h5 mb-3">Dirección de entrega</h3>
              <p className="text-muted small">
                Confirma dónde debemos llevar tu pedido. Puedes corregir los datos antes de pagar.
              </p>
              <Form>
                <DireccionFormulario direccion={direccion} onChange={cambiarDireccion} />

                <hr className="my-4" />
                <h3 className="h5 mb-3">Método de pago</h3>
                <Form.Check
                  type="radio"
                  name="metodoPago"
                  id="pago-efectivo"
                  label="Efectivo al recibir el pedido"
                  value="efectivo"
                  checked={metodoPago === 'efectivo'}
                  onChange={(evento) => {
                    setMetodoPago(evento.target.value)
                    setError('')
                  }}
                  className="mb-3"
                />

                <Form.Check
                  type="radio"
                  name="metodoPago"
                  id="pago-tarjeta"
                  label="Tarjeta"
                  value="tarjeta"
                  checked={metodoPago === 'tarjeta'}
                  onChange={(evento) => {
                    setMetodoPago(evento.target.value)
                    setError('')
                  }}
                  className="mb-3"
                />
              </Form>

              {metodoPago === 'efectivo' && (
                <Alert variant="info">
                  Pagarás en efectivo cuando recibas tu pedido.
                </Alert>
              )}

              {metodoPago === 'tarjeta' && (
                <Alert variant="info">
                  El pago con tarjeta es una simulación.
                  No se solicitarán datos bancarios.
                </Alert>
              )}

              {error && (
                <Alert variant="danger">
                  {error}
                </Alert>
              )}

              <div className="d-flex flex-wrap gap-2 mt-3">
                <Button
                  type="button"
                  variant="success"
                  onClick={() => confirmarCompra(false)}
                >
                  Finalizar compra
                </Button>

                <Button
                  type="button"
                  variant="outline-danger"
                  onClick={() => confirmarCompra(true)}
                >
                  Simular compra fallida
                </Button>
              </div>
            </Card.Body>
          </Card>
        </>
      )}
    </Container>
  )
}

export default ShoppingCart
