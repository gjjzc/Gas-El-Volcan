import { act } from 'react'
import { createRoot } from 'react-dom/client'
import { MemoryRouter } from 'react-router-dom'
import ProductList from './ProductList.jsx'

describe('ProductList - Catálogo de Gas El Volcán', () => {
  let contenedor
  let root

  const productosPrueba = [
    {
      id: 1,
      nombre: 'Cilindro GLP 5 kg',
      precio: 10400,
      imagen: 'img/gas5.jpg',
      categoria: 'Gas',
      stock: 10,
      descuento: 0
    },
    {
      id: 2,
      nombre: 'Cilindro GLP 15 kg',
      precio: 25000,
      imagen: 'img/gas15.jpg',
      categoria: 'Gas',
      stock: 8,
      descuento: 0
    },
    {
      id: 3,
      nombre: 'Regulador de gas',
      precio: 8500,
      imagen: 'img/regulador.jpg',
      categoria: 'Accesorios',
      stock: 15,
      descuento: 0
    }
  ]

  beforeAll(() => {
    globalThis.IS_REACT_ACT_ENVIRONMENT = true
  })

  beforeEach(() => {
    contenedor = document.createElement('div')
    document.body.appendChild(contenedor)

    root = createRoot(contenedor)
  })

  afterEach(() => {
    act(() => {
      root.unmount()
    })

    contenedor.remove()
  })

  const renderizarCatalogo = (ruta = '/productos') => {
    act(() => {
      root.render(
        <MemoryRouter initialEntries={[ruta]}>
          <ProductList
            productos={productosPrueba}
            agregarAlCarrito={() => {}}
          />
        </MemoryRouter>
      )
    })
  }

  it('debe mostrar todos los productos del catálogo', () => {
    renderizarCatalogo()

    const contenido = contenedor.textContent

    expect(contenido).toContain('Nuestros productos')
    expect(contenido).toContain('Todos nuestros productos')
    expect(contenido).toContain('Productos encontrados: 3')

    expect(contenido).toContain('Cilindro GLP 5 kg')
    expect(contenido).toContain('Cilindro GLP 15 kg')
    expect(contenido).toContain('Regulador de gas')
  })

  it('debe filtrar los productos según su categoría', () => {
    renderizarCatalogo('/productos?categoria=Gas')

    const contenido = contenedor.textContent

    expect(contenido).toContain('Productos de Gas')
    expect(contenido).toContain('Productos encontrados: 2')

    expect(contenido).toContain('Cilindro GLP 5 kg')
    expect(contenido).toContain('Cilindro GLP 15 kg')
    expect(contenido).not.toContain('Regulador de gas')

    const enlace = contenedor.querySelector('a[href="/productos"]')

    expect(enlace).not.toBeNull()
    expect(enlace.textContent).toContain('Ver todos los productos')
  })
})
