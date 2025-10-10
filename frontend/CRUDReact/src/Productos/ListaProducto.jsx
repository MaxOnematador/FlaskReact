import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';



function ListaProductos() {
    const [productos, setProductos] = useState([]);

    const getProductos = async () => {
        try {
            const res = await api.get('/productos');
            setProductos(res.data.productos);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getProductos();
    }, []);

    const deleteProducto = async (id) => {
        if (!window.confirm("¿Seguro que deseas eliminar este producto?")) return;
        try {
            await api.delete(`/productos/${id}`);
            getProductos();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <h1>Lista de Productos</h1>
            <Link to="/productos/agregar">
                <button style={{ marginBottom: '15px' }}>Añadir Producto</button>
            </Link>
            <table border="1" width="100%" cellPadding="10">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Cantidad</th>
                        <th>Precio</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map((producto) => (
                        <tr key={producto.id}>
                            <td>{producto.nombre}</td>
                            <td>{producto.cantidad}</td>
                            <td>{producto.precio}</td>
                            <td>
                                <Link to={`/productos/editar/${producto.id}`}>
                                    <button>Editar</button>
                                </Link>
                                <button onClick={() => deleteProducto(producto.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ListaProductos;

