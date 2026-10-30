# Semana 21 - Dia 1: Desplegar aplicacion online

Guia completa para desplegar una aplicacion de tres capas (Front-end, Back-end y Base de datos) en la nube. Esta actividad corresponde al 40 % de la nota del examen de evaluacion con entrega indicada para el lunes 2 de noviembre a las 14:00.

---

## 1. Arquitectura propuesta

Para publicar la aplicacion de forma gratuita y escalable se utiliza la siguiente combinacion:

- Base de datos: Aiven (servicio gestionado en la nube con soporte para MySQL y PostgreSQL).
- Back-end: Render (servicio de alojamiento cloud para aplicaciones Node.js, Docker, Java, etc.). Tambien son alternativas validas Railway, Koyeb o AWS.
- Front-end: GitHub Pages (alojamiento gratuito para paginas estaticas HTML, CSS y JavaScript).

---

## 2. Aspectos clave del despliegue

### 2.1. Variables de entorno
En desarrollo local solemos escribir los datos de configuracion en archivos locales como `.env` o `application.properties`. Sin embargo, al desplegar en internet:
- Nunca se deben subir contraseñas ni claves secretas a repositorios publicos de GitHub.
- En la plataforma de hosting (Render) se configuran estas variables dentro del panel de administracion (`Environment Variables`).
- Variables indispensables:
  - `PORT`: El puerto en el que escucha el servidor (Render lo asigna dinamicamente).
  - `FRONTEND_URL`: El dominio publico de GitHub Pages donde reside la interfaz del usuario.
  - `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`: Credenciales para conectar con Aiven.

### 2.2. CORS (Cross-Origin Resource Sharing)
Cuando el front-end esta alojado en un dominio (por ejemplo `https://usuario.github.io`) e intenta consultar un back-end en otro dominio (por ejemplo `https://mi-backend.onrender.com`), el navegador bloquea la peticion por seguridad a menos que el back-end lo autorice explicitamente:
- En Node.js/Express usamos el middleware `cors`:
  ```javascript
  const cors = require("cors");
  app.use(cors({ origin: process.env.FRONTEND_URL || "*" }));
  ```
- En Spring Boot se utiliza la anotacion `@CrossOrigin(origins = "${cors.allowed.origins}")` o una clase de configuracion `WebMvcConfigurer`.
- Precaucion: no anadir una barra final `/` a la URL del frontend en la configuracion de CORS si el navegador envia el origen sin barra.

### 2.3. URLs del fetch
En el entorno local el codigo JavaScript realiza peticiones a `http://localhost:3000` o `http://localhost:8080`.
- Al publicar en GitHub Pages, el navegador de los usuarios no podra acceder a tu ordenador personal.
- Debes sustituir `localhost` por la URL publica proporcionada por Render:
  ```javascript
  // Modo local
  // const API_BASE_URL = "http://localhost:3000";

  // Modo produccion en Render
  const API_BASE_URL = "https://tu-backend.onrender.com";
  ```
- Utiliza siempre el protocolo seguro `https://` para evitar bloqueos por contenido mixto (Mixed Content) cuando GitHub Pages se carga bajo HTTPS.

### 2.4. Docker
Algunas plataformas como Render, Railway o AWS facilitan la ejecucion de la aplicacion mediante un contenedor Docker:
- El archivo `Dockerfile` define exactamente que version de Node/Java se necesita, que dependencias se instalan y como se ejecuta el servidor.
- Garantiza que la aplicacion funcione exactamente igual en el servidor cloud que en tu ordenador de trabajo.

---

## 3. Guia de despliegue paso a paso

### Paso A: Base de datos en Aiven
1. Registrate en aiven.io y crea un nuevo servicio gratuito (Free Tier) de MySQL o PostgreSQL.
2. Selecciona la region mas cercana (por ejemplo Europa/Frankfurt).
3. Una vez creado el servicio, copia los siguientes datos del panel de informacion:
   - Host (direccion del servidor)
   - Port (numero de puerto)
   - User (usuario, normalmente avnadmin)
   - Password (contrasena generada)
   - Database name (nombre de la base de datos)
4. Crea la tabla necesaria ejecutando el script SQL desde la consola web de Aiven o conectandote con MySQL Workbench o DBeaver.

### Paso B: Back-end en Render
1. Sube tu codigo del back-end a un repositorio de GitHub.
2. Inicia sesion en render.com y pulsa sobre "New +" -> "Web Service".
3. Conecta tu repositorio de GitHub y selecciona la carpeta del back-end.
4. Completa la configuracion basica:
   - Name: Nombre de tu servicio (ejemplo: `mi-proyecto-backend`).
   - Region: Europa (Frankfurt).
   - Environment: Node (o Docker si utilizas el `Dockerfile`).
   - Build Command: `npm install`
   - Start Command: `npm start`
5. En la seccion "Environment Variables", anade:
   - `FRONTEND_URL` = `https://tu-usuario.github.io`
   - `DB_HOST` = host de Aiven
   - `DB_PORT` = puerto de Aiven
   - `DB_USER` = usuario de Aiven
   - `DB_PASSWORD` = contrasena de Aiven
   - `DB_NAME` = nombre de la base de datos
6. Pulsa "Create Web Service". Cuando finalice la construccion, copia la URL publica que te asigna Render (ejemplo: `https://mi-proyecto-backend.onrender.com`).

### Paso C: Front-end en GitHub Pages
1. Abre el archivo `frontend/app.js`.
2. Actualiza la variable `API_BASE_URL` con la URL publica que obtuviste de Render en el paso anterior.
3. Sube los cambios a tu repositorio en GitHub.
4. En el repositorio de GitHub, ve a "Settings" -> "Pages".
5. En "Source", selecciona "Deploy from a branch", elige la rama principal (`main` o `master`) y la carpeta (`/root` o la carpeta correspondiente donde esten los archivos HTML).
6. Guarda los cambios. Tras un par de minutos, GitHub te proporcionara la URL publica del front-end: `https://tu-usuario.github.io/tu-repositorio/`.

---

## 4. Estructura de archivos de esta tarea

```
Day1/
|-- README.md            (Esta guia de despliegue)
|-- frontend/
|   |-- index.html       (Interfaz de usuario para crear y listar tareas)
|   |-- estilo.css       (Estilos CSS limpios y basicos)
|   |-- app.js           (Logica fetch para GET y POST hacia la API publica)
`-- backend/
    |-- .env.example     (Plantilla de variables de entorno)
    |-- Dockerfile       (Instrucciones de empaquetado para Render/Railway)
    |-- package.json     (Dependencias Express, CORS y Dotenv)
    `-- server.js        (Servidor Express con CORS configurable y endpoints)
```

---

## 5. Como probar la aplicacion en local antes de publicar

1. Abre una terminal en la carpeta `backend`:
   ```bash
   cd backend
   npm install
   npm start
   ```
2. El servidor arrancara en `http://localhost:3000`.
3. Abre el archivo `frontend/index.html` en tu navegador.
4. Comprueba que las tareas se cargan correctamente y que al rellenar el formulario se anade una nueva tarea a la lista.

---

## 6. Formato de entrega

Para completar la entrega del examen (40 % de la nota):
- Enlace del front-end publicado (por ejemplo, la URL de GitHub Pages).
- Enlace del repositorio de GitHub con el codigo del front-end y back-end.
- Enlace de la URL publica del back-end en Render para comprobar el estado mediante `/api/estado`.
