import { validarDireccion, formatearDireccion, normalizarDireccion } from './direccionDespacho.js'

describe('Dirección de entrega - Gas El Volcán', () => {
  const domicilio = {
    region: 'Ñuble', comuna: 'Chillán', calle: 'Av. Argentina', numero: '1250',
    departamento: '302', referencia: 'Portón negro'
  }

  it('debe aceptar y normalizar una dirección válida', () => {
    const resultado = validarDireccion({ ...domicilio, calle: '  Av. Argentina  ' })
    expect(resultado.correcto).toBeTrue()
    expect(resultado.direccion.calle).toBe('Av. Argentina')
    expect(normalizarDireccion({ numero: 1250 }).numero).toBe('1250')
  })

  it('debe rechazar direcciones sin número o con comuna incorrecta', () => {
    expect(validarDireccion({ ...domicilio, numero: '' }).correcto).toBeFalse()
    expect(validarDireccion({ ...domicilio, comuna: 'Temuco' }).correcto).toBeFalse()
  })

  it('debe formatear la dirección del pedido y admitir pedidos antiguos', () => {
    expect(formatearDireccion(domicilio)).toContain('Av. Argentina 1250')
    expect(formatearDireccion(domicilio)).toContain('Depto./interior 302')
    expect(formatearDireccion(null)).toContain('Dirección no registrada')
  })
})
