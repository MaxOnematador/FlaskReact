import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';

function EditarCliente() {
    const navigate = useNavigate();
    const { codigo } = useParams();
    const [form, setForm] = useState({
        nombre: '',
        apellido: '',
        direccion: '',
        telefono: '',
        email: ''
    });

    const getCliente = async () => {
        try {
            const res = await api.get(`/clientes/${codigo}`);
            setForm(res.data.cliente);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getCliente();
    }, [codigo]);

    const updateCliente = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/clientes/${codigo}`, form);
            navigate('/clientes');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
            <h1>Editar Cliente</h1>
            <form onSubmit={updateCliente}>
                <input placeholder="Nombre" value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} /><br/><br/>
                <input placeholder="Apellido" value={form.apellido} onChange={e => setForm({ ...form, apellido: e.target.value })} /><br/><br/>
                <input placeholder="Dirección" value={form.direccion} onChange={e => setForm({ ...form, direccion: e.target.value })} /><br/><br/>
                <input placeholder="Teléfono" value={form.telefono} onChange={e => setForm({ ...form, telefono: e.target.value })} /><br/><br/>
                <input placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /><br/><br/>
                <button type="submit">Actualizar</button>
                <button type="button" onClick={() => navigate('/clientes')} style={{ marginLeft: '10px' }}>Volver</button>
            </form>
        </div>
    );
}

export default EditarCliente;
