import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

function ListaClientes() {
    const [clientes, setClientes] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchClientes = async () => {
        try {
            const res = await api.get('/clientes');
            setClientes(res.data.clientes);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const eliminarCliente = async (id) => {
        if (!window.confirm('¿Eliminar cliente?')) return;
        try {
            await api.delete(`/clientes/${id}`);
            setClientes(clientes.filter(c => c.id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchClientes();
    }, []);

    if (loading) return <div>Cargando clientes...</div>;

    return (
        <div style={{ padding: '20px' }}>
            <h1>Clientes</h1>
            <Link to="/clientes/agregar">
                <button>Agregar Cliente</button>
            </Link>
            <table border="1" cellPadding="5" style={{ marginTop: '20px', width: '100%' }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Dirección</th>
                        <th>Teléfono</th>
                        <th>Email</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.map(cliente => (
                        <tr key={cliente.id}>
                            <td>{cliente.id}</td>
                            <td>{cliente.nombre}</td>
                            <td>{cliente.apellido}</td>
                            <td>{cliente.direccion}</td>
                            <td>{cliente.telefono}</td>
                            <td>{cliente.email}</td>
                            <td>
                                <Link to={`/clientes/editar/${cliente.id}`}>
                                    <button>Editar</button>
                                </Link>
                                <button onClick={() => eliminarCliente(cliente.id)} style={{ marginLeft: '10px' }}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ListaClientes;
