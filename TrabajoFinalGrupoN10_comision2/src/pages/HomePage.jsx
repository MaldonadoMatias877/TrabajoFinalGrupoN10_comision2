import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const { products, deleteProduct } = useAppContext();
  const navigate = useNavigate();

  const activeProducts = products.filter(p => p.state !== false);

  return (
    <div>
      <p>Lista de productos.</p>

      {activeProducts.length === 0 ? (
        <p className="text-muted">No hay productos disponibles.</p>
      ) : (
        <Row xs={1} sm={2} md={4} className="g-4">
          {activeProducts.map(product => (
            <Col key={product.id}>
              <Card>
                {product.preview && (
                  <Card.Img
                    variant="top"
                    src={product.preview}
                    alt={product.name}
                    style={{ maxHeight: '200px', objectFit: 'cover' }}
                  />
                )}
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>
                    <strong>Precio:</strong> ${product.price}<br />
                    <strong>Categoría:</strong> {product.category}<br />
                    <strong>Descripción:</strong> {product.description}
                  </Card.Text>
                  <div className="d-flex justify-content-between">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => navigate(`/productDetails/${product.id}`)}
                    >
                      Ver detalles
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => deleteProduct(product.id)}
                    >
                      Eliminar
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default HomePage;
