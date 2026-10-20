# Semana 17 - Dia 4: Login de usuario con BCrypt

## Conceptos principales

- **Spring Security y BCrypt (`BCryptPasswordEncoder`)**: algoritmo de hash seguro para almacenar contrasenas encriptadas en la tabla `usuario` de MySQL en lugar de guardarlas en texto plano.
- **Entidad y Repositorio de Usuario**: clase `Usuario` (`id`, `username`, `password`) y metodo `findByUsername(String username)` en `UsuarioRepository` para que Spring Security localice las credenciales durante el inicio de sesion.
- **Configuracion de `SecurityFilterChain`**: definicion del endpoint `POST /login` para autenticar usuarios y `POST /logout` para cerrar la sesion, devolviendo respuestas en formato JSON.
- **Envio de credenciales con `URLSearchParams` y `credentials: "include"`**: envio del formulario de login desde JavaScript con cabecera `application/x-www-form-urlencoded` y gestion de visibilidad entre el bloque `#login` y el bloque `#app`.

## Guia paso a paso para preparar, realizar, probar y ejecutar la tarea

1. Asegurate de que MySQL esta corriendo en el puerto 3306 con la base de datos `conspring1`.
2. Revisa en el proyecto `Jpa_Spring_has_adraou` la dependencia `spring-boot-starter-security` en `pom.xml` y las clases `Usuario`, `UsuarioRepository`, `UsuarioService`, `UsuarioController`, `SecurityConfig` y `WebConfig`.
3. Inicia el servidor Spring Boot en el puerto 8080. Al arrancar, se crea automaticamente un usuario de prueba con `username` igual a `admin` y `password` igual a `1234` (encriptada con BCrypt).
4. Para registrar otro usuario desde Postman o un cliente HTTP, envia una peticion `POST` a `http://localhost:8080/usuarios` con un JSON como `{"username": "alumno", "password": "abcd"}`.
5. Prueba el inicio de sesion en Postman enviando una peticion `POST` a `http://localhost:8080/login` con cuerpo `x-www-form-urlencoded` indicando `username=admin` y `password=1234`.
6. Abre el archivo `Sem_17/day_4/index.html` con Live Server en el puerto 5500.
7. Introduce el usuario `admin` y la contrasena `1234` y pulsa "Entrar". Verifica que se oculta el formulario de login y se muestra el panel CRUD de coches.
8. Realiza una consulta de coches y finalmente pulsa "Cerrar sesion" para comprobar que se vuelve a mostrar la pantalla de acceso.
