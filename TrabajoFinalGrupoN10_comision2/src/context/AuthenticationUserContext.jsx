import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);

  // Al iniciar, verificamos si hay sesión activa
  useEffect(() => {
    const storedAdmin = localStorage.getItem('adminSession');
    if (storedAdmin) {
      setAdmin(JSON.parse(storedAdmin));
    }
  }, []);

  // Función para registrar un administrador (se llama desde el formulario)
  const register = (adminData) => {
    localStorage.setItem('adminUser', JSON.stringify(adminData));
  };

  // Función para iniciar sesión
  const login = ({ usuario, password }) => {
    const storedUser = JSON.parse(localStorage.getItem('adminUser'));

    if (
      storedUser &&
      storedUser.usuario === usuario &&
      storedUser.password === password
    ) {
      localStorage.setItem('adminSession', JSON.stringify(storedUser));
      setAdmin(storedUser);
      return { success: true };
    } else {
      return { success: false, message: 'Credenciales incorrectas' };
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    localStorage.removeItem('adminSession');
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook para usar el contexto
export function useAuth() {
  return useContext(AuthContext);
}


