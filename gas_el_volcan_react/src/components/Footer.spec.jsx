import { act } from 'react'
import { createRoot } from 'react-dom/client'
import { MemoryRouter } from 'react-router-dom'
import Footer from './Footer.jsx'
import BarraSuperior from './BarraSuperior.jsx'


describe('Footer y cobertura - Gas El Volcán', () => {
  let contenedor
  let root

  beforeAll(() => {
    globalThis.IS_REACT_ACT_ENVIRONMENT = true
  })

  beforeEach(() => {
    contenedor = document.createElement('div')
    document.body.appendChild(contenedor)
    root = createRoot(contenedor)
  })

  afterEach(() => {
    act(() => root.unmount())
    contenedor.remove()
  })

  it('muestra los enlaces y las cinco zonas de despacho', () => {
    act(() => {
      root.render(<MemoryRouter><Footer /></MemoryRouter>)
    })

    expect(contenedor.querySelectorAll('.footer-zona').length).toBe(5)
    expect(contenedor.textContent).toContain('Zona Centro')
    expect(contenedor.textContent).toContain('08:00–20:00')
    expect(contenedor.textContent).toContain('Zona Comercial')
    expect(contenedor.textContent).toContain('Según agenda')
    expect(contenedor.querySelector('a[href="/contacto"]')).not.toBeNull()
    expect(contenedor.querySelector('a[href="/productos"]')).not.toBeNull()
  })

  it('recupera la información de cobertura del encabezado original', () => {
    act(() => root.render(<BarraSuperior />))
    expect(contenedor.textContent).toContain('Chillán y comunas aledañas')
    expect(contenedor.textContent).toContain('Despacho a domicilio')
  })
})
