import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Blog() {
  const articulos = [
    {
      titulo: 'Cómo cuidar tu cilindro de gas',
      categoria: 'Consejos',
      descripcion: 'Recomendaciones generales para mantener una instalación ordenada y segura.',
      imagen: '/img/como-cuidar-el-cilindro-de-gas.jpeg',
      ruta: '/blog/cilindros'
    },
    {
      titulo: 'Seguridad con gas en el hogar',
      categoria: 'Seguridad',
      descripcion: 'Buenas prácticas para reconocer señales de riesgo y actuar con responsabilidad.',
      imagen: '/img/seguridad-en-tu-hogar.jpeg',
      ruta: '/blog/seguridad'
    }
  ]

  return (
    <Container className="py-5">
      <div className="text-center mb-5">
        <h1>Blog</h1>
        <p className="lead">
          Consejos y datos útiles para el uso responsable del gas.
        </p>
      </div>

      <Row className="g-4">
        {articulos.map((articulo) => (
          <Col md={6} key={articulo.ruta}>
            <Card className="h-100 shadow-sm">
              <Card.Img
                variant="top"
                src={articulo.imagen}
                alt={articulo.titulo}
                style={{
                  height: '260px',
                  objectFit: 'cover'
                }}
              />

              <Card.Body className="d-flex flex-column">
                <span className="text-success fw-bold">
                  {articulo.categoria}
                </span>

                <Card.Title className="mt-2">
                  {articulo.titulo}
                </Card.Title>

                <Card.Text>{articulo.descripcion}</Card.Text>

                <div className="mt-auto">
                  <Button as={Link} to={articulo.ruta} variant="success">
                    Leer artículo
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default Blog
