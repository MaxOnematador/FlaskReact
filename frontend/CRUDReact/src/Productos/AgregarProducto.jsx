import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';


function AgregarProducto() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        nombre: '',
        precio: '',
        cantidad: ''
    });

    const addProducto = async (e) => {
        e.preventDefault();
        try {
            await api.post('/productos', form);
            navigate('/productos'); // redirige a lista
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
            <h1>Agregar Producto</h1>
            <form onSubmit={addProducto}>
                <input placeholder="Nombre" value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} /><br/><br/>
                <input placeholder="Precio" value={form.precio} onChange={e => setForm({ ...form, precio: e.target.value })} /><br/><br/>
                <input placeholder="Cantidad" value={form.cantidad} onChange={e => setForm({ ...form, cantidad: e.target.value })} /><br/><br/>
                <button type="submit">Agregar</button>
            </form>
        </div>
    );
}

export default AgregarProducto;

