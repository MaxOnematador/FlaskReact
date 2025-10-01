from flask import Flask, jsonify, request
from flask_mysqldb import MySQL
from config import config
from flask_cors import CORS

app = Flask(__name__)
app.config.from_object(config['development'])

CORS(app, origins=['http://localhost:5173'])

# Conexión a MySQL
conexion = MySQL(app)

# ---------------- RUTAS ----------------

# Listar todos los clientes
@app.route('/clientes', methods=['GET'])
def listar_clientes():
    try:
        cursor = conexion.connection.cursor()
        cursor.execute("SELECT * FROM cliente")
        datos = cursor.fetchall()
        clientes = []
        for fila in datos:
            cliente = {
                'codigo': fila[0],
                'nombre': fila[1],
                'apellido': fila[2],
                'direccion': fila[3],
                'telefono': fila[4],
                'email': fila[5]
            }
            clientes.append(cliente)
        return jsonify({'clientes': clientes, 'mensaje': "Clientes registrados"})
    except Exception as ex:
        return jsonify({'mensaje': "Error", 'error': str(ex)})


# Listar un cliente por código
@app.route('/clientes/<codigo>', methods=['GET'])
def leer_cliente(codigo):
    try:
        cursor = conexion.connection.cursor()
        cursor.execute("SELECT * FROM cliente WHERE codigo = %s", (codigo,))
        datos = cursor.fetchone()
        if datos:
            cliente = {
                'codigo': datos[0],
                'nombre': datos[1],
                'apellido': datos[2],
                'direccion': datos[3],
                'telefono': datos[4],
                'email': datos[5]
            }
            return jsonify({'cliente': cliente, 'mensaje': "Cliente encontrado"})
        else:
            return jsonify({'mensaje': "Cliente no encontrado"})
    except Exception as ex:
        return jsonify({'mensaje': "Error", 'error': str(ex)})


# Registrar un cliente
@app.route('/clientes', methods=['POST'])
def registrar_cliente():
    try:
        cursor = conexion.connection.cursor()
        sql = """INSERT INTO cliente (nombre, apellido, direccion, telefono, email)
                 VALUES (%s, %s, %s, %s, %s)"""
        valores = (
            request.json['nombre'],
            request.json['apellido'],
            request.json['direccion'],
            request.json['telefono'],
            request.json['email']
        )
        cursor.execute(sql, valores)
        conexion.connection.commit()
        return jsonify({'mensaje': "Cliente registrado"})
    except Exception as ex:
        return jsonify({'mensaje': "Error", 'error': str(ex)})


# Eliminar un cliente
@app.route('/clientes/<codigo>', methods=['DELETE'])
def eliminar_cliente(codigo):
    try:
        cursor = conexion.connection.cursor()
        cursor.execute("DELETE FROM cliente WHERE codigo = %s", (codigo,))
        conexion.connection.commit()
        return jsonify({'mensaje': "Cliente eliminado"})
    except Exception as ex:
        return jsonify({'mensaje': "Error", 'error': str(ex)})


# Actualizar un cliente
@app.route('/clientes/<codigo>', methods=['PUT'])
def actualizar_cliente(codigo):
    try:
        cursor = conexion.connection.cursor()
        sql = """UPDATE cliente SET nombre=%s, apellido=%s, direccion=%s,
                 telefono=%s, email=%s WHERE codigo=%s"""
        valores = (
            request.json['nombre'],
            request.json['apellido'],
            request.json['direccion'],
            request.json['telefono'],
            request.json['email'],
            codigo
        )
        cursor.execute(sql, valores)
        conexion.connection.commit()
        return jsonify({'mensaje': "Cliente actualizado"})
    except Exception as ex:
        return jsonify({'mensaje': "Error", 'error': str(ex)})


# Página no encontrada
def pagina_no_encontrada(error):
    return "<h1>Página no encontrada</h1>", 404


# Ejecutar aplicación
if __name__ == '__main__':
    app.register_error_handler(404, pagina_no_encontrada)
    app.run()
