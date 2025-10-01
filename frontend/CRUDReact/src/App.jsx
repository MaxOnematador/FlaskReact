import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ListaClientes from './Clientes/ListaClientes';
import AgregarCliente from './Clientes/AgregarCliente';
import EditarCliente from './Clientes/EditarCliente';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {/* Redirige la raíz "/" a /clientes */}
          <Route path="/" element={<Navigate to="/clientes" />} />
          <Route path="/clientes" element={<ListaClientes />} />
          <Route path="/clientes/agregar" element={<AgregarCliente />} />
          <Route path="/clientes/editar/:codigo" element={<EditarCliente />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
