import { useState } from 'react';
import { useAuth } from '../context/AuthenticationUserContext';
import { useNavigate } from 'react-router-dom';

export default function FormularioDeValidacion() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: '',
    usuario: '',
    password: '',
    repetirPassword: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validaciones básicas
    if (
      !form.nombre ||
      !form.usuario ||
      !form.password ||
      !form.repetirPassword
    ) {
      setError('Todos los campos son obligatorios');
      return;
    }

    if (form.password !== form.repetirPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    // Guardar en localStorage
    register({
      nombre: form.nombre,
      usuario: form.usuario,
      password: form.password,
    });

    // Redirigir a /admin
    navigate('/admin');
  };

  return (
    <form onSubmit={handleSubmit} className="w-50 mx-auto mt-4">
      <h2 className="text-center mb-4">Registro de Administrador</h2>

      {error && <p className="text-danger text-center">{error}</p>}

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Nombre"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Usuario"
          name="usuario"
          value={form.usuario}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <input
          type="password"
          className="form-control"
          placeholder="Contraseña"
          name="password"
          value={form.password}
          onChange={handleChange}
        />
      </div>

      <div className="mb-4">
        <input
          type="password"
          className="form-control"
          placeholder="Repetir contraseña"
          name="repetirPassword"
          value={form.repetirPassword}
          onChange={handleChange}
        />
      </div>

      <div className="text-center">
        <button type="submit" className="btn btn-primary">
          Registrar
        </button>
      </div>
    </form>
  );
}
