import { useLocation, useNavigate } from 'react-router-dom';
import { Card, Button, Container } from 'react-bootstrap';

export default function ProductDetail() {
  const { state } = useLocation();
  const navigate = useNavigate();

  // Evita errores si alguien entra directamente a la URL sin pasar "state"
  const product = state?.product;

  if (!product) {
    return <p>Producto no encontrado. Vuelve a la página principal.</p>;
  }

  return (
    <>
        <h1 className='text-center'>Detalles del producto</h1>
        <Container className="my-4">
            <Card className="mx-auto" style={{ maxWidth: '400px' }}>
                <Card.Img variant="top" src={product.image} style={{marginTop:'10px', objectFit: 'contain', height: '300px' }} />
                <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text><strong>Precio:</strong> ${product.price}</Card.Text>
                <Card.Text>
                    Detalles del producto
                </Card.Text>
                <div className="d-flex justify-content-between">
                    <Button
                    variant="success"
                    href="https://wa.me/1234567890" // Reemplaza con tu número de WhatsApp o enlace
                    target="_blank"
                    >
                    Contactarme con el vendedor
                    </Button>
                    <Button variant="secondary" onClick={() => navigate('/')}>
                    Volver
                    </Button>
                </div>
                </Card.Body>
            </Card>
        </Container>
    </>
    
  );
}
