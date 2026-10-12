import { act } from 'react'
import { createRoot } from 'react-dom/client'
import PanelRepartidor from './PanelRepartidor.jsx'

describe('PanelRepartidor - Gas El Volcán', () => {
  let contenedor
  let root
  let actualizarEstadoPedido

  const repartidorPrueba = {
    run: '111111111',
    nombre: 'Repartidor'
  }

  const pedidosPrueba = [
    {
      id: 'PED-000011',
      direccionEntrega: { region: 'Ñuble', comuna: 'Chillán', calle: 'Av. Argentina', numero: '1250', departamento: '302' },
      repartidorRun: '111111111',
      cliente: {
        nombre: 'Pedro'
      },
      productos: [
        {
          id: 1,
          nombre: 'Cilindro GLP 5 kg',
          cantidad: 2
        }
      ],
      total: 10400,
      estado: 'pendiente'
    },
    {
      id: 'PED-000012',
      repartidorRun: '111111111',
      cliente: {
        nombre: 'María'
      },
      productos: [
        {
          id: 2,
          nombre: 'Cilindro GLP 15 kg',
          cantidad: 1
        }
      ],
      total: 25000,
      estado: 'entregado'
    },
    {
      id: 'PED-000013',
      repartidorRun: '222222222',
      cliente: {
        nombre: 'Carlos'
      },
      productos: [
        {
          id: 3,
          nombre: 'Regulador de gas',
          cantidad: 1
        }
      ],
      total: 8500,
      estado: 'pendiente'
    }
  ]

  beforeAll(() => {
    globalThis.IS_REACT_ACT_ENVIRONMENT = true
  })

  beforeEach(() => {
    contenedor = document.createElement('div')
    document.body.appendChild(contenedor)

    root = createRoot(contenedor)

    actualizarEstadoPedido = jasmine.createSpy(
      'actualizarEstadoPedido'
    )

    actualizarEstadoPedido.and.returnValue({
      correcto: true,
      mensaje: 'Estado del pedido actualizado correctamente.'
    })
  })

  afterEach(() => {
    act(() => {
      root.unmount()
    })

    contenedor.remove()
  })

  it('debe mostrar solo sus entregas, avanzar estados y bloquear pedidos entregados', () => {
    act(() => {
      root.render(
        <PanelRepartidor
          pedidos={pedidosPrueba}
          usuario={repartidorPrueba}
          actualizarEstadoPedido={actualizarEstadoPedido}
        />
      )
    })

    const contenido = contenedor.textContent

    expect(contenido).toContain('Panel de entregas')
    expect(contenido).toContain('PED-000011')
    expect(contenido).toContain('PED-000012')
    expect(contenido).toContain('Av. Argentina 1250')

    expect(contenido).not.toContain('PED-000013')

    expect(contenido).toContain('Pendiente')
    expect(contenido).toContain('Entregado')
    expect(contenido).toContain('Entrega completada')

    const botones = Array.from(
      contenedor.querySelectorAll('button')
    )

    const botonAvanzar = botones.find(
      (boton) =>
        boton.textContent.includes('Avanzar a En preparación')
    )

    expect(botonAvanzar).toBeDefined()

    const botonesAvanzar = botones.filter(
      (boton) => boton.textContent.includes('Avanzar a')
    )

    expect(botonesAvanzar.length).toBe(1)

    act(() => {
      botonAvanzar.click()
    })

    expect(actualizarEstadoPedido).toHaveBeenCalledTimes(1)

    expect(actualizarEstadoPedido).toHaveBeenCalledWith(
      'PED-000011',
      'preparacion'
    )

    expect(contenedor.textContent).toContain(
      'Estado del pedido actualizado correctamente.'
    )
  })
})
