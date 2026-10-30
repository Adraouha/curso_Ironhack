// Servidor Node.js para despliegue en AWS EC2 con Docker
const express = require("express");
const path = require("path");
const os = require("os");

const app = express();

// Puerto configurado en 3000
const PUERTO = 3000;

// IMPORTANTE: En Docker y servidores cloud, la aplicacion debe escuchar en 0.0.0.0
// Si escuchara en 127.0.0.1 (localhost), solo aceptaria peticiones internas del contenedor
// y no seria accesible desde la IP publica de AWS EC2.
const HOST = "0.0.0.0";

// Servir archivo estatico HTML
app.use(express.static(path.join(__dirname)));

// Endpoint de estado con datos del servidor y la maquina
app.get("/api/info", (req, res) => {
    res.json({
        estado: "ok",
        mensaje: "Contenedor Docker ejecutandose en AWS EC2",
        puerto: PUERTO,
        host: HOST,
        hostname: os.hostname(),
        plataforma: os.platform(),
        memoriaTotalMB: Math.round(os.totalmem() / (1024 * 1024)),
        memoriaLibreMB: Math.round(os.freemem() / (1024 * 1024))
    });
});

app.listen(PUERTO, HOST, () => {
    console.log(`Servidor web arrancado correctamente.`);
    console.log(`Escuchando en http://${HOST}:${PUERTO}`);
    console.log(`Listo para recibir conexiones desde la IP publica de la instancia EC2.`);
});
