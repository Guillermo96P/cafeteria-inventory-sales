// Archivo de configuración del servidor

// Importar dependencias necesarias
const express = require('express'); // Framework para construir el servidor
const bodyParser = require('body-parser'); // Middleware para procesar JSON
const cors = require('cors'); // Middleware para permitir solicitudes CORS
const mongoose = require('mongoose'); // Libreria para conectarse a MongoDB
const productRoutes = require('./routes/products');

// Crear una instacia de la aplicación Express
const app = express();

// Definir el puerto en el que el servidor escuchará solicitudes
const PORT = 5000;

// Conectar a la base de datos de MongoDB
mongoose.connect('mongodb://localhost:27017/cafeteria', {
    useNewUrlParser: true, // Configuración para usar el nuevo analizador de URL
    useUnifiedTopology: true, // Configuración para usar el nuevo motor de administración de conexiones
})
.then(() => {
    console.log('Conexión exitosa a la base de datos MongoDB'); // Mensaje de exito
})
.catch((error) => {
    console.error('Error al conectar a la base de datos', error); // Mensaje de error
});

// Configurar Middlewares
app.use(bodyParser.json()); // Permitir solicitudes con formato JSON
app.use(cors()); // Permitir solicitudes desde cualquier origen

// Ruta inicial de prueba - Metodo GET - Devuelve un mensaje que el servidor está funcionando correctamente
app.get('/', (req, res) => {
    res.send('Servidor funcionando correctamente'); // Respuesta al cliente
});

// Rutas de productos
app.use('/api/products', productRoutes);

// Iniciar servidor - Escucha las solicitudes en el puerto indicado (5000)
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});