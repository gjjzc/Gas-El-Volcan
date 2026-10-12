import { act } from 'react'
import { createRoot } from 'react-dom/client'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import DetalleProducto from './DetalleProducto.jsx'

describe('DetalleProducto - catálogo Gas El Volcán', () => {
  let contenedor
  let root
  let agregar

  const productosPrueba = [
    {
      id: 'CL001',
      nombre: 'Cilindro GLP 5 kg',
      descripcion: 'Gas para uso residencial.',
      categoria: 'Cilindros de Gas',
      precio: 6500,
      stock: 10,
      imagen: 'img/cilindro5K.webp',
      descuento: 0
    },
    {
      id: 'RG002',
      nombre: 'Regulador alta presión',
      descripcion: 'Regulador para uso industrial.',
      categoria: 'Reguladores',
      precio: 20000,
      descuento: 10,
      stock: 0,
      imagen: 'img/reguladorGasAPresion.webp'
    }
  ]

  beforeAll(() => {
    globalThis.IS_REACT_ACT_ENVIRONMENT = true
  })

  beforeEach(() => {
    contenedor = document.createElement('div')
    document.body.appendChild(contenedor)
    root = createRoot(contenedor)
    agregar = jasmine.createSpy('agregarAlCarrito')
  })

  afterEach(() => {
    act(() => root.unmount())
    contenedor.remove()
  })

  const renderizar = (ruta) => {
    act(() => {
      root.render(
        <MemoryRouter initialEntries={[ruta]}>
          <Routes>
            <Route path="/productos/:id" element={
              <DetalleProducto productos={productosPrueba} agregarAlCarrito={agregar} />
            } />
          </Routes>
        </MemoryRouter>
      )
    })
  }

  it('debe mostrar descripción, stock y precio del producto', () => {
    renderizar('/productos/CL001')
    expect(contenedor.textContent).toContain('Cilindro GLP 5 kg')
    expect(contenedor.textContent).toContain('Gas para uso residencial.')
    expect(contenedor.textContent).toContain('Stock disponible: 10')
    expect(contenedor.textContent).toContain('$6.500')
  })

  it('debe agregar al carrito el producto seleccionado', () => {
    renderizar('/productos/CL001')
    const boton = Array.from(contenedor.querySelectorAll('button')).find(
      (elemento) => elemento.textContent.includes('Agregar al carrito')
    )
    expect(boton).toBeDefined()
    act(() => boton.click())
    expect(agregar).toHaveBeenCalledOnceWith(productosPrueba[0])
  })

  it('debe impedir añadir un producto sin stock', () => {
    renderizar('/productos/RG002')
    const boton = Array.from(contenedor.querySelectorAll('button')).find(
      (elemento) => elemento.textContent.includes('Agregar al carrito')
    )
    expect(contenedor.textContent).toContain('Producto sin stock')
    expect(contenedor.textContent).toContain('$18.000')
    expect(boton.disabled).toBeTrue()
    act(() => boton.click())
    expect(agregar).not.toHaveBeenCalled()
  })

  it('debe avisar cuando el producto no existe', () => {
    renderizar('/productos/NO-EXISTE')
    expect(contenedor.textContent).toContain('Producto no encontrado')
    expect(contenedor.querySelector('a[href="/productos"]')).not.toBeNull()
  })
})
