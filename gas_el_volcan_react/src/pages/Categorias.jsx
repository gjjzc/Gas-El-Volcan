import { Container, Card, Button, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Categorias({ productos }) {
  const categorias = [...new Set(productos.map(
    (producto) => producto.categoria
  ))]

  return (
    <Container className="py-4">
      <h1>Categorías de productos</h1>
      <p>Explora nuestros productos por categoría.</p>

      <Row className="g-3">
        {categorias.map((categoria) => {
          const cantidad = productos.filter(
            (producto) => producto.categoria === categoria
          ).length

          return (
            <Col md={4} key={categoria}>
              <Card className="h-100">
                <Card.Body>
                  <Card.Title>{categoria}</Card.Title>

                  <Card.Text>
                    {cantidad} productos disponibles
                  </Card.Text>

                  <Button
                    as={Link}
                    to={`/productos?categoria=${encodeURIComponent(categoria)}`}
                    variant="primary"
                  >
                    Ver productos
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          )
        })}
      </Row>
    </Container>
  )
}

export default Categorias