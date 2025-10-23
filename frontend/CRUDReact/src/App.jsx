import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, NavLink } from 'react-router-dom';

// Clientes
import ListaClientes from './Clientes/ListaClientes';
import AgregarCliente from './Clientes/AgregarCliente';
import EditarCliente from './Clientes/EditarCliente';
// Productos
import ListaProductos from './Productos/ListaProducto';
import AgregarProducto from './Productos/AgregarProducto';
import EditarProducto from './Productos/EditarProducto';
// Facturas
import ListaFactura from './Factura/ListaFactura';
import AgregarFactura from './Factura/AgregarFactura';
import EditarFactura from './Factura/EditarFactura';

function App() {
  return (
    <BrowserRouter>
      {/* Header global (fuera del div para ocupar todo el ancho) */}
      <header className="main-header">
        <h1>Flask-React</h1>
        <nav>
          <NavLink to="/clientes" className="nav-link">
            Clientes
          </NavLink>
          <NavLink to="/productos" className="nav-link">
            Productos
          </NavLink>
          <NavLink to="/facturas" className="nav-link">
            Facturas
          </NavLink>
        </nav>
      </header>

      {/* Contenido principal */}
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/clientes" />} />
          <Route path="/clientes" element={<ListaClientes />} />
          <Route path="/clientes/agregar" element={<AgregarCliente />} />
          <Route path="/clientes/editar/:id" element={<EditarCliente />} />
          <Route path="/productos" element={<ListaProductos />} />
          <Route path="/productos/agregar" element={<AgregarProducto />} />
          <Route path="/productos/editar/:id" element={<EditarProducto />} />
          <Route path="/facturas" element={<ListaFactura />} />
          <Route path="/facturas/agregar" element={<AgregarFactura />} />
          <Route path="/facturas/editar/:id" element={<EditarFactura />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
