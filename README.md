# 🚚 Cotizador de Envíos – Amplifica

---

## 📦 Tecnologías Utilizadas

- ⚙️ **Laravel 12**
- ⚛️ **React 18+** + Vite
- 🎨 **Tailwind CSS**
- 🌐 **Axios**
- 🔔 **React Hot Toast**
- 🧠 **Eloquent ORM**
- 🧪 **PHPUnit**
- 🐬 **MySQL**
- 💡 **Sanctum**

---

## ✨ Funcionalidades

- ✅ Selección dinámica de **región y comuna** desde la API Amplifica
- ✅ **Carrito** interactivo con peso, cantidad y dimensiones
- ✅ Consulta de **tarifas en tiempo real** vía API externa (con JWT)
- ✅ SPA moderna, minimalista y **totalmente responsiva**
- ✅ **Persistencia en base de datos** de historial de tarifas
- ✅ **Logs estructurados** para debug y monitoreo
- ✅ **Pruebas unitarias** para `AmplificaService`

---

## 🧪 Instrucciones de instalación

### 🔧 Requisitos

- PHP `^8.2`
- Composer
- Node.js `^18.x`
- MySQL o compatible
- Laragon o equivalente

### ▶️ Instalación

```bash
# 1. Clonar el repositorio

cd laravel-amplifica

# 2. Instalar dependencias backend
composer install

# 3. Configurar entorno
cp .env.example .env
php artisan key:generate

# 4. Crear base de datos y migrar
php artisan migrate

# 5. Servir backend
php artisan serve
```

```bash
# 6. Instalar dependencias frontend
npm install

# 7. Iniciar frontend (Vite)
npm run dev
```

---

## 🔐 Usuario de prueba

Se puede crear un usuario `admin` usando **Tinker** con este comando:

```bash
php artisan tinker
```

```php
\App\Models\User::create([
    'name' => 'Admin',
    'email' => 'admin@admin.com',
    'password' => bcrypt('password'),
    'role' => 'admin'
]);
```

---

## 🔀 Rutas disponibles

### 🌐 Frontend SPA

| URL                              | Descripción                         |
|----------------------------------|-------------------------------------|
| `/login`                         | Página de inicio de sesión          |
| `/`                              | Cotizador de envíos|
| `/admin/historial`              | Vista de historial    |


---

### 📡 API Backend (`/api/v1`)

| Método | Ruta               | Descripción                                           
|--------|--------------------|------------------------------------------------------
| GET    | `/regions`         | Obtiene regiones y comunas                           
| POST   | `/rates`           | Consulta tarifas de envío                           
| GET    | `/history`         | Historial público de cotizaciones recientes         
| GET    | `/admin/historial` | Historial completo (sólo para `admin`)              
| GET    | `/user`            | Obtiene datos del usuario               

---

### 🔑 Rutas de Autenticación

| Método | Ruta                    | Descripción                        |
|--------|-------------------------|------------------------------------|
| GET    | `/sanctum/csrf-cookie`  | Obtener token CSRF                 |
| POST   | `/api/login`            | Iniciar sesión con email/password |
| POST   | `/api/logout`           | Cerrar sesión                     |

---

## 🧼 Notas finales

- Debe asegurarse acceder desde `http://127.0.0.1:8000` y no `localhost`
- El frontend guarda la sesión con **Axios** y `withCredentials`.

---

## 📁 Estructura general del proyecto

```
laravel-amplifica/
├── app/
│   └── Services/AmplificaService.php
├── routes/
│   ├── web.php
│   └── api.php
├── resources/js/
│   ├── Pages/
│   ├── Components/
│   ├── hooks/
│   └── App.jsx
└── public/
```

---
