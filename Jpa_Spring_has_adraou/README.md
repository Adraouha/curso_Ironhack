# Proyecto Base Spring Boot y JPA - Concesionario de Coches

Este directorio contiene el proyecto Spring Boot de gestion de coches y marcas conectado a MySQL, utilizado como base para los ejercicios de la semana 17.

## Conceptos principales

- **Spring Data JPA**: mapeo de entidades (`Coche`, `Marca`, `Usuario`) a tablas de MySQL mediante repositorios que heredan de `JpaRepository`.
- **Controladores REST**: exposicion de endpoints HTTP (`GET`, `POST`, `PUT`, `DELETE`) en `/api/coches` y `/coches`.
- **CORS (`@CrossOrigin`)**: permite que el front-end ejecutado en Live Server (puerto 5500) pueda realizar peticiones al back-end en el puerto 8080.
- **Spring Security y BCrypt**: encriptacion de contrasenas mediante `BCryptPasswordEncoder` e inicio de sesion en `/login`.

## Pasos para preparar y ejecutar el proyecto

1. Inicia el servidor MySQL en el puerto 3306.
2. Crea la base de datos vacia si no existe ejecutando en MySQL: `CREATE DATABASE IF NOT EXISTS conspring1;`.
3. Revisa el archivo `src/main/resources/application.properties` y comprueba el usuario (`root`) y la contrasena configurada para tu entorno local.
4. Ejecuta la aplicacion Spring Boot desde el directorio `Jpa_Spring_has_adraou` con el comando `./mvnw spring-boot:run`.
5. Al iniciar por primera vez, la aplicacion carga automaticamente las marcas de ejemplo, cinco coches iniciales y el usuario de prueba `admin` con contrasena `1234`.
6. Abre cualquiera de los ejercicios de la carpeta `Sem_17` o el archivo `frontend/index.html` con Live Server en el puerto 5500 para interactuar con la API.
