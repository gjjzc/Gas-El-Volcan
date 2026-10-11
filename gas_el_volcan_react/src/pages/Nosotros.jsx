import { Container, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Nosotros() {
  return (
    <Container className="py-5">
      <div className="text-center mb-5">
        <h1>Nosotros</h1>
        <p className="lead">Conoce a Gas El Volcán.</p>
      </div>

      <Row className="align-items-center g-4">
        <Col md={6}>
          <img
            src="/img/portada.jpg"
            alt="Distribuidora Gas El Volcán"
            className="img-fluid rounded-4 shadow"
          />
        </Col>

        <Col md={6}>
          <h2 className="text-success">
            Una empresa familiar de Chillán
          </h2>

          <p>
            Distribuidora de Gas El Volcán es una empresa
            familiar ubicada en Chillán, Región de Ñuble,
            fundada en 1998.
          </p>

          <p>
            Distribuimos cilindros de gas licuado a domicilio
            para clientes residenciales y comerciales en
            Chillán y comunas aledañas.
          </p>

          <ul className="mb-4">
            <li>2 camiones de reparto.</li>
            <li>3 repartidores.</li>
            <li>1 operadora de llamadas.</li>
            <li>Atención residencial y comercial.</li>
          </ul>

          <Button as={Link} to="/contacto" variant="success">
            Contáctanos
          </Button>
        </Col>
      </Row>
    </Container>
  )
}

export default Nosotros
