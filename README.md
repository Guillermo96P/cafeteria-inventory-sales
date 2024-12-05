# Gestión de Inventario y Ventas para Cafeterías

## Descripción
Aplicación web para gestionar productos, ventas y stock en una cafetería.
Incluye CRUD de productos, registro de ventas y un historial de ventas.

## Características
- Crear, editar, eliminar y listar productos.
- Registrar ventas y gestionar el stock automáticamente.
- Ver historial de ventas con paginación.
- Mensaje de alerta mediante SweetAlert2.
- Diseño moderno.

## Tecnologías utilizadas
- JavaScript
- **Frontend** React.js
- **Backend** Node.js (Express.js)
- **Base de datos** MongoDB
- **Estilos** CSS3
- **Alertas** SweetAlert2

## Requisitos previos
- Debes tener instalado Node.js en tu maquina. 
- MongoDB
- Navegador (Google Chrome, Firefox)

## Pasos de instalación
1. Clona este repositorio:
Clona el repositorio en tu maquina virtual usando el siguiente comando:

```bash
git clone https://github.com/Guillermo96P/cafeteria-inventory-sales.git
```
2. Instalar las dependencias
Ve al directorio del proyecto y ejecutalos siguientes comandos para instalar las dependencias tanto para el frontend como para el backend.

**Backend**
En la carpeta del backend (donde se encuentra el archivo package.json), ejecuta:
```bash
cd backend
```
Y luego: 
```bash
npm install
```
Este comando instalará todas las dependencias necesarias para que el servidor backend funcione correctamente.

**Frontend**
en la carpeta del frontend (donde también se encuentra el archivo package.json), ejecuta:
```bash
cd frontend
```
Y luego:
```bash
npm install
```
Este comando instalará todas las dependencias necesarias para el frontend basado en React.

3. Ejecutar el proyecto
**Backend**
Para ejecutar el servidor Backend, en la carpeta del backend (donde se encuentra el archivo index.js), ejecuta:
```bash
cd backend
```
```bash
npm start
```
Esto iniciará el servidor backend en http://localhost:5000

**Frontend**
Para ejecutar el frontend, en la carpeta frontend, ejecuta:
```bash
cd frontend
```
```bash
npm start
```
Esto iniciará el servidor frontend en http://localhost:3000

## Dependencias
Este proyecto utiliza las siguientes dependencias:

**Backend (Node.js/Express)**
- express: Framework para Node.js.
- cors: Para habilitar la comunicación entre frontend y backend.
- mongoose: Biblioteca de MongoDB para Node.js.
- body-parser: Middleware para analizar cuerpos o entradas de solicitudes HTTP.

**Frontend (React)**
- react: Biblioteca para construir interfaces de usuario.
- axios: Para realizar solicitudes HTTP desde el frontend (comunicación API Rest)
- react-modal: Para la creación de modales.
- sweetalert2: Para mostrar alertas personalizadas.

## Interacción con el proyecto
- **Agregar Producto:** Usa el modal de "Agregar Producto" para registrar nuevos productos en el inventario.
- **Gestión de Productos:** Permite editar y eliminar productos del inventario.
- **Realizar Venta:** Usa el modal de "Realizar Venta" para registrar registrar ventas. Puedes seleccionar el producto disponible y la cantidad para completar la venta.
- **Ver Historial de Ventas:** Accede al historial de ventas desde el modal "Ver Historial de Ventas". Los datos se muestran de forma paginada. (4 registros por página).

## Licencia
Este proyecto está licenciado bajo la MIT License.