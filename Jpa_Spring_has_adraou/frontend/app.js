const datosCoche = document.getElementById("datosCoche");
const cocheURL = "http://localhost:8080/api/coches";

// Iniciar sesion con BCrypt en el backend
function iniciarSesion() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const mensajeLogin = document.getElementById("mensajeLogin");

    if (username === "" || password === "") {
        mensajeLogin.textContent = "Escribe usuario y contrasena.";
        return;
    }

    const datos = new URLSearchParams();
    datos.append("username", username);
    datos.append("password", password);

    fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: datos,
        credentials: "include"
    })
    .then((respuesta) => {
        if (!respuesta.ok) {
            throw new Error("Usuario o contrasena incorrectos");
        }
        return respuesta.json();
    })
    .then((data) => {
        console.log("Login:", data);
        mensajeLogin.textContent = "Sesion iniciada correctamente.";
    })
    .catch((error) => {
        mensajeLogin.textContent = error.message;
    });
}

// Ver todos los coches
function verTodos() {
    fetch(cocheURL)
        .then((respuesta) => respuesta.json())
        .then((data) => {
            console.log("Todos los coches:", data);
            datosCoche.innerHTML = "";
            data.forEach((coche) => {
                datosCoche.innerHTML += `
                    <div class="item-coche">
                        <strong>ID ${coche.id}: ${coche.marca} ${coche.modelo}</strong><br>
                        Matricula: ${coche.matricula} | Precio: ${coche.precio} EUR
                    </div>
                `;
            });
        })
        .catch((error) => console.log("Error:", error));
}

// Buscar un coche por su ID
function verUno() {
    const id = document.getElementById("idcoche").value;

    fetch(`${cocheURL}/${id}`)
        .then((respuesta) => {
            if (!respuesta.ok) {
                throw new Error("No se encontro el coche con ID " + id);
            }
            return respuesta.json();
        })
        .then((coche) => {
            console.log("Coche encontrado:", coche);
            datosCoche.innerHTML = `
                <div class="item-coche">
                    <strong>ID ${coche.id}: ${coche.marca} ${coche.modelo}</strong><br>
                    Matricula: ${coche.matricula} | Precio: ${coche.precio} EUR
                </div>
            `;
        })
        .catch((error) => {
            console.log("Error:", error);
            datosCoche.textContent = error.message;
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
            throw new Error("Error al crear el coche: " + respuesta.status);
        }
        return respuesta.json();
    })
    .then((coche) => {
        console.log("Coche creado:", coche);
        datosCoche.textContent = "Coche creado con ID " + coche.id;
        verTodos();
    })
    .catch((error) => {
        console.log("Error:", error);
        datosCoche.textContent = error.message;
    });
}

// Modificar un coche existente (PUT)
function actualizarCoche() {
    const id = document.getElementById("idcocheactualizar").value;
    const marca = document.getElementById("marcaAct").value;
    const modelo = document.getElementById("modeloAct").value;
    const matricula = document.getElementById("matriculaAct").value;
    const precio = document.getElementById("precioAct").value;

    if (id === "" || marca === "" || modelo === "" || precio === "") {
        alert("Rellena ID, marca, modelo y precio. La matricula puede quedar vacia.");
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
        if (!respuesta.ok) {
            throw new Error("No se pudo actualizar el coche con ID " + id);
        }
        return respuesta.json();
    })
    .then((coche) => {
        console.log("Coche actualizado:", coche);
        datosCoche.textContent = `Coche ID ${coche.id} actualizado: ${coche.marca} ${coche.modelo} (${coche.precio} EUR)`;
    })
    .catch((error) => {
        console.log("Error:", error);
        datosCoche.textContent = error.message;
    });
}

// Eliminar un coche por su ID (DELETE)
function borrarCoche() {
    const id = document.getElementById("idcocheborrar").value;

    fetch(`${cocheURL}/${id}`, {
        method: "DELETE"
    })
    .then((respuesta) => {
        if (!respuesta.ok) {
            throw new Error("No se pudo borrar el coche con ID " + id);
        }
        console.log("Coche borrado:", id);
        datosCoche.textContent = "Coche con ID " + id + " eliminado correctamente.";
    })
    .catch((error) => {
        console.log("Error:", error);
        datosCoche.textContent = error.message;
    });
}
