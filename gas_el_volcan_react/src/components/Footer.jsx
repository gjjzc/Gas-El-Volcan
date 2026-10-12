import { Link } from 'react-router-dom'
import { zonasDespacho } from '../utils/zonasDespacho.js'

const enlaces = [
  { texto: 'Productos', ruta: '/productos' },
  { texto: 'Nosotros', ruta: '/nosotros' },
  { texto: 'Blog', ruta: '/blog' },
  { texto: 'Contacto', ruta: '/contacto' }
]

function Footer() {
  return (
    <footer className="footer-sitio">
      <div className="contenedor footer-grid">
        <section aria-label="Distribuidora Gas El Volcán">
          <img
            className="footer-logo"
            src="/img/logovolcan.jpg"
            alt="Logotipo de Gas El Volcán"
          />
          <p>Distribución de gas licuado a domicilio en Chillán y comunas aledañas.</p>
        </section>

        <nav aria-label="Enlaces del pie de página">
          <h3>Enlaces</h3>
          <ul className="footer-enlaces">
            {enlaces.map((enlace) => (
              <li key={enlace.ruta}>
                <Link to={enlace.ruta}>{enlace.texto}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <section aria-label="Información de despacho">
          <h3>Despacho a domicilio</h3>
          <p>Consulta nuestra cobertura, días de reparto y tiempos estimados para cada zona.</p>
          <a href="#zonas-despacho" className="footer-ir-zonas">Ver zonas y horarios</a>
        </section>
      </div>

      <section className="contenedor footer-cobertura" aria-labelledby="zonas-despacho">
        <h3 id="zonas-despacho">Zonas y horarios de despacho</h3>
        <p className="footer-aviso">
          Los horarios corresponden a despacho, no a un horario general de atención.
          Los tiempos de entrega son estimados y pueden variar según disponibilidad.
        </p>
        <div className="footer-zonas-grid">
          {zonasDespacho.map((zona) => (
            <article className="footer-zona" key={zona.nombre}>
              <h4>{zona.nombre}</h4>
              <p className="footer-zona-comunas">{zona.comunas}</p>
              <dl>
                <div><dt>Días</dt><dd>{zona.dias}</dd></div>
                <div><dt>Horario</dt><dd>{zona.horario}</dd></div>
                <div><dt>Entrega estimada</dt><dd>{zona.tiempo}</dd></div>
              </dl>
            </article>
          ))}
        </div>
      </section>

      <div className="contenedor copy">
        © 2026 Gas El Volcán · Proyecto académico DSY1104
      </div>
    </footer>
  )
}

export default Footer
