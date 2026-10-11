import { Container, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function CompraFallida() {
  return (
    <Container className="text-center py-5">
      <h1 className="text-danger">
        No se pudo realizar la compra
      </h1>

      <p className="mt-3">
        Ocurrió un problema al procesar tu pedido.
      </p>

      <p>
        Tus productos siguen disponibles en el carrito.
      </p>

      <Button
        as={Link}
        to="/carrito"
        variant="warning"
        className="mt-3"
      >
        Volver al carrito
      </Button>
    </Container>
  )
}

export default CompraFallida