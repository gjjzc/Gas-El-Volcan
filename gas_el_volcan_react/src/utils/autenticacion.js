export const CORREO_ADMIN = 'admin@gaselvolcan.cl'
export const CLAVE_ADMIN_DEMO = 'Admin123'

export function validarCredenciales(correo, clave) {
  const correoNormalizado = correo.trim().toLowerCase()

  if (
    correoNormalizado === CORREO_ADMIN &&
    clave === CLAVE_ADMIN_DEMO
  ) {
    return {
      correo: correoNormalizado,
      nombre: 'Administrador',
      rol: 'admin'
    }
  }

  return null
}
