import { Container, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function CompraExitosa() {
  return (
    <Container className="text-center py-5">
      <h1 className="text-success">
        ¡Compra realizada con éxito!
      </h1>

      <p className="mt-3">
        Gracias por comprar en Gas El Volcán.
      </p>

      <p>
        Tu pedido ha sido registrado correctamente.
      </p>

      <Button
        as={Link}
        to="/productos"
        variant="warning"
        className="mt-3"
      >
        Volver a productos
      </Button>
    </Container>
  )
}

export default CompraExitosa