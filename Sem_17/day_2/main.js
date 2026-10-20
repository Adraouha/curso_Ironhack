const datosCoche = document.getElementById("datosCoche");
const cocheURL = "http://localhost:8080/coches";

// 1. Ver todos los coches (GET)
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

// 2. Buscar un coche por su ID (GET /coches/{id})
function verUno() {
    // Leer el valor del input dentro de la funcion
    const id = document.getElementById("numeroid").value;
    console.log("ID buscado:", id);

    fetch(`${cocheURL}/${id}`)
        .then((respuesta) => {
            if (!respuesta.ok) {
                throw new Error("No se encontro el coche con ID " + id);
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
            console.log("Error:", error);
            datosCoche.innerHTML = `<p>${error.message}</p>`;
        });
}

// 3. Anadir un coche (POST)
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
        datosCoche.innerHTML = `<p>Coche creado correctamente con ID ${coche.id}</p>`;
    })
    .catch((error) => {
        console.log("Error:", error);
        datosCoche.innerHTML = `<p>Error al crear el coche: ${error.message}</p>`;
    });
}

// 4. Eliminar un coche por su ID (DELETE)
function borrarCoche() {
    const id = document.getElementById("idcocheborrar").value;
    console.log("Borrando coche con ID:", id);

    fetch(`${cocheURL}/${id}`, {
        method: "DELETE"
    })
    .then((respuesta) => {
        if (!respuesta.ok) {
            throw new Error(`Error HTTP: ${respuesta.status}`);
        }
        console.log("Coche borrado con ID:", id);
        datosCoche.innerHTML = `<p>Coche con ID ${id} borrado correctamente.</p>`;
    })
    .catch((error) => {
        console.log("Error:", error);
        datosCoche.innerHTML = `<p>No se pudo borrar el coche: ${error.message}</p>`;
    });
}
