import { useState } from 'react'
import { Container, Form, Button, Card, Alert } from 'react-bootstrap'
import { validarConsultaContacto } from '../utils/validarContacto.js'

const formularioInicial = { nombre: '', correo: '', comentario: '' }

function Contacto() {
  const [formulario, setFormulario] = useState(formularioInicial)
  const [error, setError] = useState('')
  const [mensaje, setMensaje] = useState('')

  const manejarCambio = (evento) => {
    const { name, value } = evento.target
    setFormulario((anterior) => ({ ...anterior, [name]: value }))
    setError('')
    setMensaje('')
  }

  const enviarConsulta = (evento) => {
    evento.preventDefault()

    const resultado = validarConsultaContacto(formulario)
    if (!resultado.correcto) {
      setError(resultado.mensaje)
      setMensaje('')
      return
    }

    try {
      const clave = 'consultasGas'
      const guardadas = JSON.parse(localStorage.getItem(clave) || '[]')
      const consultas = Array.isArray(guardadas) ? guardadas : []

      consultas.push({
        id: Date.now().toString(),
        ...resultado.consulta,
        fecha: new Date().toISOString()
      })

      localStorage.setItem(clave, JSON.stringify(consultas))
      setFormulario({ ...formularioInicial })
      setError('')
      setMensaje('Consulta registrada correctamente en esta demostración.')
    } catch {
      setError('No fue posible guardar la consulta en este navegador. Inténtalo nuevamente.')
      setMensaje('')
    }
  }

  return (
    <Container className="py-5">
      <div className="text-center mb-4">
        <h1>Contacto</h1>
        <p className="lead">¿Tienes dudas sobre nuestros productos o despachos? Escríbenos.</p>
      </div>

      <Card className="mx-auto shadow-sm" style={{ maxWidth: '650px' }}>
        <Card.Body className="p-4">
          {error && <Alert variant="danger" role="alert">{error}</Alert>}
          {mensaje && <Alert variant="success" role="status">{mensaje}</Alert>}

          <Form onSubmit={enviarConsulta} noValidate>
            <Form.Group className="mb-3" controlId="contacto-nombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                autoComplete="name"
                value={formulario.nombre}
                onChange={manejarCambio}
                maxLength={100}
                placeholder="Ingresa tu nombre"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="contacto-correo">
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control
                type="email"
                name="correo"
                autoComplete="email"
                value={formulario.correo}
                onChange={manejarCambio}
                maxLength={100}
                placeholder="correo@ejemplo.com"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="contacto-comentario">
              <Form.Label>Comentario</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                name="comentario"
                value={formulario.comentario}
                onChange={manejarCambio}
                maxLength={500}
                placeholder="Escribe tu consulta"
                required
              />
              <Form.Text muted>{formulario.comentario.length}/500 caracteres</Form.Text>
            </Form.Group>

            <Button type="submit" variant="success">Registrar consulta</Button>
          </Form>

          <p className="text-muted small mt-3 mb-0">
            Versión de demostración: la consulta queda guardada únicamente en este navegador.
            No se envía por correo electrónico.
          </p>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default Contacto
