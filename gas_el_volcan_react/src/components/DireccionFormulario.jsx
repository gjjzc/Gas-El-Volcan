import { Col, Form, Row } from 'react-bootstrap'
import { comunasPorRegion } from '../utils/direccionDespacho.js'

function DireccionFormulario({ direccion, onChange, requerida = true }) {
  return (
    <Row className="g-3">
      <Col md={6}>
        <Form.Group>
          <Form.Label>Región</Form.Label>
          <Form.Select name="region" value={direccion.region || ''} onChange={onChange} required={requerida}>
            <option value="">Selecciona una región</option>
            {Object.keys(comunasPorRegion).map((region) => (
              <option key={region} value={region}>{region}</option>
            ))}
          </Form.Select>
        </Form.Group>
      </Col>
      <Col md={6}>
        <Form.Group>
          <Form.Label>Comuna</Form.Label>
          <Form.Select name="comuna" value={direccion.comuna || ''} onChange={onChange} disabled={!direccion.region} required={requerida}>
            <option value="">Selecciona una comuna</option>
            {(comunasPorRegion[direccion.region] || []).map((comuna) => (
              <option key={comuna} value={comuna}>{comuna}</option>
            ))}
          </Form.Select>
        </Form.Group>
      </Col>
      <Col md={8}>
        <Form.Group>
          <Form.Label>Calle o avenida</Form.Label>
          <Form.Control name="calle" value={direccion.calle || ''} onChange={onChange} maxLength={120} placeholder="Av. Argentina" required={requerida} />
        </Form.Group>
      </Col>
      <Col md={4}>
        <Form.Group>
          <Form.Label>Número de casa</Form.Label>
          <Form.Control name="numero" value={direccion.numero || ''} onChange={onChange} maxLength={15} placeholder="1250" required={requerida} />
        </Form.Group>
      </Col>
      <Col md={6}>
        <Form.Group>
          <Form.Label>Departamento / interior (opcional)</Form.Label>
          <Form.Control name="departamento" value={direccion.departamento || ''} onChange={onChange} maxLength={40} placeholder="Depto. 302" />
        </Form.Group>
      </Col>
      <Col md={6}>
        <Form.Group>
          <Form.Label>Referencia para el repartidor (opcional)</Form.Label>
          <Form.Control name="referencia" value={direccion.referencia || ''} onChange={onChange} maxLength={120} placeholder="Portón negro, casa de esquina" />
        </Form.Group>
      </Col>
    </Row>
  )
}

export default DireccionFormulario
