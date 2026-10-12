import { act } from 'react'
import { createRoot } from 'react-dom/client'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import ShoppingCart from './ShoppingCart.jsx'

describe('ShoppingCart - Carrito de Gas El Volcán', () => {
  let contenedor
  let root
  let cambiarCantidad
  let eliminarDelCarrito
  let finalizarCompra

  const productosPrueba = [
    {
      id: 1,
      nombre: 'Cilindro GLP 5 kg',
      precio: 5200,
      cantidad: 2
    },
    {
      id: 2,
      nombre: 'Cilindro GLP 11 kg',
      precio: 8400,
      cantidad: 1
    }
  ]

  beforeAll(() => {
    globalThis.IS_REACT_ACT_ENVIRONMENT = true
  })

  beforeEach(() => {
    contenedor = document.createElement('div')
    document.body.appendChild(contenedor)

    root = createRoot(contenedor)

    cambiarCantidad = jasmine.createSpy('cambiarCantidad')
    eliminarDelCarrito = jasmine.createSpy('eliminarDelCarrito')
    finalizarCompra = jasmine.createSpy('finalizarCompra')
  })

  afterEach(() => {
    act(() => {
      root.unmount()
    })

    contenedor.remove()
  })

  const renderizarCarrito = () => {
    act(() => {
      root.render(
        <MemoryRouter initialEntries={['/carrito']}>
          <Routes>
            <Route
              path="/carrito"
              element={
                <ShoppingCart
                  carrito={productosPrueba}
                  cambiarCantidad={cambiarCantidad}
                  eliminarDelCarrito={eliminarDelCarrito}
                  finalizarCompra={finalizarCompra}
                />
              }
            />

            <Route
              path="/compra-exitosa"
              element={<p>Vista de compra exitosa</p>}
            />

            <Route
              path="/compra-fallida"
              element={<p>Vista de compra fallida</p>}
            />
          </Routes>
        </MemoryRouter>
      )
    })
  }

  const buscarBoton = (texto) => {
    return Array.from(contenedor.querySelectorAll('button'))
      .find((boton) => boton.textContent.trim() === texto)
  }

  it('debe calcular correctamente subtotales y total del carrito', () => {
    renderizarCarrito()

    const contenido = contenedor.textContent

    expect(contenido).toContain('Tu carrito de compras')
    expect(contenido).toContain('Cilindro GLP 5 kg')
    expect(contenido).toContain('Cilindro GLP 11 kg')

    expect(contenido).toContain('Subtotal: $10.400')
    expect(contenido).toContain('Subtotal: $8.400')
    expect(contenido).toContain('Total: $18.800')
  })

  it('debe ejecutar cambiarCantidad al aumentar o disminuir productos', () => {
    renderizarCarrito()

    const botones = Array.from(
      contenedor.querySelectorAll('button')
    )

    const botonesAumentar = botones.filter(
      (boton) => boton.textContent.trim() === '+'
    )

    const botonesDisminuir = botones.filter(
      (boton) => boton.textContent.trim() === '−'
    )

    expect(botonesAumentar.length).toBe(2)
    expect(botonesDisminuir.length).toBe(2)

    act(() => {
      botonesAumentar[0].click()
    })

    expect(cambiarCantidad).toHaveBeenCalledWith(1, 1)

    act(() => {
      botonesDisminuir[1].click()
    })

    expect(cambiarCantidad).toHaveBeenCalledWith(2, -1)

    expect(cambiarCantidad).toHaveBeenCalledTimes(2)
  })

  it('debe exigir método de pago y finalizar una compra correctamente', () => {
    finalizarCompra.and.returnValue(true)

    renderizarCarrito()

    const botonComprar = buscarBoton('Finalizar compra')

    expect(botonComprar).toBeDefined()

    act(() => {
      botonComprar.click()
    })

    expect(contenedor.textContent).toContain(
      'Selecciona un método de pago para continuar.'
    )

    expect(finalizarCompra).not.toHaveBeenCalled()

    const radioEfectivo = contenedor.querySelector('#pago-efectivo')

    expect(radioEfectivo).not.toBeNull()

    act(() => {
      radioEfectivo.click()
    })

    expect(contenedor.textContent).toContain(
      'Pagarás en efectivo cuando recibas tu pedido.'
    )

    act(() => {
      botonComprar.click()
    })

    expect(finalizarCompra).toHaveBeenCalledOnceWith(
      false,
      'efectivo'
    )

    expect(contenedor.textContent).toContain(
      'Vista de compra exitosa'
    )
  })
})
