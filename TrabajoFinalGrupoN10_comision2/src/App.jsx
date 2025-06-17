import { Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import PrivateRoute from './components/PrivateRoutes';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import ProductsForm from './components/FormProduct';
import ProductDetails from './pages/ProductDetails';
import Favorites from './pages/Favorites';
import Login from './pages/Login';

function App(){
  return(
    <>
      <NavBar/>

      <Container className='mt-4'>        
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products/:id" element={<ProductDetails />}/>
        <Route path="/login" element={<Login />} />

        {/* Rutas protegidas */}
        <Route
          path="/favorites"
          element={
            <PrivateRoute>
              <Favorites />
            </PrivateRoute>
          }
        />
        <Route
          path="/form"
          element={
            <PrivateRoute>
                <ProductsForm />
              </PrivateRoute>
            }
          />
        </Routes>
      </Container>
    </>
  );
}

export default App;