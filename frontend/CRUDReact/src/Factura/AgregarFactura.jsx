import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function AgregarFactura() {
    const navigate = useNavigate();

    const [clientes, setClientes] = useState([]);
    const [productos, setProductos] = useState([]);
    const [form, setForm] = useState({
        cliente: '',
        producto: '',
        cantidad_facturada: '',
        total: ''
    });

    // Cargar clientes y productos al montar el componente
    useEffect(() => {
        const fetchData = async () => {
            try {
                const resClientes = await api.get('/clientes');
                setClientes(resClientes.data.clientes); // según tu API

                const resProductos = await api.get('/productos');
                setProductos(resProductos.data.productos); // según tu API
            } catch (error) {
                console.error('Error al cargar clientes/productos:', error);
            }
        };
        fetchData();
    }, []);

    // Manejar envío del formulario
    const addFactura = async (e) => {
        e.preventDefault();
        try {
            // Adaptar nombres de campos al backend
            const payload = {
                id_cliente: Number(form.cliente),
                id_producto: Number(form.producto),
                cant_facturada: Number(form.cantidad_facturada),
                total: Number(form.total)
            };

            // Asegurarse de enviar JSON correctamente
            await api.post('/factura', payload, {
                headers: { 'Content-Type': 'application/json' }
            });

            // Redirigir a la lista de facturas
            navigate('/facturas');
        } catch (error) {
            console.error('Error al agregar factura:', error);
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
            <h1>Agregar Factura</h1>
            <form onSubmit={addFactura}>
                {/* Select Clientes */}
                <label>Cliente:</label><br/>
                <select
                    value={form.cliente}
                    onChange={e => setForm({ ...form, cliente: e.target.value })}
                    required
                >
                    <option value="">Seleccione un cliente</option>
                    {clientes.map(c => (
                        <option key={c.id} value={c.id}>{c.nombre} {c.apellido}</option>
                    ))}
                </select>
                <br/><br/>

                {/* Select Productos */}
                <label>Producto:</label><br/>
                <select
                    value={form.producto}
                    onChange={e => setForm({ ...form, producto: e.target.value })}
                    required
                >
                    <option value="">Seleccione un producto</option>
                    {productos.map(p => (
                        <option key={p.id} value={p.id}>{p.nombre}</option>
                    ))}
                </select>
                <br/><br/>

                {/* Cantidad */}
                <input
                    type="number"
                    placeholder="Cantidad"
                    value={form.cantidad_facturada}
                    onChange={e => setForm({ ...form, cantidad_facturada: e.target.value })}
                    required
                />
                <br/><br/>

                {/* Total */}
                <input
                    type="number"
                    placeholder="Total"
                    value={form.total}
                    onChange={e => setForm({ ...form, total: e.target.value })}
                    required
                />
                <br/><br/>

                <button type="submit">Agregar Factura</button>
            </form>
        </div>
    );
}

export default AgregarFactura;
