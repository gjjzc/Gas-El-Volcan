
import { Container, Row, Col } from 'react-bootstrap'
import ProductCard from './ProductCard.jsx'
import { Link, useSearchParams } from 'react-router-dom'

function ProductList({ productos, agregarAlCarrito }) {
  const [searchParams] = useSearchParams()

  const categoriaSeleccionada = searchParams.get('categoria')

  const productosFiltrados = categoriaSeleccionada
    ? productos.filter(
        (producto) => producto.categoria === categoriaSeleccionada
      )
    : productos

  return (
    <Container className="py-4">
      <h1>Nuestros productos</h1>

      <h2>
        {categoriaSeleccionada
          ? `Productos de ${categoriaSeleccionada}`
          : 'Todos nuestros productos'}
      </h2>

      {categoriaSeleccionada && (
        <Link
          to="/productos"
          className="btn btn-outline-primary mb-3"
        >
          Ver todos los productos
        </Link>
      )}

      <p>Productos encontrados: {productosFiltrados.length}</p>

      <Row xs={1} sm={2} md={3} className="g-4">
        {productosFiltrados.map((producto) => (
          <Col key={producto.id}>
            <ProductCard
              nombre={producto.nombre}
              precio={producto.precio}
              imagen={`/${producto.imagen}`}
              producto={producto}
              agregarAlCarrito={agregarAlCarrito}
            />
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default ProductList
