const URL_API = "http://localhost:8080/api/premios";

const inputPremio = document.getElementById("premio");
const btnAgregar = document.getElementById("btnAgregar");
const btnSortear = document.getElementById("btnSortear");
const btnVerTodos = document.getElementById("btnVerTodos");
const resultado = document.getElementById("resultado");
const listaPremios = document.getElementById("listaPremios");

btnAgregar.addEventListener("click", guardarPremio);
btnSortear.addEventListener("click", sortear);
btnVerTodos.addEventListener("click", listarPremios);

// Guardar un premio nuevo con POST
async function guardarPremio() {
    const nombre = inputPremio.value.trim();

    if (nombre === "") {
        alert("Introduce un premio");
        return;
    }

    const premio = {
        nombre: nombre
    };

    await fetch(URL_API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(premio)
    });

    inputPremio.value = "";
    resultado.textContent = "Premio anadido correctamente: " + nombre;
    listarPremios();
}

// Obtener un premio aleatorio con GET
async function sortear() {
    const response = await fetch(`${URL_API}/random`);
    const premio = await response.json();
    resultado.textContent = `Premio ganador: ${premio.nombre}`;
}

// Obtener todos los premios con GET
async function listarPremios() {
    const response = await fetch(URL_API);
    const premios = await response.json();

    listaPremios.innerHTML = "";
    premios.forEach((p) => {
        const li = document.createElement("li");
        li.textContent = `ID ${p.id}: ${p.nombre}`;
        listaPremios.appendChild(li);
    });
}
