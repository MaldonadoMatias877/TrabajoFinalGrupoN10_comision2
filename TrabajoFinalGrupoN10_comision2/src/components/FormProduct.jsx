import React, { useState, useEffect, useRef } from 'react';
import { useAppContext } from '../context/AppContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Card, Image } from 'react-bootstrap';

const ProductsForm = () => {
  const { addProduct, editingProduct, products } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const productId = queryParams.get('id');

  const initialFormDataState = {
    name: '',
    price: '',
    category: '',
    stock: '',
    dateInit: '',
    description: '',
    preview: '',
  };

  const [formData, setFormData] = useState(initialFormDataState);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const [isFormModified, setIsFormModified] = useState(false);
  const originalFormData = useRef(initialFormDataState);

  // useEffect para cargar los datos del producto si estamos en modo edición
  useEffect(() => {
    if (productId) {
      const productToEdit = products.find(p => p.id === parseInt(productId));
      if (productToEdit) {
        // Asegúrate de formatear la fecha para el input type="date"
        const formattedDate = productToEdit.dateInit ? new Date(productToEdit.dateInit).toISOString().split('T')[0] : '';
        const loadedData = {
          name: productToEdit.name || '',
          price: productToEdit.price || '',
          category: productToEdit.category || '',
          stock: productToEdit.stock || '',
          dateInit: formattedDate, // Usar la fecha formateada
          description: productToEdit.description || '',
          preview: productToEdit.preview || '',
        };
        setFormData(loadedData);
        originalFormData.current = loadedData; // Guarda la data original
        setIsEditing(true);
        setSelectedFile(null);
        setIsFormModified(false); // Al cargar, el formulario no está modificado
      } else {
        console.warn(`Producto con ID ${productId} no encontrado para edición.`);
        setIsEditing(false);
        setFormData(initialFormDataState);
        originalFormData.current = initialFormDataState;
        setSelectedFile(null);
        setIsFormModified(false);
      }
    } else {
      setIsEditing(false);
      setFormData(initialFormDataState);
      originalFormData.current = initialFormDataState;
      setSelectedFile(null);
      setIsFormModified(false); // En modo creación, el botón de agregar debe habilitarse cuando hay datos
    }
  }, [productId, products]);

  // useEffect para verificar si el formulario ha sido modificado
  useEffect(() => {
    if (isEditing) {
      const currentData = {
        name: formData.name,
        price: formData.price,
        category: formData.category,
        stock: formData.stock,
        dateInit: formData.dateInit,
        description: formData.description,
        preview: formData.preview,
      };
      // Comparar formData con originalFormData.current
      const changed = JSON.stringify(currentData) !== JSON.stringify(originalFormData.current) || selectedFile !== null;
      setIsFormModified(changed);
    } else {
      // En modo creación, el formulario se considera modificado si al menos un campo obligatorio tiene valor
      const hasAnyRequiredField = formData.name || formData.price || formData.category || formData.stock || formData.dateInit || formData.description || formData.preview || selectedFile;
      setIsFormModified(hasAnyRequiredField);
    }
  }, [formData, selectedFile, isEditing, originalFormData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'preview' && value !== '') {
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFormData({ ...formData, preview: '' });
    } else {
      setSelectedFile(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let finalPreviewUrl = formData.preview;

    if (selectedFile) {
      finalPreviewUrl = URL.createObjectURL(selectedFile);
    }

    const productData = {
      ...formData,
      preview: finalPreviewUrl,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
    };

    if (isEditing) {
      editingProduct({ ...productData, id: parseInt(productId), state: true });
    } else {
      addProduct(productData);
    }

    setFormData(initialFormDataState);
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setIsFormModified(false);
    navigate('/');
  };

  const currentPreview = selectedFile ? URL.createObjectURL(selectedFile) : formData.preview;

  // Helper para mostrar el valor original si es diferente
  const renderOriginalValueHint = (fieldName) => {
    if (isEditing && originalFormData.current[fieldName] !== undefined && formData[fieldName] !== originalFormData.current[fieldName]) {
      let originalValue = originalFormData.current[fieldName];
      // Si es fecha, se muestra como un string normal para que sea legible
      if (fieldName === 'dateInit' && originalValue) {
        originalValue = new Date(originalValue).toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' });
      }
      return (
        <Form.Text className="text-muted">
          Original: {originalValue}
        </Form.Text>
      );
    }
    return null;
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow-lg border-0 p-4">
            <h2 className="text-center mb-4">
              {isEditing ? 'Editar Producto' : 'Agregar Nuevo Producto'}
            </h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Introduce el nombre del producto"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                {renderOriginalValueHint('name')}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPrice">
                <Form.Label>Precio</Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  placeholder="Precio del Producto"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
                {renderOriginalValueHint('price')}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formCategory">
                <Form.Label>Categoría</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Introduce la categoría"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                />
                {renderOriginalValueHint('category')}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formStock">
                <Form.Label>Stock</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Intruduce el stock disponible"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  required
                />
                {renderOriginalValueHint('stock')}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formDateInit">
                <Form.Label>Fecha de Ingreso</Form.Label>
                <Form.Control
                  type="date"
                  name="dateInit"
                  value={formData.dateInit}
                  onChange={handleChange}
                  required
                />
                {renderOriginalValueHint('dateInit')}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formDescription">
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Introduce la descripción del producto"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
                {renderOriginalValueHint('description')}
              </Form.Group>

              {/* OPCIÓN 1: Subir Archivo */}
              <Form.Group className="mb-3" controlId="formFile">
                <Form.Label>Subir Imagen </Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  disabled={!!formData.preview} // Deshabilita si hay una URL
                  ref={fileInputRef} // Asigna la referencia
                />
                 {isEditing && !selectedFile && originalFormData.current.preview && (
                    <Form.Text className="text-muted">
                        Original URL: {originalFormData.current.preview.substring(0, 50)}...
                    </Form.Text>
                 )}
              </Form.Group>

              <p className="text-center my-3">-- O --</p>

              {/* OPCIÓN 2: URL de Imagen */}
              <Form.Group className="mb-3" controlId="formPreview">
                <Form.Label>URL de Imagen</Form.Label>
                <Form.Control
                  type="url"
                  placeholder="JPEG, PNG, GIF, BMP, TIFF, RAW, WEBP, SVG..."
                  name="preview"
                  value={formData.preview}
                  onChange={handleChange}
                  disabled={!!selectedFile} // Deshabilita si hay un archivo seleccionado
                />
                {renderOriginalValueHint('preview')}
              </Form.Group>

              {/* Previsualización de la imagen */}
              {currentPreview && (
                <div className="mb-3 text-center">
                    <p className="text-muted">Previsualización:</p>
                    <Image src={currentPreview} thumbnail style={{ maxWidth: '150px', height: 'auto' }} />
                </div>
              )}

              <div className="d-grid gap-2 mt-4">
                <Button variant="primary" type="submit" disabled={isEditing && !isFormModified}>
                  {isEditing ? 'Guardar Cambios' : 'Agregar Producto'}
                </Button>
                <Button variant="secondary" onClick={() => navigate('/')}>
                  Cancelar
                </Button>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductsForm;