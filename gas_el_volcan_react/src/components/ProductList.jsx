import { useState } from 'react'
import { Container, Row, Col, Form } from 'react-bootstrap'
import { Link, useSearchParams } from 'react-router-dom'
import ProductCard from './ProductCard.jsx'

const normalizar = (texto) => String(texto ?? '')
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLocaleLowerCase('es-CL')

function ProductList({ productos, agregarAlCarrito }) {
  const [searchParams] = useSearchParams()
  const [busqueda, setBusqueda] = useState('')
  const categoriaSeleccionada = searchParams.get('categoria')
  const termino = normalizar(busqueda.trim())

  const productosFiltrados = productos.filter((producto) => {
    const coincideCategoria = !categoriaSeleccionada || producto.categoria === categoriaSeleccionada
    const textoProducto = normalizar(`${producto.nombre} ${producto.categoria ?? ''}`)
    return coincideCategoria && (!termino || textoProducto.includes(termino))
  })

  return (
    <Container className="py-4">
      <h1>Nuestros productos</h1>
      <h2 className="h4">
        {categoriaSeleccionada
          ? `Productos de ${categoriaSeleccionada}`
          : 'Todos nuestros productos'}
      </h2>

      <Form.Group className="mb-3" controlId="buscar-productos">
        <Form.Label>Buscar productos</Form.Label>
        <Form.Control
          type="search"
          placeholder="Busca por nombre o categoría"
          value={busqueda}
          onChange={(evento) => setBusqueda(evento.target.value)}
        />
      </Form.Group>

      {categoriaSeleccionada && (
        <Link to="/productos" className="btn btn-outline-success mb-3">
          Ver todos los productos
        </Link>
      )}

      <p aria-live="polite">Productos encontrados: {productosFiltrados.length}</p>
      {productosFiltrados.length === 0 ? (
        <p role="status">No encontramos productos con esos filtros. Prueba otra búsqueda.</p>
      ) : (
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
      )}
    </Container>
  )
}

export default ProductList
