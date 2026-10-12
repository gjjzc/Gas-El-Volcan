export const comunasPorRegion = {
  'Ñuble': ['Chillán', 'Chillán Viejo', 'Bulnes', 'Quillón', 'El Carmen', 'Pinto', 'San Ignacio'],
  'Biobío': ['Los Ángeles', 'Concepción'],
  'La Araucanía': ['Temuco']
}

export const direccionVacia = {
  region: '',
  comuna: '',
  calle: '',
  numero: '',
  departamento: '',
  referencia: ''
}

export function normalizarDireccion(datos = {}) {
  return Object.fromEntries(
    Object.keys(direccionVacia).map((campo) => [campo, String(datos?.[campo] ?? '').trim()])
  )
}

export function validarDireccion(datos) {
  const direccion = normalizarDireccion(datos)
  const { region, comuna, calle, numero, departamento, referencia } = direccion

  if (!comunasPorRegion[region]?.includes(comuna)) {
    return { correcto: false, mensaje: 'Selecciona una región y comuna válidas para el despacho.' }
  }
  if (calle.length < 3 || calle.length > 120) {
    return { correcto: false, mensaje: 'La calle debe tener entre 3 y 120 caracteres.' }
  }
  if (!/^\d+[A-Za-z0-9\/-]*$/.test(numero) || numero.length > 15) {
    return { correcto: false, mensaje: 'Ingresa un número de domicilio válido, por ejemplo 1250 o 1250-B.' }
  }
  if (departamento.length > 40 || referencia.length > 120) {
    return { correcto: false, mensaje: 'El departamento o la referencia superan el máximo permitido.' }
  }
  if (Object.values(direccion).join(' ').length > 300) {
    return { correcto: false, mensaje: 'La dirección no puede superar los 300 caracteres.' }
  }

  return { correcto: true, mensaje: '', direccion }
}

export function formatearDireccion(datos) {
  const direccion = normalizarDireccion(datos)
  if (!direccion.calle || !direccion.numero || !direccion.comuna) {
    return 'Dirección no registrada (pedido anterior)'
  }
  const interior = direccion.departamento ? `, Depto./interior ${direccion.departamento}` : ''
  const referencia = direccion.referencia ? ` — Ref.: ${direccion.referencia}` : ''
  return `${direccion.calle} ${direccion.numero}${interior}, ${direccion.comuna}, ${direccion.region}${referencia}`
}
