const dominiosPermitidos = /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i

export function validarConsultaContacto(datos = {}) {
  const nombre = String(datos.nombre ?? '').trim()
  const correo = String(datos.correo ?? '').trim().toLowerCase()
  const comentario = String(datos.comentario ?? '').trim()

  if (!nombre) {
    return { correcto: false, mensaje: 'Ingresa tu nombre.' }
  }

  if (nombre.length > 100) {
    return { correcto: false, mensaje: 'El nombre no puede superar los 100 caracteres.' }
  }

  if (!correo) {
    return { correcto: false, mensaje: 'Ingresa tu correo electrónico.' }
  }

  if (correo.length > 100 || !dominiosPermitidos.test(correo)) {
    return {
      correcto: false,
      mensaje: 'Utiliza un correo @duoc.cl, @profesor.duoc.cl o @gmail.com.'
    }
  }

  if (!comentario) {
    return { correcto: false, mensaje: 'Escribe el comentario de tu consulta.' }
  }

  if (comentario.length > 500) {
    return { correcto: false, mensaje: 'El comentario no puede superar los 500 caracteres.' }
  }

  return { correcto: true, consulta: { nombre, correo, comentario } }
}
