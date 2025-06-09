import { useState, useRef } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

function FormProduct() {
    const { addProduct } = useAppContext();
    const fileInputRef = useRef(null); // referencia para limpiar el input file

    const navigate =useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        category: '',
        stock: '',
        dateInit: '',
        image: null,
        preview: '',
    });

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;

        if (type === 'file') {
            const file = files[0];
            if (file) {
                setFormData({
                    ...formData,
                    image: file,
                    preview: URL.createObjectURL(file),
                });
            }
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const parseData = {
            ...formData,
            price: parseFloat(formData.price),
            stock: parseInt(formData.stock),
        };

        addProduct(formData);

        // Limpia formulario y vista previa
        setFormData({
            name: '',
            price: '',
            description: '',
            category: '',
            stock: '',
            dateInit: '',
            image: null,
            preview: '',
        });

        // Limpia input file manualmente
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }

        navigate('/');
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-3'>
                <Form.Label>Nombre</Form.Label>
                <Form.Control 
                    type="text"
                    name='name'
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group className='mb-3'>
                <Form.Label>Precio</Form.Label>
                <Form.Control 
                    type="text"
                    name='price'
                    value={formData.price}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group className='mb-3'>
                <Form.Label>Categoría</Form.Label>
                <Form.Control 
                    type="text"
                    name='category'
                    value={formData.category}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group className='mb-3'>
                <Form.Label>Stock</Form.Label>
                <Form.Control 
                    type="text"
                    name='stock'
                    value={formData.stock}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group className='mb-3'>
                <Form.Label>Día de ingreso</Form.Label>
                <Form.Control 
                    type="date"
                    name='dateInit'
                    value={formData.dateInit}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group className='mb-3'>
                <Form.Label>Descripción</Form.Label>
                <Form.Control 
                    as="textarea"
                    name='description'
                    value={formData.description}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group className='mb-3'>
                <Form.Label>Insertar imagen</Form.Label>
                <Form.Control 
                    type="file"
                    name='image'
                    accept='image/*'
                    onChange={handleChange}
                    ref={fileInputRef} // para poder limpiar el campo
                    required
                />
                {formData.preview && (
                    <img
                        src={formData.preview}
                        alt="Vista previa"
                        className='mt-3'
                        style={{ maxHeight: '150px' }}
                    />
                )}
            </Form.Group>

            <Button type="submit">Guardar producto</Button>
        </Form>
    );
}

export default FormProduct;