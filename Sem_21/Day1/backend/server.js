// Servidor Express sencillo para despliegue en Render
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

// 1. Configuracion de variables de entorno
const PORT = process.env.PORT || 3000;
const FRONTEND_URL = process.env.FRONTEND_URL || "*";

// 2. Configuracion de CORS
// Permite peticiones desde el origen donde esta publicado el front-end (por ejemplo GitHub Pages)
const corsOptions = {
    origin: FRONTEND_URL === "*" ? "*" : FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"]
};

app.use(cors(corsOptions));
app.use(express.json());

// 3. Informacion de conexion a Base de Datos (Aiven u otro proveedor cloud)
// En produccion se configuran estas variables en el panel de Render:
const dbConfig = {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || "avnadmin",
    password: process.env.DB_PASSWORD ? "***configurada***" : "sin_password",
    database: process.env.DB_NAME || "defaultdb"
};

// Datos iniciales en memoria (sirve como respaldo si la base de datos externa no esta activa)
let tareas = [
    {
        id: 1,
        titulo: "Crear base de datos en Aiven",
        responsable: "Estudiante",
        prioridad: "Alta"
    },
    {
        id: 2,
        titulo: "Configurar variables de entorno en Render",
        responsable: "Estudiante",
        prioridad: "Media"
    },
    {
        id: 3,
        titulo: "Publicar front-end en GitHub Pages",
        responsable: "Estudiante",
        prioridad: "Alta"
    }
];

// Endpoint de comprobacion de salud (Health Check)
app.get("/api/estado", (req, res) => {
    res.json({
        estado: "activo",
        puerto: PORT,
        corsPermitido: FRONTEND_URL,
        baseDatosConfigurada: Boolean(process.env.DB_HOST)
    });
});

// Endpoint GET para obtener todas las tareas
app.get("/api/tareas", (req, res) => {
    res.json(tareas);
});

// Endpoint POST para registrar una nueva tarea
app.post("/api/tareas", (req, res) => {
    const { titulo, responsable, prioridad } = req.body;

    if (!titulo || !responsable) {
        return res.status(400).json({
            error: "Los campos 'titulo' y 'responsable' son obligatorios."
        });
    }

    const nuevaTarea = {
        id: Date.now(),
        titulo: titulo.trim(),
        responsable: responsable.trim(),
        prioridad: prioridad || "Media"
    };

    tareas.push(nuevaTarea);
    return res.status(201).json(nuevaTarea);
});

// Arrancar el servidor escuchando en 0.0.0.0 para compatibilidad con contenedores y plataformas cloud
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
    console.log(`CORS configurado para el origen: ${FRONTEND_URL}`);
    console.log(`Base de datos host configurado: ${dbConfig.host}:${dbConfig.port}`);
});
