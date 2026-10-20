# Semana 18 - Dia 1: API compleja con ayuda de IA (Empanadas CRUD)

## Conceptos principales

- **Relacion muchos a muchos (`@ManyToMany`) en JPA**: cada empanada puede tener varios ingredientes y cada ingrediente puede formar parte de varias empanadas, generando una tabla intermedia en MySQL (`empanada_ingrediente`).
- **Calculo de logica de negocio en el servidor**: calculo del coste total de cada empanada (precio base mas la suma de sus ingredientes), ganancia por unidad y resumen global de stock y margen en `ResumenController`.
- **Operaciones CRUD completas sobre multiples recursos**: endpoints REST para gestionar tanto `/api/empanadas` (incluyendo ajuste de stock con `PUT /api/empanadas/{id}/stock`) como `/api/ingredientes` y `/api/resumen`.
- **Consumo asincrono con `async/await`**: uso de funciones auxiliares en JavaScript para enviar peticiones `GET`, `POST`, `PUT` y `DELETE` y actualizar la vista previa y el resumen en tiempo real.

## Guia paso a paso para preparar, realizar, probar y ejecutar la tarea

1. Inicia MySQL en el puerto 3306 y crea la base de datos vacia ejecutando: `CREATE DATABASE IF NOT EXISTS empanadas_db;`.
2. Abre el archivo `Sem_18/day_1/stock/src/main/resources/application.properties` y verifica que el nombre de la base de datos es `empanadas_db`, el usuario es `root` y la contrasena coincide con tu servidor MySQL local.
3. Ejecuta el back-end de Spring Boot desde la carpeta `Sem_18/day_1/stock` con el comando `./mvnw spring-boot:run` para que Hibernate cree las tablas automaticamente en el puerto 8080.
4. Opcionalmente, abre `Sem_18/day_1/front-empanadas/testConexion.html` con Live Server para comprobar que el endpoint `/api/resumen` responde adecuadamente.
5. Abre `Sem_18/day_1/front-empanadas/index.html` con Live Server en el puerto 5500.
6. En la seccion inferior "Ingredientes", anade varios ingredientes indicando su nombre y coste por empanada (por ejemplo, Carne, Queso, Cebolla).
7. En la seccion "Nueva empanada", introduce el nombre, precio base, PVP y stock inicial, marca las casillas de los ingredientes deseados y pulsa "Guardar empanada".
8. Comprueba que la lista de empanadas y el cuadro de resumen superior se actualizan mostrando el stock, el coste y la ganancia potencial, y prueba los botones de sumar/restar stock, editar y borrar.
