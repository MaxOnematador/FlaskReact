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
                'id': fila[0],
                'nombre': fila[1],
                'apellido': fila[2],
                'direccion': fila[3],
                'telefono': fila[4],
                'email': fila[5]
            }
            clientes.append(cliente)
        cursor.close()
        return jsonify({'clientes': clientes, 'mensaje': "Clientes registrados"})
    except Exception as ex:
        return jsonify({'mensaje': "Error", 'error': str(ex)})


# Listar un cliente por código
@app.route('/clientes/<id>', methods=['GET'])
def leer_cliente(id):
    try:
        cursor = conexion.connection.cursor()
        cursor.execute("SELECT * FROM cliente WHERE id = %s", (id,))
        datos = cursor.fetchone()
        if datos:
            cliente = {
                'id': datos[0],
                'nombre': datos[1],
                'apellido': datos[2],
                'direccion': datos[3],
                'telefono': datos[4],
                'email': datos[5]
            }
            cursor.close()
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
        cursor.close()
        return jsonify({'mensaje': "Cliente registrado"})
    except Exception as ex:
        return jsonify({'mensaje': "Error", 'error': str(ex)})


# Eliminar un cliente
@app.route('/clientes/<id>', methods=['DELETE'])
def eliminar_cliente(id):
    try:
        cursor = conexion.connection.cursor()
        cursor.execute("DELETE FROM cliente WHERE id = %s", (id,))
        conexion.connection.commit()
        cursor.close()
        return jsonify({'mensaje': "Cliente eliminado"})
    except Exception as ex:
        return jsonify({'mensaje': "Error", 'error': str(ex)})


# Actualizar un cliente
@app.route('/clientes/<id>', methods=['PUT'])
def actualizar_cliente(id):
    try:
        cursor = conexion.connection.cursor()
        sql = """UPDATE cliente SET nombre=%s, apellido=%s, direccion=%s,
                 telefono=%s, email=%s WHERE id=%s"""
        valores = (
            request.json['nombre'],
            request.json['apellido'],
            request.json['direccion'],
            request.json['telefono'],
            request.json['email'],
            id
        )
        cursor.execute(sql, valores)
        conexion.connection.commit()
        cursor.close()
        return jsonify({'mensaje': "Cliente actualizado"})
    except Exception as ex:
        return jsonify({'mensaje': "Error", 'error': str(ex)})


# ---------------- Productos ----------------


# Listar todos los productos
@app.route('/productos', methods=['GET'])
def listar_productos():
    try:
        cursor = conexion.connection.cursor()
        cursor.execute("SELECT * FROM productos")
        datos = cursor.fetchall()
        productos = []
        for fila in datos:
            producto = {
                'id': fila[0],
                'nombre': fila[1],
                'cantidad': fila[2],
                'precio': fila[3]
            }
            productos.append(producto)
        cursor.close()
        return jsonify({'productos': productos, 'mensaje': "Productos registrados"})
    except Exception as ex:
        return jsonify({'mensaje': "Error", 'error': str(ex)})


# Listar un producto por id
@app.route('/productos/<id>', methods=['GET'])
def leer_producto(id):
    try:
        cursor = conexion.connection.cursor()
        cursor.execute("SELECT * FROM productos WHERE id = %s", (id,))
        datos = cursor.fetchone()
        if datos:
            producto = {
                'id': datos[0],
                'nombre': datos[1],
                'cantidad': datos[2],
                'precio': datos[3]
            }
            cursor.close()
            return jsonify({'producto': producto, 'mensaje': "Producto encontrado"})
        else:
            return jsonify({'mensaje': "Producto no encontrado"})
    except Exception as ex:
        return jsonify({'mensaje': "Error", 'error': str(ex)})


# Registrar un producto
@app.route('/productos', methods=['POST'])
def registrar_producto():
    try:
        cursor = conexion.connection.cursor()
        sql = """INSERT INTO productos (nombre, cantidad, precio)
                 VALUES (%s, %s, %s)"""
        valores = (
            request.json['nombre'],
            request.json['cantidad'],
            request.json['precio']
        )
        cursor.execute(sql, valores)
        conexion.connection.commit()
        cursor.close()
        return jsonify({'mensaje': "Producto registrado"})
    except Exception as ex:
        return jsonify({'mensaje': "Error", 'error': str(ex)})


# Eliminar un producto
@app.route('/productos/<id>', methods=['DELETE'])
def eliminar_producto(id):
    try:
        cursor = conexion.connection.cursor()
        cursor.execute("DELETE FROM productos WHERE id = %s", (id,))
        conexion.connection.commit()
        cursor.close()
        return jsonify({'mensaje': "Producto eliminado"})
    except Exception as ex:
        return jsonify({'mensaje': "Error", 'error': str(ex)})


# Actualizar un producto
@app.route('/productos/<id>', methods=['PUT'])
def actualizar_producto(id):
    try:
        cursor = conexion.connection.cursor()
        sql = """UPDATE productos SET nombre=%s, cantidad=%s, precio=%s WHERE id=%s"""
        valores = (
            request.json['nombre'],
            request.json['cantidad'],
            request.json['precio'],
            id
        )
        cursor.execute(sql, valores)
        conexion.connection.commit()
        cursor.close()
        return jsonify({'mensaje': "Producto actualizado"})
    except Exception as ex:
        return jsonify({'mensaje': "Error", 'error': str(ex)})
    

# ---------------- Factura ----------------


# Listar todos los facturas
@app.route('/facturas', methods=['GET'])
def listar_facturas():
    try:
        cursor = conexion.connection.cursor()
        cursor.execute("SELECT * FROM facturas")
        datos = cursor.fetchall()
        facturas = []
        for fila in datos:
            factura = {
                'id': fila[0], 
                'cliente': fila[1],
                'producto': fila[2],
                'cantidad_facturada': fila[3],
                'total': fila[4]
            }
            facturas.append(factura)
        cursor.close()
        return jsonify({'facturas': facturas, 'mensaje': "Facturas registradas"})
    except Exception as ex:
        return jsonify({'mensaje': "Error", 'error': str(ex)})


# Listar un factura por id
@app.route('/factura/<id>', methods=['GET'])
def leer_factura(id):
    try:
        cursor = conexion.connection.cursor()
        cursor.execute("SELECT * FROM facturas WHERE id = %s", (id,))
        datos = cursor.fetchone()
        if datos:
            factura = {
                'id': datos[0],
                'cliente': datos[1],
                'producto': datos[2],
                'cantidad_facturada': datos[3],
                'total': datos[4]
            }
            cursor.close()
            return jsonify({'factura': factura, 'mensaje': "Factura encontrado"})
        else:
            return jsonify({'mensaje': "Factura no encontrado"})
    except Exception as ex:
        return jsonify({'mensaje': "Error", 'error': str(ex)})


# Registrar un factura
@app.route('/factura', methods=['POST'])
def registrar_factura():
    try:
        cursor = conexion.connection.cursor()
        sql = """INSERT INTO facturas (id_cliente, id_producto, cant_facturada, total)
                 VALUES (%s, %s, %s, %s)"""
        valores = (
            request.json['id_cliente'],
            request.json['id_producto'],
            request.json['cant_facturada'],
            request.json['total']
        )
        cursor.execute(sql, valores)
        conexion.connection.commit()
        cursor.close()
        return jsonify({'mensaje': "Factura registrado"})
    except Exception as ex:
        return jsonify({'mensaje': "Error", 'error': str(ex)})


# Eliminar un factura
@app.route('/factura/<id>', methods=['DELETE'])
def eliminar_factura(id):
    try:
        cursor = conexion.connection.cursor()
        cursor.execute("DELETE FROM facturas WHERE id = %s", (id,))
        conexion.connection.commit()
        cursor.close()
        return jsonify({'mensaje': "Factura eliminado"})
    except Exception as ex:
        return jsonify({'mensaje': "Error", 'error': str(ex)})


# Actualizar un factura
@app.route('/factura/<id>', methods=['PUT'])
def actualizar_factura(id):
    try:
        cursor = conexion.connection.cursor()
        sql = """UPDATE facturas SET id_cliente=%s, id_producto=%s, cant_facturada=%s, total=%s WHERE id=%s"""
        valores = (
            request.json['id_cliente'],
            request.json['id_producto'],
            request.json['cant_facturada'],
            request.json['total'],
            id
        )
        cursor.execute(sql, valores)
        conexion.connection.commit()
        cursor.close()
        return jsonify({'mensaje': "Factura actualizado"})
    except Exception as ex:
        return jsonify({'mensaje': "Error", 'error': str(ex)})



# Página no encontrada
def pagina_no_encontrada(error):
    return "<h1>Página no encontrada</h1>", 404


# Ejecutar aplicación
if __name__ == '__main__':
    app.register_error_handler(404, pagina_no_encontrada)
    app.run()
