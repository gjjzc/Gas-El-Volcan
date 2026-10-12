import { act } from 'react'
import { createRoot } from 'react-dom/client'
import { MemoryRouter } from 'react-router-dom'
import Registro from './Registro.jsx'
import { limpiarRUN, validarRUN } from '../utils/validaciones.js'

describe('Registro - Gas El Volcán', () => {
  let contenedor
  let root
  let registrarCliente

  beforeAll(() => {
    globalThis.IS_REACT_ACT_ENVIRONMENT = true
  })

  beforeEach(() => {
    contenedor = document.createElement('div')
    document.body.appendChild(contenedor)

    root = createRoot(contenedor)

    registrarCliente = jasmine.createSpy('registrarCliente')
    registrarCliente.and.returnValue({
      correcto: true,
      mensaje: 'Cuenta creada correctamente.'
    })
  })

  afterEach(() => {
    act(() => {
      root.unmount()
    })

    contenedor.remove()
  })

  const renderizarRegistro = () => {
    act(() => {
      root.render(
        <MemoryRouter>
          <Registro registrarCliente={registrarCliente} />
        </MemoryRouter>
      )
    })
  }

  const cambiarCampo = (nombre, valor) => {
    const campo = contenedor.querySelector(`[name="${nombre}"]`)

    expect(campo).not.toBeNull()

    const esSelect = campo.tagName === 'SELECT'

    const prototipo = esSelect
      ? HTMLSelectElement.prototype
      : HTMLInputElement.prototype

    const descriptor = Object.getOwnPropertyDescriptor(
      prototipo,
      'value'
    )

    act(() => {
      descriptor.set.call(campo, valor)

      campo.dispatchEvent(
        new Event(esSelect ? 'change' : 'input', {
          bubbles: true
        })
      )
    })
  }

  const completarFormulario = (correo = 'cliente@gmail.com') => {
    cambiarCampo('run', '12.345.678-5')
    cambiarCampo('nombre', 'Pedro')
    cambiarCampo('apellidoPaterno', 'Gonzalez')
    cambiarCampo('apellidoMaterno', 'Munoz')
    cambiarCampo('correo', correo)
    cambiarCampo('clave', '123456')
    cambiarCampo('confirmarClave', '123456')
    cambiarCampo('region', 'Ñuble')
    cambiarCampo('comuna', 'Chillán')
  }

  const enviarFormulario = () => {
    const formulario = contenedor.querySelector('form')

    act(() => {
      formulario.dispatchEvent(
        new Event('submit', {
          bubbles: true,
          cancelable: true
        })
      )
    })
  }

  it('debe validar correctamente el RUN chileno', () => {
    expect(validarRUN('12.345.678-5')).toBeTrue()
    expect(validarRUN('12345678-5')).toBeTrue()

    expect(validarRUN('12.345.678-9')).toBeFalse()
    expect(validarRUN('12345678-A')).toBeFalse()

    expect(limpiarRUN('12.345.678-k')).toBe('12.345.678-K')
  })

  it('debe rechazar un correo no permitido en el registro', () => {
    renderizarRegistro()

    completarFormulario('cliente@empresa.cl')
    enviarFormulario()

    expect(contenedor.textContent).toContain(
      'Utiliza un correo @duoc.cl, @profesor.duoc.cl o @gmail.com.'
    )

    expect(registrarCliente).not.toHaveBeenCalled()
  })

  it('debe registrar correctamente un cliente con datos válidos', () => {
    renderizarRegistro()

    completarFormulario('cliente@gmail.com')
    enviarFormulario()

    expect(registrarCliente).toHaveBeenCalledTimes(1)

    expect(registrarCliente).toHaveBeenCalledWith(
      jasmine.objectContaining({
        run: '12.345.678-5',
        nombre: 'Pedro',
        apellidoPaterno: 'Gonzalez',
        apellidoMaterno: 'Munoz',
        correo: 'cliente@gmail.com',
        clave: '123456',
        region: 'Ñuble',
        comuna: 'Chillán'
      })
    )

    expect(contenedor.textContent).toContain(
      'Cuenta creada correctamente.'
    )
  })
})
