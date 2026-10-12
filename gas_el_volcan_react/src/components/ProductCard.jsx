import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function ProductCard({ nombre, precio, imagen, producto, agregarAlCarrito }) {
  const descuento = Number(producto.descuento ?? 0)
  const precioFinal = Math.round(Number(precio) * (1 - descuento / 100))
  const disponible = Number(producto.stock) > 0
  const detalle = `/productos/${encodeURIComponent(producto.id)}`

  return (
    <Card className="h-100 shadow-sm tarjeta-producto">
      <Link to={detalle} aria-label={`Ver detalle de ${nombre}`}>
        <Card.Img
          variant="top"
          src={imagen}
          alt={nombre}
          className="tarjeta-producto-imagen"
        />
      </Link>
      <Card.Body className="d-flex flex-column">
        <Card.Title as="h3" className="h5">
          <Link to={detalle} className="enlace-producto">{nombre}</Link>
        </Card.Title>
        {descuento > 0 ? (
          <>
            <span className="badge bg-danger align-self-start mb-2">{descuento}% OFF</span>
            <p className="text-decoration-line-through text-muted mb-1">
              ${Number(precio).toLocaleString('es-CL')}
            </p>
            <p className="h5 text-success">${precioFinal.toLocaleString('es-CL')}</p>
          </>
        ) : (
          <p className="h5">${Number(precio).toLocaleString('es-CL')}</p>
        )}
        <p className={disponible ? 'text-success small' : 'text-danger small'}>
          {disponible ? `Disponibles: ${producto.stock}` : 'Sin stock'}
        </p>
        <div className="d-flex flex-wrap gap-2 mt-auto">
          <Button as={Link} to={detalle} variant="outline-success">
            Ver detalle
          </Button>
          <Button variant="warning" disabled={!disponible} onClick={() => agregarAlCarrito(producto)}>
            Agregar al carrito
          </Button>
        </div>
      </Card.Body>
    </Card>
  )
}

export default ProductCard
