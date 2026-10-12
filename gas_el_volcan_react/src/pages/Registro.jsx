import { useState } from 'react'
import { Container, Card, Form, Button, Alert, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { limpiarRUN, validarRUN } from '../utils/validaciones.js'
import DireccionFormulario from '../components/DireccionFormulario.jsx'
import { validarDireccion } from '../utils/direccionDespacho.js'

const formularioInicial = {
    run: '',
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    correo: '',
    clave: '',
    confirmarClave: '',
    region: '',
    comuna: '',
    calle: '',
    numero: '',
    departamento: '',
    referencia: ''
}

const limpiarNombre = (valor) =>
    valor.replace(/[^A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]/g, '')

const validarNombre = (valor) =>
    /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+(?:\s+[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+)*$/.test(
        valor.trim()
    )

function Registro({ registrarCliente }) {
    const [formulario, setFormulario] = useState(formularioInicial)
    const [error, setError] = useState('')
    const [mensaje, setMensaje] = useState('')

    const manejarCambio = (evento) => {
        const { name, value } = evento.target

        let nuevoValor = value

        if (name === 'run') {
            nuevoValor = limpiarRUN(value)
        }

        if (['nombre', 'apellidoPaterno', 'apellidoMaterno'].includes(name)) {
            nuevoValor = limpiarNombre(value)
        }

        setFormulario((anterior) => ({
            ...anterior,
            [name]: nuevoValor,
            ...(name === 'region' ? { comuna: '' } : {})
        }))

        setError('')
        setMensaje('')
    }

    const registrarUsuario = (evento) => {
        evento.preventDefault()

        const {
            run,
            nombre,
            apellidoPaterno,
            apellidoMaterno,
            correo,
            clave,
            confirmarClave,
            region,
            comuna
        } = formulario

        if (!validarRUN(run)) {
            setError('El RUN ingresado no es válido.')
            return
        }

        if (!validarNombre(nombre) ||
            !validarNombre(apellidoPaterno) ||
            !validarNombre(apellidoMaterno)) {
            setError('El nombre y los apellidos solo pueden contener letras.')
            return
        }

        const correoValido =
            /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i.test(correo)

        if (!correoValido) {
            setError('Utiliza un correo @duoc.cl, @profesor.duoc.cl o @gmail.com.')
            return
        }

        if (clave.length < 4 || clave.length > 10) {
            setError('La contraseña debe tener entre 4 y 10 caracteres.')
            return
        }

        if (clave !== confirmarClave) {
            setError('Las contraseñas no coinciden.')
            return
        }

        if (!run.trim() || !region || !comuna) {
            setError('Completa todos los campos obligatorios.')
            return
        }

        const domicilio = validarDireccion(formulario)
        if (!domicilio.correcto) {
            setError(domicilio.mensaje)
            return
        }

        const resultado = registrarCliente({ ...formulario, ...domicilio.direccion })

        if (!resultado.correcto) {
            setError(resultado.mensaje)
            setMensaje('')
            return
        }

        setError('')
        setMensaje(resultado.mensaje)
        setFormulario({ ...formularioInicial })
    }

    return (
        <Container className="py-5">
            <Card className="mx-auto shadow-sm" style={{ maxWidth: '750px' }}>
                <Card.Body className="p-4">
                    <h1 className="h3 text-center mb-3">
                        Registro de usuario
                    </h1>

                    <p className="text-center text-muted">
                        Completa tus datos para registrarte en Gas El Volcán.
                    </p>

                    {error && <Alert variant="danger">{error}</Alert>}
                    {mensaje && <Alert variant="success">{mensaje}</Alert>}

                    <Form onSubmit={registrarUsuario}>
                        <Form.Group className="mb-3">
                            <Form.Label>RUN</Form.Label>
                            <Form.Control
                                name="run"
                                value={formulario.run}
                                onChange={manejarCambio}
                                placeholder="12.345.678-5"
                                maxLength={12}
                                required
                            />
                        </Form.Group>

                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control
                                        name="nombre"
                                        value={formulario.nombre}
                                        onChange={manejarCambio}
                                        required
                                    />
                                </Form.Group>
                            </Col>

                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Apellido paterno</Form.Label>
                                    <Form.Control
                                        name="apellidoPaterno"
                                        value={formulario.apellidoPaterno}
                                        onChange={manejarCambio}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group className="mb-3">
                            <Form.Label>Apellido materno</Form.Label>
                            <Form.Control
                                name="apellidoMaterno"
                                value={formulario.apellidoMaterno}
                                onChange={manejarCambio}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Correo electrónico</Form.Label>
                            <Form.Control
                                type="email"
                                name="correo"
                                value={formulario.correo}
                                onChange={manejarCambio}
                                required
                            />
                        </Form.Group>

                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Contraseña</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="clave"
                                        value={formulario.clave}
                                        onChange={manejarCambio}
                                        minLength={4}
                                        maxLength={10}
                                        required
                                    />
                                </Form.Group>
                            </Col>

                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Confirmar contraseña</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="confirmarClave"
                                        value={formulario.confirmarClave}
                                        onChange={manejarCambio}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <h2 className="h5 mt-3">Dirección para despacho</h2>
                        <p className="text-muted small">Se usará para completar tus pedidos. Podrás cambiarla antes de comprar.</p>
                        <DireccionFormulario direccion={formulario} onChange={manejarCambio} />

                        <Button type="submit" variant="success" className="w-100">
                            Registrarse
                        </Button>
                    </Form>

                    <p className="text-center mt-3 mb-0">
                        ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
                    </p>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default Registro
