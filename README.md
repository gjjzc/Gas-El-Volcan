# Gas El Volcán

## Sistema web de pedidos y distribución de gas

Proyecto académico desarrollado para la asignatura **Desarrollo Fullstack II (DSY1104)** de Duoc UC.

El proyecto consiste en una aplicación web para la venta y distribución de gas, que permite consultar productos, gestionar un carrito de compras, realizar pedidos y administrar entregas.

## Evolución del proyecto

### Evaluación Parcial 1

Se desarrolló una primera versión del sitio utilizando HTML, CSS y JavaScript, con páginas informativas, catálogo, formularios, carrito y funcionalidades administrativas.

Esta versión se conserva en la rama `main`.

### Evaluación Parcial 2

Se realizó la migración del proyecto a React, incorporando componentes reutilizables, navegación mediante React Router, administración de estados, propiedades, eventos y diseño responsivo.

También se implementaron nuevas funcionalidades para los perfiles de cliente, administrador y repartidor, junto con pruebas unitarias automatizadas.

La versión actual del proyecto se encuentra en la rama `migracion-react`.

## Tecnologías utilizadas

- React y JavaScript
- Vite
- React Router
- React Bootstrap y CSS
- HTML5
- Jasmine y Karma
- Webpack, Babel e Istanbul para las pruebas y su cobertura
- Git y GitHub

## Funcionalidades principales

**Cliente:** registro, inicio de sesión, consulta de productos, filtros del catálogo, carrito de compras, confirmación de pedidos y consulta de su historial y estados.

**Administrador:** administración de productos, usuarios y pedidos, asignación de repartidores y consulta de las operaciones.

**Repartidor:** consulta de pedidos asignados y actualización de sus estados durante el proceso de entrega.

**Páginas públicas:** inicio, categorías, ofertas, nosotros, blog y contacto.

## Arquitectura y persistencia

La aplicación utiliza componentes React, propiedades (`props`), estados (`useState`) y manejo de eventos para controlar la interfaz.

La navegación se implementa con React Router y el diseño se adapta a teléfonos móviles, tabletas y computadores.

El prototipo utiliza datos locales y `localStorage` para simular la persistencia de productos, carrito y pedidos. No depende de una base de datos ni de un servicio de pagos real.

## Instalación y ejecución

Abrir una terminal dentro de la carpeta `gas_el_volcan_react` y ejecutar:

```bash
npm install
npm run dev
```

Vite mostrará en la terminal la dirección local donde se puede abrir la aplicación.

Para verificar la compilación de producción:

```bash
npm run build
```

## Pruebas unitarias

Las pruebas se implementaron con Jasmine y Karma y verifican el comportamiento de componentes y páginas de la aplicación.

Se desarrollaron **10 pruebas funcionales y una prueba de configuración**.

Para ejecutar las pruebas:

```bash
npm test
```

En Windows, si Chrome no está instalado y se utiliza Microsoft Edge, se puede establecer previamente la variable `CHROME_BIN` en PowerShell:

```powershell
$env:CHROME_BIN = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
```

### Resultados verificados

| Indicador | Resultado |
|---|---:|
| Pruebas ejecutadas | 11 |
| Pruebas aprobadas | 11 |
| Cobertura de sentencias | 83,68% |
| Cobertura de ramas | 74,19% |
| Cobertura de funciones | 87,50% |
| Cobertura de líneas | 84,05% |

Los informes de cobertura se generan mediante Karma e Istanbul.

## Control de versiones

El proyecto utiliza GitHub para registrar su evolución.

**Ramas principales:**

- `main`: versión original de la Evaluación Parcial 1.
- `migracion-react`: versión React actualizada para la Evaluación Parcial 2.
- `testing-jasmine-karma`: desarrollo y configuración de las pruebas unitarias.

Las pruebas se integraron en `migracion-react` mediante el **Pull Request #2**, conservando el historial de cambios.

## Documentación

El proyecto cuenta con una Especificación de Requisitos de Software (ERS) actualizada a la revisión 2.0 y un documento de cobertura de testing con resultados y evidencias.

## Repositorio

https://github.com/gjjzc/Gas-El-Volcan

## Alcance académico

El sistema es un prototipo frontend desarrollado con fines educativos. Los procesos de compra, autenticación y gestión de pedidos se simulan localmente y no constituyen un servicio comercial desplegado con backend de producción.