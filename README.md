# Gas El Volcán — Evaluación Parcial 2 (React)

Aplicación académica de pedidos y distribución de gas, desarrollada para **DSY1104 — Desarrollo Fullstack II**.

**Integrantes:** Gerard Zambrano y Leonardo Bastidas. Esta entrega migra la versión original HTML/CSS/JavaScript a **React + Vite** y conserva el contexto de Chillán y sus zonas de despacho.

## Ramas y evolución

- `main`: sitio original de la Evaluación Parcial 1.
- `migracion-react`: proyecto React integrado para la Evaluación Parcial 2.
- `testing-jasmine-karma`: implementación histórica de pruebas, integrada por PR #2.
- `mejoras-despacho-contacto`: desarrollo de las mejoras funcionales, integrado por PR #3.

Repositorio: https://github.com/gjjzc/Gas-El-Volcan

## Funcionalidades

**Público y cliente:** navegación por Inicio, Productos, Categorías, Ofertas, Nosotros, Blog y Contacto; búsqueda por nombre o categoría; filtros combinados; detalle individual de producto con precio, descuento, descripción y stock; carrito con cálculo de totales; compra simulada; historial y seguimiento de pedidos.

**Despacho:** formulario de dirección con región, comuna, calle, número, interior y referencia; validaciones; dirección almacenada con cada nuevo pedido y disponible en el comprobante, historial, administración y panel del repartidor. Los pedidos anteriores sin dirección muestran un mensaje de compatibilidad.

**Administrador:** gestión demostrativa de productos y usuarios, consulta de pedidos y asignación de repartidores.

**Repartidor:** consulta de entregas asignadas y avance de estados hasta Entregado.

**Contacto:** validación de nombre, correo y comentario; registro local en el navegador. Los correos aceptados por la demostración terminan en `@duoc.cl`, `@profesor.duoc.cl` o `@gmail.com`. **No se envían mensajes por correo real**.

**Footer:** información de la empresa, enlaces y cinco zonas con horarios y tiempos referenciales de despacho: Centro, Oriente, Rural, Sur y Comercial.

## Instalación

Requisitos: Node.js y npm compatibles con Vite 8.

```powershell
cd gas_el_volcan_react
npm ci
npm run dev
```

Abrir la dirección `Local` mostrada por Vite (habitualmente `http://localhost:5173/`). El mensaje `Network: use --host to expose` no indica un fallo.

Para generar los archivos estáticos de producción:

```powershell
npm run build
```

## Pruebas y cobertura

```powershell
cd gas_el_volcan_react
$env:CHROME_BIN = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
npm test
```

`CHROME_BIN` apunta a Microsoft Edge cuando Chrome no está instalado. La suite contiene **27 pruebas** (26 funcionales y una prueba técnica de arranque). La ejecución definitiva del **12-10-2026** confirmó **27/27 SUCCESS** y `npm run build` correcto con Vite 8.3.4 (363 módulos, 908 ms).

**Cobertura final verificada (27 pruebas, 12-10-2026):**

| Métrica | Cobertura | Cubiertas / medidas |
|---|---:|---:|
| Sentencias | 86,80 % | 217 / 250 |
| Ramas | 78,57 % | 154 / 196 |
| Funciones | 91,93 % | 57 / 62 |
| Líneas | 86,77 % | 210 / 242 |

Los reportes se generan bajo `gas_el_volcan_react/coverage/` mediante Karma e Istanbul. Las advertencias 404 de imágenes ficticias durante tests no afectaron las ejecuciones informadas.

## Arquitectura y limitaciones

React, React Router, React Bootstrap, CSS, props, estado y componentes reutilizables. Pruebas con Jasmine, Karma, Babel, Webpack e Istanbul. La persistencia usa datos y almacenamiento local del navegador; **no hay backend, base de datos remota, envío real de emails ni pasarela de pagos**. La autenticación y el aislamiento por rol son de demostración, no controles de seguridad suficientes para producción.

## Documentación

- `documentacion/ERS_Gas_El_Volcan_Revision_2_1_React.docx`: actualización de requisitos y trazabilidad funcional.
- `documentacion/Informe_Cobertura_Testing_Gas_El_Volcan_EP2_Actualizado.docx`: inventario de pruebas, métricas verificadas y mejoras pendientes.

## Verificación manual integrada

Se comprobó el recorrido compra con dirección → comprobante → asignación en Administración → consulta y cambio de estado en Repartidor → seguimiento del Cliente. El flujo es local y de demostración.
