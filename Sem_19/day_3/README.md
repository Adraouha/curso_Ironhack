# Semana 19 - Dia 3: Ciclo de vida del software (SDLC)

## Conceptos principales

El Ciclo de Vida del Desarrollo de Software (SDLC, por sus siglas en ingles) es el proceso ordenado que se sigue para construir una aplicacion desde la idea inicial hasta su puesta en marcha y mantenimiento.

### Resumen de las 6 fases y ejemplos del proyecto del curso

1. **Planificacion**:
   - **Explicacion**: Consiste en organizar las tareas del proyecto, estimar el tiempo necesario y elegir las herramientas que se van a utilizar.
   - **Ejemplo del curso**: Planificar la creacion de la aplicacion web del concesionario de coches utilizando MySQL, Spring Boot con JPA y un front-end con HTML, CSS y JavaScript.

2. **Analisis de requisitos**:
   - **Explicacion**: Se definen las funciones concretas que debe tener el programa y los datos que se necesitan almacenar.
   - **Ejemplo del curso**: Definir que la tabla `coche` tendra id, marca, modelo, matricula unica y precio, relacionada con la tabla `marca`, y que la web permitira hacer operaciones CRUD e iniciar sesion con contrasena encriptada.

3. **Codificacion**:
   - **Explicacion**: Es la fase en la que se escribe el codigo fuente del back-end y del front-end siguiendo los requisitos acordados.
   - **Ejemplo del curso**: Crear las clases Java (`Coche`, `CocheRepository`, `CocheServiceImpl`, `CocheController`) y programar en `main.js` las llamadas `fetch` a `http://localhost:8080/coches`.

4. **Documentacion**:
   - **Explicacion**: Consiste en describir el funcionamiento del codigo mediante comentarios y manuales para facilitar su uso y mantenimiento.
   - **Ejemplo del curso**: Redactar el archivo `README.md` con los pasos de configuracion de `application.properties` y documentar los archivos JavaScript con bloques JSDoc.

5. **Pruebas**:
   - **Explicacion**: Se verifica que cada funcion responde bien ante datos validos e invalidos y se corrigen los fallos detectados.
   - **Ejemplo del curso**: Comprobar los endpoints en Postman o Bruno (verificando codigos 200, 201 y 404), ejecutar los tests de `CocheCrudTests` y revisar la consola del navegador con `console.log`.

6. **Despliegue**:
   - **Explicacion**: Es la publicacion y entrega de la aplicacion probada para que pueda ser ejecutada o revisada en el entorno final.
   - **Ejemplo del curso**: Subir el proyecto completo con sus carpetas organizadas por semanas al repositorio privado de GitHub o alojar el servidor en produccion.

## Guia paso a paso para preparar, realizar, probar y ejecutar la tarea

1. Repasa las seis etapas del ciclo de vida del desarrollo de software (Planificacion, Analisis de requisitos, Codificacion, Documentacion, Pruebas y Despliegue).
2. Relaciona cada fase con una accion real que hayamos realizado al construir el proyecto `Jpa_Spring_has_adraou` de gestion de coches.
3. Revisa el resumen redactado en este archivo `README.md` y en la pagina `Sem_19/day_3/index.html`.
4. Abre `Sem_19/day_3/index.html` en el navegador o con Live Server en el puerto 5500 para visualizar la presentacion limpia de las seis fases con su explicacion y ejemplo.
