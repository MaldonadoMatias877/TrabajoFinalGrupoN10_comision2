import { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import productosData from '../data/productos.json';
import CardProduct from '../components/CardProduct';

export default function HomePage() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    setProductos(productosData);
  }, []);

  return (
    <>
      <h1 className='text-center'>Lista de productos</h1>
      <Row className="g-4">
        {productos.map(producto => (
          <Col
            key={producto.id}
            xs={12}     // 1 por fila en pantallas muy pequeñas
            sm={4}      // 3 por fila en pantallas chicas/medianas (12 / 4 = 3)
            lg={3}      // 4 por fila en pantallas grandes (12 / 3 = 4)
          >
            <CardProduct product={producto} />
          </Col>
        ))}
      </Row>

    </>
  );
}
