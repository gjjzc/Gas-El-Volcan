import { Card, Button } from 'react-bootstrap'

function ProductCard({ nombre, precio, imagen, producto, agregarAlCarrito }) {
  const descuento = Number(producto.descuento ?? 0)

  const precioFinal = Math.round(
    Number(precio) * (1 - descuento / 100)
  )

  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={imagen}
        alt={nombre}
      />

      <Card.Body>
        <Card.Title>{nombre}</Card.Title>

        {descuento > 0 ? (
          <>
            <span className="badge bg-danger mb-2">
              {descuento}% OFF
            </span>

            <p className="text-decoration-line-through text-muted mb-1">
              ${Number(precio).toLocaleString('es-CL')}
            </p>

            <h3 className="h5 text-success">
              ${precioFinal.toLocaleString('es-CL')}
            </h3>
          </>
        ) : (
          <h3 className="h5">
            ${Number(precio).toLocaleString('es-CL')}
          </h3>
        )}

        <Button
          variant="warning"
          onClick={() => agregarAlCarrito(producto)}
        >
          Agregar al carrito
        </Button>
      </Card.Body>
    </Card>
  )
}

export default ProductCard
