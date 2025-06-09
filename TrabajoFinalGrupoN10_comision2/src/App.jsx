import { Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import ProductsForm from './components/FormProduct';
import ProductDetails from './pages/ProductDetails';
import Favorites from './pages/Favorites';


function App() {

  return (
    <>
      <NavBar/>{/* Primero mostramos la barra de navegacion*/}

      <Container className='mt-4'>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/productDetails/:id' element={<ProductDetails/>}/>
          <Route path='/favorites' element={<Favorites/>}/>
          <Route path='/form' element={<ProductsForm/>}/>
        </Routes>
      </Container>
    </>
  )
}

export default App;
