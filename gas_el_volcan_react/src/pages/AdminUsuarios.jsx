import { useState } from 'react'
import {
    Container,
    Card,
    Form,
    Button,
    Alert,
    Table,
    Badge,
    Row,
    Col
} from 'react-bootstrap'


const comunasPorRegion = {
    'Ñuble': [
        'Chillán',
        'Chillán Viejo',
        'Bulnes',
        'Quillón',
        'El Carmen',
        'Pinto',
        'San Ignacio'
    ],
    'Biobío': [
        'Los Ángeles',
        'Concepción'
    ],
    'La Araucanía': [
        'Temuco'
    ]
}


const formularioInicial = {
    run: '',
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    correo: '',
    clave: '',
    region: '',
    comuna: '',
    rol: 'cliente'
}

function AdminUsuarios({
    usuarios = [],
    crearUsuario,
    editarUsuario,
    eliminarUsuario
}) {
    const [formulario, setFormulario] = useState(formularioInicial)
    const [usuarioEditando, setUsuarioEditando] = useState(null)
    const [mensaje, setMensaje] = useState('')
    const [error, setError] = useState('')

    const editando = usuarioEditando !== null

    const actualizarCampo = (evento) => {
        const { name, value } = evento.target

        setFormulario((anterior) => ({
            ...anterior,
            [name]: value,
            ...(name === 'region' ? { comuna: '' } : {})
        }))

        setMensaje('')
        setError('')
    }

    const limpiarFormulario = () => {
        setFormulario(formularioInicial)
        setUsuarioEditando(null)
        setError('')
    }

    const guardarUsuario = (evento) => {
        evento.preventDefault()
        setMensaje('')
        setError('')

        if (!formulario.run.trim()) {
            setError('Debes ingresar el RUN.')
            return
        }

        if (!formulario.nombre.trim()) {
            setError('Debes ingresar el nombre.')
            return
        }

        if (!formulario.correo.trim()) {
            setError('Debes ingresar el correo electrónico.')
            return
        }

        if (!editando && !formulario.clave) {
            setError('Debes ingresar una contraseña.')
            return
        }

        if (
            formulario.clave &&
            (formulario.clave.length < 4 || formulario.clave.length > 10)
        ) {
            setError('La contraseña debe tener entre 4 y 10 caracteres.')
            return
        }

        const resultado = editando
            ? editarUsuario(usuarioEditando, formulario)
            : crearUsuario(formulario)

        if (!resultado?.correcto) {
            setError(resultado?.mensaje || 'No se pudo guardar el usuario.')
            return
        }

        limpiarFormulario()
        setMensaje(resultado.mensaje || 'Usuario guardado correctamente.')
    }

    const comenzarEdicion = (usuario) => {
        setUsuarioEditando(usuario.run)

        setFormulario({
            run: usuario.run || '',
            nombre: usuario.nombre || '',
            apellidoPaterno: usuario.apellidoPaterno || '',
            apellidoMaterno: usuario.apellidoMaterno || '',
            correo: usuario.correo || '',
            clave: '',
            region: usuario.region || '',
            comuna: usuario.comuna || '',
            rol: usuario.rol || 'cliente'
        })

        setMensaje('')
        setError('')

        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const confirmarEliminacion = (usuario) => {
        const confirmar = window.confirm(
            `¿Estás seguro de eliminar la cuenta de ${usuario.nombre}?`
        )

        if (!confirmar) {
            return
        }

        const resultado = eliminarUsuario(usuario.run)

        if (!resultado?.correcto) {
            setError(resultado?.mensaje || 'No se pudo eliminar el usuario.')
            return
        }

        if (usuarioEditando === usuario.run) {
            limpiarFormulario()
        }

        setError('')
        setMensaje(resultado.mensaje || 'Usuario eliminado correctamente.')
    }

    return (
        <Container className="py-4">
            <h1 className="mb-2">Administración de usuarios</h1>

            <p className="text-muted mb-4">
                Gestiona las cuentas de clientes y repartidores de Gas El Volcán.
            </p>

            {mensaje && (
                <Alert variant="success">{mensaje}</Alert>
            )}

            {error && (
                <Alert variant="danger">{error}</Alert>
            )}

            <Card className="shadow-sm mb-4">
                <Card.Header className="fw-bold">
                    {editando ? 'Editar usuario' : 'Crear usuario'}
                </Card.Header>

                <Card.Body>
                    <Form onSubmit={guardarUsuario}>
                        <Row className="g-3">
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>RUN</Form.Label>
                                    <Form.Control
                                        name="run"
                                        value={formulario.run}
                                        onChange={actualizarCampo}
                                        placeholder="12.345.678-9"
                                        maxLength={12}
                                        required
                                    />
                                </Form.Group>
                            </Col>

                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control
                                        name="nombre"
                                        value={formulario.nombre}
                                        onChange={actualizarCampo}
                                        maxLength={50}
                                        required
                                    />
                                </Form.Group>
                            </Col>

                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Apellido paterno</Form.Label>
                                    <Form.Control
                                        name="apellidoPaterno"
                                        value={formulario.apellidoPaterno}
                                        onChange={actualizarCampo}
                                        maxLength={50}
                                    />
                                </Form.Group>
                            </Col>

                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Apellido materno</Form.Label>
                                    <Form.Control
                                        name="apellidoMaterno"
                                        value={formulario.apellidoMaterno}
                                        onChange={actualizarCampo}
                                        maxLength={50}
                                    />
                                </Form.Group>
                            </Col>

                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Correo electrónico</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="correo"
                                        value={formulario.correo}
                                        onChange={actualizarCampo}
                                        maxLength={100}
                                        required
                                    />
                                </Form.Group>
                            </Col>

                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>
                                        {editando
                                            ? 'Nueva contraseña (opcional)'
                                            : 'Contraseña'}
                                    </Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="clave"
                                        value={formulario.clave}
                                        onChange={actualizarCampo}
                                        minLength={4}
                                        maxLength={10}
                                        required={!editando}
                                        autoComplete="new-password"
                                    />
                                    {editando && (
                                        <Form.Text>
                                            Déjala vacía para conservar la contraseña actual.
                                        </Form.Text>
                                    )}
                                </Form.Group>
                            </Col>

                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Región</Form.Label>
                                    <Form.Select
                                        name="region"
                                        value={formulario.region}
                                        onChange={actualizarCampo}
                                    >
                                        <option value="">Seleccionar región</option>
                                        <option value="Ñuble">Ñuble</option>
                                        <option value="Biobío">Biobío</option>
                                        <option value="La Araucanía">La Araucanía</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>


                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Comuna</Form.Label>

                                    <Form.Select
                                        name="comuna"
                                        value={formulario.comuna}
                                        onChange={actualizarCampo}
                                        disabled={!formulario.region}
                                        required
                                    >
                                        <option value="">
                                            Selecciona una comuna
                                        </option>

                                        {(comunasPorRegion[formulario.region] || []).map(
                                            (comuna) => (
                                                <option key={comuna} value={comuna}>
                                                    {comuna}
                                                </option>
                                            )
                                        )}
                                    </Form.Select>
                                </Form.Group>
                            </Col>


                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Tipo de cuenta</Form.Label>
                                    <Form.Select
                                        name="rol"
                                        value={formulario.rol}
                                        onChange={actualizarCampo}
                                        required
                                    >
                                        <option value="cliente">Cliente</option>
                                        <option value="repartidor">Repartidor</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>

                        <div className="d-flex flex-wrap gap-2 mt-4">
                            <Button type="submit" variant="success">
                                {editando ? 'Guardar cambios' : 'Crear cuenta'}
                            </Button>

                            {editando && (
                                <Button
                                    type="button"
                                    variant="outline-secondary"
                                    onClick={limpiarFormulario}
                                >
                                    Cancelar edición
                                </Button>
                            )}
                        </div>
                    </Form>
                </Card.Body>
            </Card>

            <Card className="shadow-sm">
                <Card.Header className="fw-bold">
                    Cuentas registradas ({usuarios.length})
                </Card.Header>

                <Card.Body>
                    {usuarios.length === 0 ? (
                        <Alert variant="info" className="mb-0">
                            Todavía no hay cuentas registradas.
                        </Alert>
                    ) : (
                        <div className="table-responsive">
                            <Table striped hover className="align-middle">
                                <thead>
                                    <tr>
                                        <th>RUN</th>
                                        <th>Nombre</th>
                                        <th>Correo</th>
                                        <th>Rol</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {usuarios.map((usuario) => (
                                        <tr key={usuario.run}>
                                            <td>{usuario.run}</td>

                                            <td>
                                                {usuario.nombre} {usuario.apellidoPaterno}
                                            </td>

                                            <td>{usuario.correo}</td>

                                            <td>
                                                <Badge
                                                    bg={
                                                        usuario.rol === 'repartidor'
                                                            ? 'primary'
                                                            : 'success'
                                                    }
                                                >
                                                    {usuario.rol === 'repartidor'
                                                        ? 'Repartidor'
                                                        : 'Cliente'}
                                                </Badge>
                                            </td>

                                            <td>
                                                <div className="d-flex gap-2">
                                                    <Button
                                                        variant="outline-primary"
                                                        size="sm"
                                                        onClick={() => comenzarEdicion(usuario)}
                                                    >
                                                        Editar
                                                    </Button>

                                                    <Button
                                                        variant="outline-danger"
                                                        size="sm"
                                                        onClick={() => confirmarEliminacion(usuario)}
                                                    >
                                                        Eliminar
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    )}
                </Card.Body>
            </Card>
        </Container>
    )
}

export default AdminUsuarios
