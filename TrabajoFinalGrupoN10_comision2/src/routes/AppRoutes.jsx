import { Routes, Route } from 'react-router-dom';
import PrivateRoute from '../components/PrivateRoutes';
import HomePage from '../pages/HomePage';
import ProductDetails from '../pages/ProductDetails';
import Favorites from '../pages/Favorites';
import ProductsForm from '../components/FormProduct';
import Login from '../pages/Login';
import Register from '../pages/Register';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Register />} />

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
  );
};

export default AppRoutes;
