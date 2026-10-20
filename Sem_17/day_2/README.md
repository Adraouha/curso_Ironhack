# Semana 17 - Dia 2: CRUD con Fetch

## Conceptos principales

- **Operaciones CRUD desde el front-end**: implementacion de funciones separadas en JavaScript para consultar todos los registros (`GET`), buscar un registro por su ID (`GET /{id}`), crear un registro nuevo (`POST`) y eliminar un registro por su ID (`DELETE /{id}`).
- **Lectura de formularios con `.value`**: obtencion del valor escrito por el usuario en los campos `<input>` dentro de cada funcion cuando se pulsa el boton correspondiente.
- **Configuracion de peticiones `fetch`**: envio de cabeceras (`headers: { "Content-Type": "application/json" }`) y cuerpo convertido a texto JSON (`JSON.stringify()`) en las peticiones `POST`.
- **Verificacion con `console.log`**: uso de la consola del navegador para comprobar los datos enviados y las respuestas devueltas por el servidor o por un servicio de pruebas como JSONPlaceholder.

## Guia paso a paso para preparar, realizar, probar y ejecutar la tarea

1. Asegurate de que el servidor MySQL esta activo en el puerto 3306 y que la aplicacion Spring Boot de la carpeta `Jpa_Spring_has_adraou` esta en ejecucion en el puerto 8080.
2. Revisa en `Sem_17/day_2/index.html` los cuatro bloques con sus respectivos inputs y botones asociados mediante `onclick` a `verTodos()`, `verUno()`, `crearCoche()` y `borrarCoche()`.
3. Revisa en `Sem_17/day_2/main.js` como cada funcion lee los valores con `document.getElementById(...).value` en el momento de ejecutarse y realiza la peticion `fetch` con el metodo HTTP adecuado.
4. Abre `Sem_17/day_2/index.html` con Live Server en el puerto 5500 y abre la consola del navegador (F12).
5. Pulsa el boton "Ver todos" para listar todos los coches y comprobar el array en la consola.
6. Escribe un ID existente (por ejemplo `1`) en el apartado de busqueda y pulsa "Ver coche" para mostrar solo ese registro.
7. Rellena los datos de un coche nuevo (marca, modelo, matricula unica, precio e ID de marca) y pulsa "Anadir coche" para probar la peticion `POST`.
8. Introduce el ID del coche recién creado en el apartado de borrado y pulsa "Borrar coche" para eliminar el registro mediante `DELETE`.
