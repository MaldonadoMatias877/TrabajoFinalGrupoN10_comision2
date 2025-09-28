import { Container } from 'react-bootstrap';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <>
      <Container className="mt-4">
        <AppRoutes />
      </Container>
    </>
  );
}

export default App;
