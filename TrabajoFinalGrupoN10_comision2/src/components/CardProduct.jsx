import { Card, Button } from 'react-bootstrap';

export default function CardProduct({ product }) {
  return (
    <Card className="h-100">
      {/* Imagen */}
      <div style={{ height: '200px', overflow: 'hidden' }}>
        <Card.Img
          variant="top"
          src={product.image}
          alt={product.title}
          style={{ height: '100%', width: '100%', objectFit: 'contain' }}
        />
      </div>

      {/* Contenido */}
      <Card.Body className="d-flex flex-column">
        {/* Título fijo arriba */}
        <Card.Title>{product.title}</Card.Title>

        {/* Espaciador flexible */}
        <div className="flex-grow-1" />

        {/* Precio + botón */}
        <div className="d-flex flex-column align-items-center gap-2">
          <Card.Text className="m-0">
            <strong>Precio:</strong> ${product.price}
          </Card.Text>
          <Button variant="primary">Comprar</Button>
        </div>
      </Card.Body>
    </Card>
  );
}
