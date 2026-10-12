import { act } from 'react'
import { createRoot } from 'react-dom/client'
import MisPedidos from './MisPedidos.jsx'

describe('MisPedidos - Gas El Volcán', () => {
  let contenedor
  let root

  const clientePrueba = {
    nombre: 'Pedro',
    correo: 'cliente@gmail.com',
    rol: 'cliente'
  }

  const pedidosPrueba = [
    {
      id: 'PED-000011',
      direccionEntrega: { region: 'Ñuble', comuna: 'Chillán', calle: 'Av. Argentina', numero: '1250' },
      fecha: '2026-10-12T10:00:00',
      cliente: {
        nombre: 'Pedro',
        correo: 'cliente@gmail.com'
      },
      productos: [
        {
          id: 1,
          nombre: 'Cilindro GLP 5 kg',
          precio: 5200,
          cantidad: 2
        }
      ],
      total: 10400,
      metodoPago: 'efectivo',
      estado: 'pendiente'
    },
    {
      id: 'PED-000012',
      fecha: '2026-10-12T11:00:00',
      cliente: {
        nombre: 'Pedro',
        correo: 'CLIENTE@GMAIL.COM'
      },
      productos: [
        {
          id: 2,
          nombre: 'Cilindro GLP 15 kg',
          precio: 25000,
          cantidad: 1
        }
      ],
      total: 25000,
      metodoPago: 'tarjeta',
      estado: 'entregado'
    },
    {
      id: 'PED-000013',
      fecha: '2026-10-12T12:00:00',
      cliente: {
        nombre: 'Carlos',
        correo: 'otro@gmail.com'
      },
      productos: [
        {
          id: 3,
          nombre: 'Regulador de gas',
          precio: 8500,
          cantidad: 1
        }
      ],
      total: 8500,
      metodoPago: 'efectivo',
      estado: 'camino'
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

  it('debe mostrar solo los pedidos del cliente con sus estados correctos', () => {
    act(() => {
      root.render(
        <MisPedidos
          pedidos={pedidosPrueba}
          usuario={clientePrueba}
        />
      )
    })

    const contenido = contenedor.textContent

    expect(contenido).toContain('Mis pedidos')

    expect(contenido).toContain('PED-000011')
    expect(contenido).toContain('PED-000012')
    expect(contenido).toContain('Av. Argentina 1250')

    expect(contenido).not.toContain('PED-000013')
    expect(contenido).not.toContain('Regulador de gas')

    expect(contenido).toContain('Cilindro GLP 5 kg')
    expect(contenido).toContain('Cilindro GLP 15 kg')

    const tarjetas = contenedor.querySelectorAll('.card')

    expect(tarjetas.length).toBe(2)

    const pedidoPendiente = Array.from(tarjetas).find(
      (tarjeta) =>
        tarjeta.textContent.includes('PED-000011')
    )

    const pedidoEntregado = Array.from(tarjetas).find(
      (tarjeta) =>
        tarjeta.textContent.includes('PED-000012')
    )

    expect(pedidoPendiente).toBeDefined()
    expect(pedidoEntregado).toBeDefined()

    expect(pedidoPendiente.textContent).toContain('Pendiente')
    expect(pedidoEntregado.textContent).toContain('Entregado')

    expect(
      pedidoPendiente.querySelector('.badge').classList.contains('bg-warning')
    ).toBeTrue()

    expect(
      pedidoEntregado.querySelector('.badge').classList.contains('bg-success')
    ).toBeTrue()

    expect(contenido).toContain('Efectivo')
    expect(contenido).toContain('Tarjeta')
  })
})
