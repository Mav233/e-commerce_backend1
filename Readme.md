# 🛒 E-commerce Scopper

Proyecto final de backend desarrollado con **Node.js, Express, MongoDB, Handlebars y WebSockets**, que implementa un e-commerce con gestión de productos y carrito de compras.

---

## 🚀 Tecnologías utilizadas

- Node.js
- Express.js
- MongoDB + Mongoose
- Handlebars
- Socket.io
- Mongoose Paginate v2
- Toastify.js
- HTML5 / CSS3

---

## 📁 Estructura del proyecto
src/
│
├── config/
│ └── mongo.js
│
├── models/
│ ├── product.model.js
│ └── cart.model.js
│
├── routes/
│ ├── products.router.js
│ ├── carts.router.js
│ └── views.router.js
│
├── public/
│ ├── styles/
│ │ └── main.css
│ └── js/
│ └── main.js
│
├── views/
│ ├── layouts/
│ │ └── main.handlebars
│ ├── index.handlebars
│ ├── productDetail.handlebars
│ ├── checkout.handlebars
│ ├── realTimeProducts.handlebars
│ └── home.handlebars

│
└── app.js
text---

## ⚙️ Instalación y ejecución

### 1️⃣ Clonar el repositorio
```bash
git clone https://github.com/USUARIO/NOMBRE_REPOSITORIO.git
2️⃣ Instalar dependencias
textnpm install
3️⃣ Variables de entorno
Crear un archivo .env en la raíz del proyecto con:
textMONGO_URI=mongodb+srv://<usuario>:<password>@<cluster>/<db>
PORT=8080
4️⃣ Ejecutar el servidor
text npm run dev
📍 El servidor se ejecuta en:
texthttp://localhost:8080

nodemon src/app.js

📦 Funcionalidades principales
🧾 Productos

Listado de productos con paginación
Filtros por categoría y stock
Ordenamiento por precio (asc / desc)
Detalle individual del producto
Creación, edición y eliminación de productos
Actualización en tiempo real con WebSockets

🛒 Carrito de compras

Creación automática de carrito
Agregar productos al carrito
Incrementar y decrementar cantidad
Límite por stock disponible
Eliminar productos del carrito
Vaciar carrito
Checkout con renderizado en Handlebars
Notificación de compra exitosa con Toastify

🌐 Endpoints principales

Productos

textGET    /api/products
GET    /api/products/:pid
POST   /api/products
PUT    /api/products/:pid
DELETE /api/products/:pid

Carritos

textPOST   /api/carts
GET    /api/carts/:cid
POST   /api/carts/:cid/product/:pid
DELETE /api/carts/:cid/products/:pid
DELETE /api/carts/:cid

🖥️ Vistas
text/products
/products/:pid
/carts/:cid
/realtimeproducts

El carrito almacena únicamente IDs de productos y utiliza populate al renderizar.

Se creara un segundo repositorio _e-commerce_backend2_ con nuevas funcionales y conceptos aplicados.