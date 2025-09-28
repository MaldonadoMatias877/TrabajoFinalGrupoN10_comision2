import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import productosData from '../data/productos.json';

export default function EditarProductoPage() {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('products');
    return saved ? JSON.parse(saved) : productosData; // corregido
  });

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const prod = products.find((p) => p.id == productId); // corregido
    if (prod) {
      setProduct(prod);
    } else {
      navigate('/admin');
    }
  }, [productId, products, navigate]);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.name === 'price' ? Number(e.target.value) : e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedProducts = products.map((p) =>
      p.id === product.id ? product : p
    );

    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));

    navigate('/admin');
  };

  if (!product) return <p>Cargando producto...</p>;

  return (
    <div className="container mt-5">
      <h2>Editar Producto</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={product.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">Precio</label>
          <input
            type="number"
            className="form-control"
            id="price"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
            min="0"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">URL Imagen</label>
          <input
            type="text"
            className="form-control"
            id="image"
            name="image"
            value={product.image}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Guardar Cambios</button>
      </form>
    </div>
  );
}
