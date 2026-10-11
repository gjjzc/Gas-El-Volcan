import { Container, Card, Button } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'

const articulos = {
  cilindros: {
    titulo: 'Cómo cuidar tu cilindro de gas',
    imagen: '/img/como-cuidar-el-cilindro-de-gas.jpeg',
    parrafos: [
      'Mantén el cilindro en un lugar ventilado, estable y protegido de golpes. Evita ubicarlo cerca de fuentes directas de calor.',
      'Antes de utilizar un cilindro, revisa visualmente sus conexiones y accesorios. Si detectas una condición insegura, solicita orientación antes de continuar.'
    ]
  },
  seguridad: {
    titulo: 'Seguridad con gas en el hogar',
    imagen: '/img/seguridad-en-tu-hogar.jpeg',
    parrafos: [
      'Una instalación responsable comienza por mantener las conexiones en buenas condiciones y utilizar accesorios compatibles.',
      'Si percibes olor a gas, evita generar llamas o chispas, ventila el lugar cuando sea seguro hacerlo y solicita asistencia.'
    ]
  }
}

function ArticuloBlog() {
  const { articulo } = useParams()
  const datos = articulos[articulo]

  if (!datos) {
    return (
      <Container className="py-5">
        <h1>Artículo no encontrado</h1>
        <Button as={Link} to="/blog" variant="success">
          Volver al blog
        </Button>
      </Container>
    )
  }

  return (
    <Container className="py-5">
      <Card className="mx-auto shadow-sm" style={{ maxWidth: '850px' }}>
        <Card.Img
          variant="top"
          src={datos.imagen}
          alt={datos.titulo}
          style={{ maxHeight: '400px', objectFit: 'cover' }}
        />

        <Card.Body className="p-4">
          <span className="text-success fw-bold">
            Gas El Volcán
          </span>

          <h1 className="my-3">{datos.titulo}</h1>

          {datos.parrafos.map((parrafo) => (
            <p key={parrafo}>{parrafo}</p>
          ))}

          <Button as={Link} to="/blog" variant="outline-success">
            Volver al blog
          </Button>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default ArticuloBlog
