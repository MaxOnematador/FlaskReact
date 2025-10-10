import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

function Factura() {
    const [facturas, setFacturas] = useState([]);

    const getFacturas = async () => {
        try {
            const res = await api.get('/facturas');
            setFacturas(res.data.facturas);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getFacturas();
    }, []);

    const deleteFactura = async (id) => {
        if (!window.confirm('¿Está seguro que desea eliminar esta factura?')) return;

        try {
            await api.delete(`/factura/${id}`);
            // Volver a cargar las facturas para reflejar el cambio
            getFacturas();
        } catch (error) {
            console.error('Error al eliminar factura:', error);
        }
    };


    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <h1>Lista de Facturas</h1>
            <Link to="/facturas/agregar">
                <button style={{ marginBottom: '15px' }}>Añadir Factura</button>
            </Link>
            <table border="1" width="100%" cellPadding="10">
                <thead>
                    <tr>
                        <th>Cliente</th>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Total</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {facturas.map((factura) => (
                        <tr key={factura.id}>
                            <td>{factura.cliente}</td>
                            <td>{factura.producto}</td>
                            <td>{factura.cantidad_facturada}</td>
                            <td>{factura.total}</td>
                            <td>
                                <Link to={`/facturas/editar/${factura.id}`}>
                                    <button>Editar</button>
                                </Link>
                                <button onClick={() => deleteFactura(factura.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Factura;



