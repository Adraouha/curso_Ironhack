const numeroPersonaje = document.getElementById("numero");
const btnVerUno = document.getElementById("btnVerUno");
const btnVerTodos = document.getElementById("btnVerTodos");
const btnAnterior = document.getElementById("btnAnterior");
const btnSiguiente = document.getElementById("btnSiguiente");
const indicadorPagina = document.getElementById("indicadorPagina");
const contenedor = document.getElementById("contenedor");
const tablaDOM = document.getElementById("tablaDOM");

let paginaActual = 1;

btnVerUno.addEventListener("click", mostrarUnPersonaje);
btnVerTodos.addEventListener("click", () => {
    paginaActual = 1;
    verTodos(paginaActual);
});
btnAnterior.addEventListener("click", () => {
    if (paginaActual > 1) {
        paginaActual--;
        verTodos(paginaActual);
    }
});
btnSiguiente.addEventListener("click", () => {
    paginaActual++;
    verTodos(paginaActual);
});

// Funcion auxiliar que crea una tarjeta con createElement, classList.add y appendChild
function crearTarjetaPersonaje(perso) {
    // 2 y 5. Crear contenedor con createElement y aplicar clase CSS con classList.add
    const card = document.createElement("div");
    card.classList.add("card");

    // 3. Crear los elementos hijos necesarios para mostrar los datos
    const imagenPersonaje = document.createElement("img");
    imagenPersonaje.src = perso.image;
    imagenPersonaje.alt = perso.name;
    imagenPersonaje.classList.add("card-imagen");

    const nombrePersonaje = document.createElement("p");
    nombrePersonaje.innerText = perso.name;
    nombrePersonaje.classList.add("card-titulo");

    const especiePersonaje = document.createElement("p");
    especiePersonaje.innerText = "Especie: " + perso.species;
    especiePersonaje.classList.add("card-detalle");

    const estadoPersonaje = document.createElement("p");
    estadoPersonaje.innerText = "Estado: " + perso.status;
    estadoPersonaje.classList.add("card-detalle");

    // 4. Unir los elementos con appendChild y anadir la tarjeta al contenedor del DOM
    card.appendChild(imagenPersonaje);
    card.appendChild(nombrePersonaje);
    card.appendChild(especiePersonaje);
    card.appendChild(estadoPersonaje);

    contenedor.appendChild(card);
}

// Funcion auxiliar para anadir una fila a la tabla usando createElement y appendChild
function agregarFilaTabla(perso) {
    const fila = document.createElement("tr");

    const tdId = document.createElement("td");
    tdId.textContent = perso.id;

    const tdNombre = document.createElement("td");
    tdNombre.textContent = perso.name;

    const tdEspecie = document.createElement("td");
    tdEspecie.textContent = perso.species;

    const tdEstado = document.createElement("td");
    tdEstado.textContent = perso.status;

    fila.appendChild(tdId);
    fila.appendChild(tdNombre);
    fila.appendChild(tdEspecie);
    fila.appendChild(tdEstado);

    tablaDOM.appendChild(fila);
}

// 1. Empezar mostrando un unico registro
function mostrarUnPersonaje() {
    const id = parseInt(numeroPersonaje.value) || 1;
    const urlRM = `https://rickandmortyapi.com/api/character/${id}`;

    fetch(urlRM)
        .then((res) => res.json())
        .then((perso) => {
            console.log("Personaje individual:", perso);
            contenedor.innerHTML = "";
            tablaDOM.innerHTML = "";

            crearTarjetaPersonaje(perso);
            agregarFilaTabla(perso);
        })
        .catch((err) => {
            console.error("Error:", err);
        });
}

// 6. Recorrer la respuesta de la API y mostrar varios registros
function verTodos(pagina) {
    const urlRM = `https://rickandmortyapi.com/api/character?page=${pagina}`;
    indicadorPagina.textContent = "Pagina: " + pagina;

    fetch(urlRM)
        .then((res) => res.json())
        .then((data) => {
            console.log("Lista de personajes:", data.results);
            contenedor.innerHTML = "";
            tablaDOM.innerHTML = "";

            for (let perso of data.results) {
                crearTarjetaPersonaje(perso);
                agregarFilaTabla(perso);
            }
        })
        .catch((err) => {
            console.error("Error:", err);
        });
}

// Mostrar el primer personaje al iniciar la pagina
mostrarUnPersonaje();
