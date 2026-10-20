# Semana 17 - Dia 5: Aplicacion sencilla con IA

## Conceptos principales

- **Arquitectura en capas de Spring Boot**: organizacion del back-end en `Entidad` (`Premio`), `Repositorio` (`PremioRepositorio`), `Servicio` (`PremioServicio`) y `Controlador` (`PremioControlador`).
- **Metodos HTTP `GET` y `POST`**: uso exclusivo de `@GetMapping` (para listar los premios y obtener uno al azar) y `@PostMapping` (para insertar nuevos premios en MySQL).
- **Esquema SQL y JPA (`ddl-auto=update`)**: generacion automatica de la tabla `premios` en la base de datos vacia `sorteogpt` a partir de las anotaciones `@Entity`, `@Table`, `@Id` y `@GeneratedValue` de Jakarta Persistence.
- **Separacion del front-end y CORS**: interfaz dividida en `index.html`, `style.css` y `main.js`, comunicada con el controlador mediante `@CrossOrigin(origins = "*")`.

## Guia paso a paso para preparar, realizar, probar y ejecutar la tarea

1. Abre MySQL en el puerto 3306 y crea la base de datos vacia ejecutando: `CREATE DATABASE IF NOT EXISTS sorteogpt;`.
2. Revisa el archivo `Sem_17/day_5/backend/src/main/resources/application.properties` y comprueba la URL de conexion a `sorteogpt`, el usuario `root` y la contrasena.
3. Revisa las cuatro capas creadas en `Sem_17/day_5/backend/src/main/java/com/ironhack/sorteogpt`: `Premio.java`, `PremioRepositorio.java`, `PremioServicio.java` y `PremioControlador.java` (con `@CrossOrigin(origins = "*")`).
4. Deten cualquier otra aplicacion que este usando el puerto 8080 y arranca este back-end desde `Sem_17/day_5/backend` con `./mvnw spring-boot:run`.
5. Abre `Sem_17/day_5/frontend/index.html` con Live Server en el puerto 5500.
6. Escribe varios nombres de premios en el campo de texto y pulsa "Anadir premio" para guardarlos en MySQL mediante `POST`.
7. Pulsa "Ver lista de premios" y "Sortear premio aleatorio" para comprobar que los endpoints `GET` devuelven los registros almacenados en la base de datos.
