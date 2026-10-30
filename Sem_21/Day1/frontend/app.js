// Configuracion de la URL base del backend
// Para desarrollo en local se utiliza: "http://localhost:3000"
// Al desplegar en Render se sustituye por la URL publica proporcionada por Render, por ejemplo:
// const API_BASE_URL = "https://tu-backend-en-render.onrender.com";

const API_BASE_URL = "http://localhost:3000";

// Referencias a los elementos del DOM
const formulario = document.getElementById("formulario-tarea");
const inputTitulo = document.getElementById("titulo");
const inputResponsable = document.getElementById("responsable");
const selectPrioridad = document.getElementById("prioridad");
const listaTareas = document.getElementById("lista-tareas");
const mensajeEstado = document.getElementById("mensaje-estado");
const btnRecargar = document.getElementById("btn-recargar");

// Muestra mensajes informativos, de exito o de error en la interfaz
function mostrarMensaje(texto, tipo) {
    mensajeEstado.textContent = texto;
    mensajeEstado.className = "mensaje-estado";

    if (tipo === "error") {
        mensajeEstado.classList.add("mensaje-error");
    } else if (tipo === "exito") {
        mensajeEstado.classList.add("mensaje-exito");
    }
}

// Obtiene el listado de tareas desde el backend mediante una peticion GET
async function cargarTareas() {
    mostrarMensaje("Conectando con el servidor...", "info");

    try {
        const respuesta = await fetch(`${API_BASE_URL}/api/tareas`);

        if (!respuesta.ok) {
            throw new Error(`Error en la respuesta del servidor: ${respuesta.status}`);
        }

        const tareas = await respuesta.json();
        renderizarTareas(tareas);

        if (tareas.length === 0) {
            mostrarMensaje("No hay tareas registradas actualmente.", "info");
        } else {
            mostrarMensaje(`Se han cargado ${tareas.length} tareas correctamente.`, "exito");
        }
    } catch (error) {
        console.error("Error al cargar tareas:", error);
        mostrarMensaje(
            "No se pudo conectar con el backend. Verifica que este encendido, la URL publica y la configuracion de CORS.",
            "error"
        );
        listaTareas.innerHTML = "";
    }
}

// Dibuja las tareas recibidas en el elemento UL del documento
function renderizarTareas(tareas) {
    listaTareas.innerHTML = "";

    tareas.forEach((tarea) => {
        const li = document.createElement("li");
        li.className = "elemento-tarea";

        let clasePrioridad = "prioridad-media";
        if (tarea.prioridad === "Alta") {
            clasePrioridad = "prioridad-alta";
        } else if (tarea.prioridad === "Baja") {
            clasePrioridad = "prioridad-baja";
        }

        li.innerHTML = `
            <div>
                <strong>${tarea.titulo}</strong>
                <span class="etiqueta-prioridad ${clasePrioridad}">${tarea.prioridad}</span>
            </div>
            <p>Responsable: ${tarea.responsable}</p>
        `;

        listaTareas.appendChild(li);
    });
}

// Envia una nueva tarea al backend mediante una peticion POST
async function guardarTarea(evento) {
    evento.preventDefault();

    const nuevaTarea = {
        titulo: inputTitulo.value.trim(),
        responsable: inputResponsable.value.trim(),
        prioridad: selectPrioridad.value
    };

    if (!nuevaTarea.titulo || !nuevaTarea.responsable) {
        mostrarMensaje("Por favor, completa todos los campos del formulario.", "error");
        return;
    }

    mostrarMensaje("Guardando tarea en el servidor...", "info");

    try {
        const respuesta = await fetch(`${API_BASE_URL}/api/tareas`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(nuevaTarea)
        });

        if (!respuesta.ok) {
            throw new Error(`Error al guardar: ${respuesta.status}`);
        }

        const tareaGuardada = await respuesta.json();
        formulario.reset();
        mostrarMensaje(`Tarea "${tareaGuardada.titulo}" guardada correctamente.`, "exito");

        // Recargar la lista para mostrar la nueva tarea
        await cargarTareas();
    } catch (error) {
        console.error("Error al guardar tarea:", error);
        mostrarMensaje("Error al conectar con el servidor al intentar guardar.", "error");
    }
}

// Asignacion de eventos
formulario.addEventListener("submit", guardarTarea);
btnRecargar.addEventListener("click", cargarTareas);

// Carga inicial al abrir la pagina
window.addEventListener("DOMContentLoaded", cargarTareas);
