import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import AdminPage from '../pages/AdminPage';
import AdminLoginPage from '../pages/AdminLoginPage';
import AdminRegisterPage from '../pages/AdminRegisterPage';
import EditarProductoPage from '../pages/EditarProductoPage';  // Importa el componente nuevo

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route path="/admin/registro" element={<AdminRegisterPage />} /> {/* Unificado 'registro' */}
      <Route path="/admin/editar/:productId" element={<EditarProductoPage />} />

    </Routes>
  );
}
