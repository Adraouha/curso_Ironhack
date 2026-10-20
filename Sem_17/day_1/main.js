// Elementos del DOM donde mostraremos los datos
const unCoche = document.getElementById("unCoche");
const datosCoche = document.getElementById("datosCoche");

// URL del endpoint local de Spring Boot
const cocheURL = "http://localhost:8080/coches";

// 1 y 2. Obtener un coche concreto (el primero de la lista o por ID) y mostrarlo con textContent
fetch(`${cocheURL}/1`)
    .then((respuesta) => respuesta.json())
    .then((coche) => {
        console.log("Un coche concreto:", coche);
        unCoche.textContent = `${coche.marca} ${coche.modelo} - Matricula: ${coche.matricula} - Precio: ${coche.precio} EUR`;
    })
    .catch((error) => {
        console.log("Error al cargar un coche:", error);
        unCoche.textContent = "No se pudo cargar el coche con ID 1.";
    });

// 1 y 3. Consultar la lista completa de coches y recorrerla con forEach
fetch(cocheURL)
    .then((respuesta) => respuesta.json())
    .then((data) => {
        // Comprobar la conexion en la consola del navegador
        console.log("Todos los coches:", data);

        datosCoche.innerHTML = "";

        // Recorrer la lista de coches y mostrar los datos principales
        data.forEach((coche) => {
            datosCoche.innerHTML += `
                <div class="coche-item">
                    <h3>${coche.marca} ${coche.modelo}</h3>
                    <p>Matricula: ${coche.matricula}</p>
                    <p>Precio: ${coche.precio} EUR</p>
                </div>
            `;
        });
    })
    .catch((error) => {
        console.log("Error al conectar con el servidor:", error);
        datosCoche.textContent = "Error al conectar con la API en http://localhost:8080/coches";
    });
