export function limpiarRUN(valor) {
  return valor
    .toUpperCase()
    .replace(/[^0-9K.-]/g, '')
    .slice(0, 12)
}

export function validarRUN(run) {
  const runLimpio = run.replace(/[.-]/g, '').toUpperCase()

  if (!/^\d{1,8}[0-9K]$/.test(runLimpio)) {
    return false
  }

  const cuerpo = runLimpio.slice(0, -1)
  const digito = runLimpio.slice(-1)

  let suma = 0
  let factor = 2

  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += Number(cuerpo[i]) * factor

    factor++

    if (factor > 7) {
      factor = 2
    }
  }

  const resultado = 11 - (suma % 11)

  let digitoCorrecto = String(resultado)

  if (resultado === 11) {
    digitoCorrecto = '0'
  }

  if (resultado === 10) {
    digitoCorrecto = 'K'
  }

  return digito === digitoCorrecto
}
