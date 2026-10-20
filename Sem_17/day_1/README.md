# Semana 17 - Dia 1: Mostrar coches con Fetch

## Conceptos principales

- **Fetch API**: funcion nativa de JavaScript (`fetch(url)`) que permite realizar peticiones HTTP asincronas desde el navegador hacia un servidor back-end.
- **Promesas (`.then()` y `.catch()`)**: permiten gestionar la respuesta del servidor cuando llega, convertir el cuerpo a formato JSON (`respuesta.json()`) y capturar posibles errores de red.
- **Manipulacion del DOM (`textContent`, `innerText`, `innerHTML`)**: propiedades de los elementos HTML que sirven para escribir texto plano o insertar etiquetas HTML con los datos recibidos.
- **Metodo `forEach()`**: recorre cada objeto dentro del array de coches devuelto por la API para pintarlos todos en pantalla.
- **CORS (`@CrossOrigin`)**: anotacion en el controlador de Spring Boot (`@CrossOrigin(origins = "*")`) que autoriza las peticiones realizadas desde un origen distinto, como Live Server en el puerto 5500 hacia el puerto 8080.

## Guia paso a paso para preparar, realizar, probar y ejecutar la tarea

1. Inicia el servicio de base de datos MySQL en el puerto 3306 y comprueba que existe la base de datos `conspring1`.
2. En el proyecto Spring Boot ubicado en la carpeta `Jpa_Spring_has_adraou`, revisa que el controlador `CocheController.java` incluye la anotacion `@CrossOrigin(origins = "*")`.
3. Inicia la aplicacion Spring Boot en el puerto 8080 ejecutando `./mvnw spring-boot:run` desde la carpeta `Jpa_Spring_has_adraou`.
4. Comprueba en el navegador o con un cliente HTTP que la direccion `http://localhost:8080/coches` devuelve el listado de coches en formato JSON.
5. En esta carpeta (`Sem_17/day_1`), revisa los tres archivos separados del front-end: `index.html`, `style.css` y `main.js`.
6. Abre el archivo `Sem_17/day_1/index.html` utilizando la extension Live Server en el puerto 5500 (`http://127.0.0.1:5500/Sem_17/day_1/index.html`).
7. Abre las herramientas de desarrollador del navegador (tecla F12, pestana Consola) y verifica los mensajes de `console.log` con el coche individual y con el array completo de coches.
8. Comprueba en la pagina que se muestran tanto los datos del coche concreto como el listado completo con el estilo CSS basico aplicado.
