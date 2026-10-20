const datosCoche = document.getElementById("datosCoche");
const inputId = document.getElementById("idcoche");
const cocheURL = "http://localhost:8080/coches";

// Permitir buscar con la tecla Enter
inputId.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        verUno();
    }
});

// Ver todos los coches
function verTodos() {
    fetch(cocheURL)
        .then((respuesta) => respuesta.json())
        .then((data) => {
            console.log("Todos los coches:", data);
            datosCoche.innerHTML = "";
            data.forEach((coche) => {
                datosCoche.innerHTML += `
                    <div class="coche-item">
                        <h3>${coche.marca} ${coche.modelo}</h3>
                        <p>Matricula: ${coche.matricula} | Precio: ${coche.precio} EUR</p>
                        <small>ID: ${coche.id}</small>
                    </div>
                `;
            });
        })
        .catch((error) => console.log("Error:", error));
}

// Ver un coche por su ID
function verUno() {
    const id = inputId.value;
    console.log("Buscando coche ID:", id);

    fetch(`${cocheURL}/${id}`)
        .then((respuesta) => {
            if (!respuesta.ok) {
                throw new Error(`No hemos encontrado un coche con el ID ${id}`);
            }
            return respuesta.json();
        })
        .then((coche) => {
            console.log("Coche recibido:", coche);
            datosCoche.innerHTML = `
                <div class="coche-item">
                    <h3>${coche.marca} ${coche.modelo}</h3>
                    <p>Matricula: ${coche.matricula} | Precio: ${coche.precio} EUR</p>
                    <small>ID: ${coche.id}</small>
                </div>
            `;
        })
        .catch((error) => {
            console.error(error);
            datosCoche.innerHTML = `<p>${error.message}</p>`;
        });
}

// Anadir un coche nuevo (POST)
function crearCoche() {
    const marca = document.getElementById("marca").value;
    const modelo = document.getElementById("modelo").value;
    const matricula = document.getElementById("matricula").value;
    const precio = Number(document.getElementById("precio").value);
    const marcaId = Number(document.getElementById("marcaId").value);

    const nuevoCoche = {
        marca: marca,
        modelo: modelo,
        matricula: matricula,
        precio: precio
    };

    if (marcaId > 0) {
        nuevoCoche.marcaId = { id: marcaId };
    }

    fetch(cocheURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(nuevoCoche)
    })
    .then((respuesta) => {
        if (!respuesta.ok) {
            throw new Error(`Error HTTP: ${respuesta.status}`);
        }
        return respuesta.json();
    })
    .then((coche) => {
        console.log("Coche creado:", coche);
        datosCoche.innerHTML = `<p>Coche anadido con ID ${coche.id}</p>`;
    })
    .catch((error) => {
        console.error(error);
        datosCoche.innerHTML = `<p>${error.message}</p>`;
    });
}

// Actualizar un coche por su ID (PUT)
function actualizarCoche() {
    const id = document.getElementById("idcocheactualizar").value;
    const marca = document.getElementById("marcaAct").value.trim();
    const modelo = document.getElementById("modeloAct").value.trim();
    const matricula = document.getElementById("matriculaAct").value.trim();
    const precio = document.getElementById("precioAct").value;

    // Validar que ID, marca, modelo y precio no esten vacios.
    // La matricula puede quedar vacia para conservar la que ya tiene el coche.
    if (id === "" || marca === "" || modelo === "" || precio === "") {
        alert("Rellena todos los campos menos la matricula, si no quieres cambiarla.");
        return;
    }

    const cocheActualizado = {
        marca: marca,
        modelo: modelo,
        matricula: matricula,
        precio: Number(precio)
    };

    fetch(`${cocheURL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(cocheActualizado)
    })
    .then((respuesta) => {
        if (respuesta.status === 404) {
            datosCoche.innerHTML = `<p>No existe ningun coche con el ID ${id}</p>`;
            return null;
        } else if (respuesta.status === 409) {
            datosCoche.innerHTML = `<p>Esa matricula ya existe en otro coche</p>`;
            return null;
        } else if (!respuesta.ok) {
            throw new Error(`Error HTTP: ${respuesta.status}`);
        }
        return respuesta.json();
    })
    .then((coche) => {
        if (coche) {
            console.log("Coche actualizado:", coche);
            datosCoche.innerHTML = `
                <p>Coche con ID ${id} actualizado: ${coche.marca} ${coche.modelo}, ${coche.precio} EUR (Matricula: ${coche.matricula})</p>
            `;
        }
    })
    .catch((error) => {
        console.error(error);
        datosCoche.innerHTML = `<p>${error.message}</p>`;
    });
}

// Borrar un coche por su ID (DELETE)
function borrarCoche() {
    const id = document.getElementById("idcocheborrar").value;

    fetch(`${cocheURL}/${id}`, {
        method: "DELETE"
    })
    .then((respuesta) => {
        if (respuesta.status === 404) {
            datosCoche.innerHTML = `<p>No existe ningun coche con el ID ${id}</p>`;
            return;
        }
        if (!respuesta.ok) {
            throw new Error("No se ha podido borrar el coche");
        }
        datosCoche.innerHTML = `<p>El coche con ID ${id} ha sido borrado correctamente.</p>`;
    })
    .catch((error) => {
        console.error(error);
        datosCoche.innerHTML = `<p>${error.message}</p>`;
    });
}
