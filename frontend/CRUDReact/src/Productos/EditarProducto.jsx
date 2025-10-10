import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';



function EditarProducto() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [form, setForm] = useState({
        nombre: '',
        precio: '',
        cantidad: ''
    });

    const getProducto = async () => {
        try {
            const res = await api.get(`/productos/${id}`);
            setForm(res.data.producto);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getProducto();
    }, [id]);

    const updateProducto = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/productos/${id}`, form);
            navigate('/productos');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
            <h1>Editar Producto</h1>
            <form onSubmit={updateProducto}>
                <input placeholder="Nombre" value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} /><br/><br/>
                <input placeholder="Precio" value={form.precio} onChange={e => setForm({ ...form, precio: e.target.value })} /><br/><br/>
                <input placeholder="Cantidad" value={form.cantidad} onChange={e => setForm({ ...form, cantidad: e.target.value })} /><br/><br/>
                <button type="submit">Guardar</button>
            </form>
        </div>
    );
}

export default EditarProducto;


