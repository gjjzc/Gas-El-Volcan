import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Ofertas({ productos, agregarAlCarrito }) {
    const productosEnOferta = productos.filter(
        (producto) => Number(producto.descuento) > 0
    )

    const formatearPrecio = (precio) =>
        Number(precio).toLocaleString('es-CL')

    return (
        <Container className="py-4">
            <h1>Ofertas especiales</h1>
            <p>Aprovecha nuestros descuentos en productos seleccionados.</p>

            {productosEnOferta.length === 0 ? (
                <p>Actualmente no tenemos productos en oferta.</p>
            ) : (
                <Row xs={1} sm={2} md={3} className="g-4">
                    {productosEnOferta.map((producto) => {
                        const precioFinal = Math.round(
                            producto.precio * (1 - producto.descuento / 100)
                        )

                        return (
                            <Col key={producto.id}>
                                <Card className="h-100">
                                    <Card.Img
                                        variant="top"
                                        src={`/${producto.imagen}`}
                                        alt={producto.nombre}
                                        style={{
                                            height: '180px',
                                            objectFit: 'contain'
                                        }}
                                    />

                                    <Card.Body>
                                        <Card.Title>{producto.nombre}</Card.Title>

                                        <p className="text-danger fw-bold">
                                            {producto.descuento}% de descuento
                                        </p>

                                        <p className="text-decoration-line-through">
                                            ${formatearPrecio(producto.precio)}
                                        </p>

                                        <h3 className="h5">
                                            ${formatearPrecio(precioFinal)}
                                        </h3>

                                        <Button
                                            as={Link}
                                            to={`/productos/${encodeURIComponent(producto.id)}`}
                                            variant="outline-success"
                                            className="me-2 mb-2"
                                        >
                                            Ver detalle
                                        </Button>

                                        <Button
                                            variant="success"
                                            onClick={() => agregarAlCarrito(producto)}
                                        >
                                            Agregar al carrito
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                    })}
                </Row>
            )}
        </Container>
    )
}

export default Ofertas
