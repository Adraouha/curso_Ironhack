const datosCoche = document.getElementById("datosCoche");
const inputId = document.getElementById("idcoche");
const cocheURL = "http://localhost:8080/coches";

// Iniciar sesion
function iniciarSesion() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (username === "" || password === "") {
        document.getElementById("mensajeLogin").textContent = "Escribe usuario y contrasena";
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
        console.log("Respuesta login:", data);
        document.getElementById("mensajeLogin").textContent = "";
        document.getElementById("login").style.display = "none";
        document.getElementById("app").style.display = "block";
    })
    .catch((error) => {
        document.getElementById("mensajeLogin").textContent = error.message;
    });
}

// Cerrar sesion
function cerrarSesion() {
    fetch("http://localhost:8080/logout", {
        method: "POST",
        credentials: "include"
    })
    .then(() => {
        document.getElementById("app").style.display = "none";
        document.getElementById("login").style.display = "block";
        document.getElementById("password").value = "";
    })
    .catch((error) => {
        console.error(error);
    });
}

// Buscar con Enter
inputId.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        verUno();
    }
});

// Ver todos los coches
function verTodos() {
    fetch(cocheURL)
        .then((respuesta) => {
            if (!respuesta.ok) {
                throw new Error("No autorizado");
            }
            return respuesta.json();
        })
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
        .catch((error) => {
            console.log(error);
        });
}

// Ver un coche por ID
function verUno() {
    const id = inputId.value;

    fetch(`${cocheURL}/${id}`)
        .then((respuesta) => {
            if (!respuesta.ok) {
                throw new Error(`No hemos encontrado un coche con el ID ${id}`);
            }
            return respuesta.json();
        })
        .then((coche) => {
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

// Crear coche
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
        alert("Coche anadido correctamente");
    })
    .catch((error) => {
        console.error(error);
    });
}

// Actualizar coche
function actualizarCoche() {
    const id = document.getElementById("idcocheactualizar").value;
    const marca = document.getElementById("marcaAct").value;
    const modelo = document.getElementById("modeloAct").value;
    const matricula = document.getElementById("matriculaAct").value;
    const precio = document.getElementById("precioAct").value;

    if (id === "" || marca === "" || modelo === "" || precio === "") {
        alert("Rellena todos los campos menos la matricula");
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
            datosCoche.innerHTML = `<p>Esa matricula ya existe o falta algun dato</p>`;
            return null;
        } else if (!respuesta.ok) {
            throw new Error(`Error HTTP: ${respuesta.status}`);
        }
        return respuesta.json();
    })
    .then((coche) => {
        if (coche) {
            datosCoche.innerHTML = `
                <p>Coche con ID ${id} actualizado: ${coche.marca} ${coche.modelo}, ${coche.precio} EUR</p>
            `;
        }
    })
    .catch((error) => {
        console.error(error);
        datosCoche.innerHTML = `<p>${error.message}</p>`;
    });
}

// Borrar coche
function borrarCoche() {
    const id = document.getElementById("idcocheborrar").value;

    fetch(`${cocheURL}/${id}`, {
        method: "DELETE"
    })
    .then((respuesta) => {
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
