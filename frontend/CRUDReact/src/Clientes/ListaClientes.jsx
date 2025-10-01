import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

function ListaClientes() {
    const [clientes, setClientes] = useState([]);

    const getClientes = async () => {
        try {
            const res = await api.get('/clientes');
            setClientes(res.data.clientes);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getClientes();
    }, []);

    const deleteCliente = async (codigo) => {
        if (!window.confirm("¿Seguro que deseas eliminar este cliente?")) return;
        try {
            await api.delete(`/clientes/${codigo}`);
            getClientes();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <h1>Lista de Clientes</h1>
            <Link to="/clientes/agregar">
                <button style={{ marginBottom: '15px' }}>Añadir Cliente</button>
            </Link>
            <table border="1" width="100%" cellPadding="10">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Email</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.map(c => (
                        <tr key={c.codigo}>
                            <td>{c.nombre}</td>
                            <td>{c.apellido}</td>
                            <td>{c.email}</td>
                            <td>
                                <Link to={`/clientes/editar/${c.codigo}`}>
                                    <button>Editar</button>
                                </Link>
                                <button onClick={() => deleteCliente(c.codigo)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ListaClientes;
