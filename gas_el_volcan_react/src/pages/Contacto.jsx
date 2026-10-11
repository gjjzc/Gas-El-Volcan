import { Container, Form, Button, Card } from 'react-bootstrap'

function Contacto() {
  return (
    <Container className="py-5">
      <div className="text-center mb-4">
        <h1>Contacto</h1>
        <p className="lead">
          Envíanos tu consulta y te responderemos.
        </p>
      </div>

      <Card className="mx-auto shadow-sm" style={{ maxWidth: '650px' }}>
        <Card.Body className="p-4">
          <Form onSubmit={(evento) => evento.preventDefault()}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                maxLength={100}
                placeholder="Ingresa tu nombre"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control
                type="email"
                name="correo"
                maxLength={100}
                placeholder="correo@ejemplo.com"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Comentario</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                name="comentario"
                maxLength={500}
                placeholder="Escribe tu consulta"
                required
              />
            </Form.Group>

            <Button type="submit" variant="success">
              Enviar mensaje
            </Button>

            <p className="text-muted small mt-3 mb-0">
              Formulario en preparación. El envío de mensajes
              estará disponible cuando implementemos su lógica.
            </p>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default Contacto
