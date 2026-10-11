import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Inicio({ productos, agregarAlCarrito }) {
  const destacados = productos.slice(0, 3)

  return (
    <>
      <section className="bg-light py-5">
        <Container>
          <Row className="align-items-center g-4">
            <Col md={6}>
              <span className="text-success fw-bold">
                Gas a domicilio en Chillán
              </span>

              <h1 className="display-4 fw-bold mt-3">
                Tu gas, rápido y seguro.
              </h1>

              <p className="lead">
                Compra cilindros, reguladores y accesorios
                para tu hogar o negocio. Revisa nuestro
                catálogo y arma tu pedido desde cualquier
                dispositivo.
              </p>

              <div className="d-flex gap-2 flex-wrap">
                <Button as={Link} to="/productos" variant="success">
                  Ver productos
                </Button>

                <Button as={Link} to="/nosotros" variant="outline-success">
                  Conócenos
                </Button>
              </div>
            </Col>

            <Col md={6}>
              <img
                src="/img/portada.jpg"
                alt="Distribución de Gas El Volcán"
                className="img-fluid rounded-4 shadow"
              />
            </Col>
          </Row>
        </Container>
      </section>

      <section className="py-5">
        <Container>
          <h2 className="text-center mb-4">
            ¿Cómo funciona tu pedido?
          </h2>

          <Row className="g-4">
            {[
              'Elige tus productos y agrégalos al carrito.',
              'Revisa tu pedido y confirma las cantidades.',
              'Recibe tu pedido según tu zona de despacho.'
            ].map((paso, indice) => (
              <Col md={4} key={indice}>
                <Card className="h-100 text-center shadow-sm">
                  <Card.Body className="p-4">
                    <h3 className="text-success">
                      {String(indice + 1).padStart(2, '0')}
                    </h3>
                    <p className="mb-0">{paso}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section className="bg-light py-5">
        <Container>
          <h2 className="text-center">Productos destacados</h2>
          <p className="text-center mb-4">
            Lo que necesitas para mantener tu hogar funcionando.
          </p>

          <Row className="g-4">
            {destacados.map((producto) => {
              const descuento = Number(producto.descuento ?? 0)
              const precioFinal = Math.round(
                Number(producto.precio) * (1 - descuento / 100)
              )

              return (
                <Col md={4} key={producto.id}>
                  <Card className="h-100 shadow-sm">
                    <Card.Img
                      variant="top"
                      src={`/${producto.imagen}`}
                      alt={producto.nombre}
                      style={{
                        height: '200px',
                        objectFit: 'contain'
                      }}
                    />

                    <Card.Body className="d-flex flex-column">
                      <Card.Title>{producto.nombre}</Card.Title>

                      {descuento > 0 && (
                        <p className="text-muted text-decoration-line-through mb-1">
                          ${Number(producto.precio).toLocaleString('es-CL')}
                        </p>
                      )}

                      <h3 className="h5 text-success">
                        ${precioFinal.toLocaleString('es-CL')}
                      </h3>

                      <Button
                        variant="warning"
                        className="mt-auto"
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

          <div className="text-center mt-4">
            <Button as={Link} to="/productos" variant="outline-success">
              Ver catálogo completo
            </Button>
          </div>
        </Container>
      </section>

      <section className="py-5">
        <Container>
          <h2 className="text-center mb-4">
            ¿Por qué comprar con nosotros?
          </h2>

          <Row className="g-4">
            {[
              {
                titulo: 'Despacho a domicilio',
                texto: 'Cubrimos Chillán y comunas aledañas según nuestras zonas de despacho.'
              },
              {
                titulo: 'Compra simple',
                texto: 'Selecciona productos, agrega cantidades y revisa tu carrito.'
              },
              {
                titulo: 'Atención local',
                texto: 'Somos una empresa familiar enfocada en clientes residenciales y comerciales.'
              }
            ].map((ventaja, indice) => (
              <Col md={4} key={ventaja.titulo}>
                <Card className="h-100 border-0">
                  <Card.Body>
                    <h3 className="text-success">
                      {String(indice + 1).padStart(2, '0')}
                    </h3>
                    <h4>{ventaja.titulo}</h4>
                    <p>{ventaja.texto}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  )
}

export default Inicio
