import { act } from 'react'
import { createRoot } from 'react-dom/client'
import Contacto from './Contacto.jsx'
import { validarConsultaContacto } from '../utils/validarContacto.js'

describe('Contacto - Gas El Volcán', () => {
  let contenedor
  let root

  beforeAll(() => {
    globalThis.IS_REACT_ACT_ENVIRONMENT = true
  })

  beforeEach(() => {
    localStorage.removeItem('consultasGas')
    contenedor = document.createElement('div')
    document.body.appendChild(contenedor)
    root = createRoot(contenedor)
    act(() => root.render(<Contacto />))
  })

  afterEach(() => {
    act(() => root.unmount())
    contenedor.remove()
    localStorage.removeItem('consultasGas')
  })

  const cambiarCampo = (nombre, valor) => {
    const campo = contenedor.querySelector(`[name="${nombre}"]`)
    const prototipo = campo.tagName === 'TEXTAREA'
      ? HTMLTextAreaElement.prototype
      : HTMLInputElement.prototype
    const descriptor = Object.getOwnPropertyDescriptor(prototipo, 'value')

    act(() => {
      descriptor.set.call(campo, valor)
      campo.dispatchEvent(new Event('input', { bubbles: true }))
    })
  }

  const enviarFormulario = () => {
    const formulario = contenedor.querySelector('form')
    act(() => formulario.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true })))
  }

  it('rechaza correos que no pertenezcan a los dominios permitidos', () => {
    cambiarCampo('nombre', 'Pedro')
    cambiarCampo('correo', 'pedro@empresa.cl')
    cambiarCampo('comentario', 'Consulta sobre el reparto')
    enviarFormulario()

    expect(contenedor.textContent).toContain('Utiliza un correo @duoc.cl')
    expect(localStorage.getItem('consultasGas')).toBeNull()
  })

  it('valida los límites de longitud de nombre y comentario', () => {
    expect(validarConsultaContacto({
      nombre: 'A'.repeat(101),
      correo: 'cliente@gmail.com',
      comentario: 'Consulta válida'
    }).correcto).toBeFalse()

    expect(validarConsultaContacto({
      nombre: 'Pedro',
      correo: 'cliente@gmail.com',
      comentario: 'A'.repeat(501)
    }).correcto).toBeFalse()
  })

  it('guarda una consulta válida y limpia los campos del formulario', () => {
    cambiarCampo('nombre', 'Pedro')
    cambiarCampo('correo', 'PEDRO@GMAIL.COM')
    cambiarCampo('comentario', '¿Hacen despacho a Chillán?')
    enviarFormulario()

    const consultas = JSON.parse(localStorage.getItem('consultasGas'))
    expect(consultas.length).toBe(1)
    expect(consultas[0]).toEqual(jasmine.objectContaining({
      nombre: 'Pedro',
      correo: 'pedro@gmail.com',
      comentario: '¿Hacen despacho a Chillán?'
    }))
    expect(contenedor.textContent).toContain('Consulta registrada correctamente')
    expect(contenedor.querySelector('[name="nombre"]').value).toBe('')
  })
})
