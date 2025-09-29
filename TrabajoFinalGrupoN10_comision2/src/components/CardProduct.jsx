import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function CardProduct({ product }) {
  const navigate = useNavigate();

  const handleBuyClick = () => {
    navigate(`/producto/${product.id}`, { state: { product } });
  };

  return (
    <Card className="h-100">
      <div style={{ height: '200px', overflow: 'hidden', marginTop: '10px' }}>
        <Card.Img
          variant="top"
          src={product.image}
          alt={product.title}
          style={{ height: '100%', width: '100%', objectFit: 'contain' }}
        />
      </div>

      <Card.Body className="d-flex flex-column">
        <Card.Title>{product.title}</Card.Title>
        <div className="flex-grow-1" />
        <div className="d-flex flex-column align-items-center gap-2">
          <Card.Text className="m-0">
            <strong>Precio:</strong> ${product.price}
          </Card.Text>
          <Button variant="primary" onClick={handleBuyClick}>Ver detalles del producto</Button>
        </div>
      </Card.Body>
    </Card>
  );
}
