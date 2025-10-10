import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';

function EditarFactura() {
    const navigate = useNavigate();
    const { id } = useParams(); // obtiene el id de la factura desde la URL

    const [clientes, setClientes] = useState([]);
    const [productos, setProductos] = useState([]);
    const [form, setForm] = useState({
        id_cliente: '',
        id_producto: '',
        cant_facturada: '',
        total: ''
    });

    console.log('Factura ID:', id);

    // Obtener clientes y productos
    const fetchClientesProductos = async () => {
        try {
            const resClientes = await api.get('/clientes');
            setClientes(resClientes.data.clientes || []);

            const resProductos = await api.get('/productos');
            setProductos(resProductos.data.productos || []);
        } catch (error) {
            console.error('Error al cargar clientes/productos:', error);
        }
    };

    // Obtener la factura por id
    const getFactura = async () => {
        if (!id) return; // evita fetch si id es undefined
        try {
            const res = await api.get(`/factura/${id}`);
            const factura = res.data.factura;

            if (factura) {
                setForm({
                    id_cliente: factura.cliente || '',
                    id_producto: factura.producto || '',
                    cant_facturada: factura.cantidad_facturada || '',
                    total: factura.total || ''
                });
            } else {
                console.error('Factura no encontrada');
            }
        } catch (error) {
            console.error('Error al obtener la factura:', error);
        }
    };

    useEffect(() => {
        fetchClientesProductos();
    }, []);

    useEffect(() => {
        if (id) {
            getFactura();
        }
    }, [id]);

    // Actualizar factura
    const updateFactura = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                id_cliente: Number(form.id_cliente),
                id_producto: Number(form.id_producto),
                cant_facturada: Number(form.cant_facturada),
                total: Number(form.total)
            };

            await api.put(`/factura/${id}`, payload, {
                headers: { 'Content-Type': 'application/json' }
            });

            navigate('/facturas');
        } catch (error) {
            console.error('Error al actualizar la factura:', error);
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
            <h1>Editar Factura</h1>
            {!id ? (
                <p>ID de factura no proporcionado.</p>
            ) : (
                <form onSubmit={updateFactura}>
                    {/* Select Clientes */}
                    <label>Cliente:</label><br/>
                    <select
                        value={form.id_cliente}
                        onChange={e => setForm({ ...form, id_cliente: e.target.value })}
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
                        value={form.id_producto}
                        onChange={e => setForm({ ...form, id_producto: e.target.value })}
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
                        value={form.cant_facturada}
                        onChange={e => setForm({ ...form, cant_facturada: e.target.value })}
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

                    <button type="submit">Guardar</button>
                </form>
            )}
        </div>
    );
}

export default EditarFactura;
