import { useState } from 'react'
import { Container, Card, Form, Button, Alert } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { validarCredenciales } from '../utils/autenticacion.js'

function Login({ iniciarSesion, ingresarCliente, ingresarRepartidor  }) {
  const [correo, setCorreo] = useState('')
  const [clave, setClave] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate()

  const manejarIngreso = (evento) => {
    evento.preventDefault()
    setError('')

    const administrador = validarCredenciales(correo, clave)

    if (administrador) {
      iniciarSesion(administrador)
      navigate('/admin/productos')
      return
    }

    const clienteValido = ingresarCliente(correo, clave)

    if (clienteValido) {
      navigate('/')
      return
    }

    const repartidorValido = ingresarRepartidor(correo, clave)

    if (repartidorValido) {
      navigate('/repartidor')
      return
    }

    setError('Correo o contraseña incorrectos.')
  }

  return (
    <Container className="py-5">
      <Card
        className="mx-auto shadow-sm"
        style={{ maxWidth: '480px' }}
      >
        <Card.Body className="p-4">
          <div className="text-center mb-4">
            <img
              src="/img/logovolcan.jpg"
              alt="Gas El Volcán"
              style={{ width: '100px' }}
            />

            <h1 className="h3 mt-3">Iniciar sesión</h1>
            <p>Ingresa para continuar.</p>
          </div>

          {error && (
            <Alert variant="danger">
              {error}
            </Alert>
          )}

          <Form onSubmit={manejarIngreso}>
            <Form.Group className="mb-3">
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control
                type="email"
                name="correo"
                value={correo}
                onChange={(evento) => {
                  setCorreo(evento.target.value)
                  setError('')
                }}
                maxLength={100}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                name="clave"
                value={clave}
                onChange={(evento) => {
                  setClave(evento.target.value)
                  setError('')
                }}
                required
              />
            </Form.Group>

            <Button
              type="submit"
              variant="success"
              className="w-100"
            >
              Ingresar
            </Button>
          </Form>

          <p className="text-center mt-3 mb-0">
            ¿No tienes cuenta?{' '}
            <Link to="/registro">
              Regístrate aquí
            </Link>
          </p>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default Login
