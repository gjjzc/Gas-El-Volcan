import { Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

function ShoppingCart({ carrito, eliminarDelCarrito, cambiarCantidad, finalizarCompra }) {
    const total = carrito.reduce((suma, producto) => {
        return suma + producto.precio * producto.cantidad
    }, 0)

    const navigate = useNavigate()

    const confirmarCompra = (simularFallo = false) => {
        const compraExitosa = finalizarCompra(simularFallo)

        if (compraExitosa) {
            navigate('/compra-exitosa')
        } else {
            navigate('/compra-fallida')
        }
    }
    return (
        <Container>
            <h1>Tu carrito de compras</h1>

            {carrito.length === 0 ? (
                <p>Tu carrito está vacío.</p>
            ) : (
                <div>
                    {carrito.map((producto, index) => (
                        <div key={producto.id} className="mb-3">
                            <h3>{producto.nombre}</h3>

                            <p>
                                Precio unitario: ${producto.precio.toLocaleString('es-CL')}
                            </p>


                            <div className="d-flex align-items-center gap-3 mb-3">
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={() => cambiarCantidad(producto.id, -1)}
                                >
                                    −
                                </button>

                                <span>Cantidad: {producto.cantidad}</span>

                                <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={() => cambiarCantidad(producto.id, 1)}
                                >
                                    +
                                </button>
                            </div>


                            <p>
                                Subtotal: ${(producto.precio * producto.cantidad).toLocaleString('es-CL')}
                            </p>

                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() => eliminarDelCarrito(index)}
                            >
                                Eliminar
                            </button>
                        </div>
                    ))}


                    <hr />

                    <h2>
                        Total: ${total.toLocaleString('es-CL')}
                    </h2>

                    <button
                        type="button"
                        className="btn btn-success mt-3"
                        onClick={() => confirmarCompra(false)}
                    >
                        Finalizar compra
                    </button>

                    <button
                        type="button"
                        className="btn btn-outline-danger mt-3 ms-2"
                        onClick={() => confirmarCompra(true)}
                    >
                        Simular compra fallida
                    </button>
                </div>
            )}
        </Container>
    )
}

export default ShoppingCart