import { Container } from 'react-bootstrap';
import NavBar from './components/NavBar';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <>
      <NavBar />
      <Container className="mt-4">
        <AppRoutes />
      </Container>
    </>
  );
}

export default App;
