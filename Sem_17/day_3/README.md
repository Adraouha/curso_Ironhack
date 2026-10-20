# Semana 17 - Dia 3: Modificar coches con PUT

## Conceptos principales

- **Peticion HTTP `PUT`**: metodo estandar en una API REST para modificar los datos de un recurso existente identificado por su ID (`/coches/{id}`).
- **Reutilizacion de `save()` en Spring Data JPA**: en la capa de servicio (`CocheServiceImpl`), primero se comprueba que el coche existe mediante `findById(id)`. Si existe, se actualizan sus atributos con los `setters` y se vuelve a llamar a `cocheRepository.save(cocheExistente)` para hacer el `UPDATE` en MySQL.
- **Conservacion del campo unico (`matricula`)**: como la columna `matricula` tiene la restriccion `UNIQUE`, si el usuario deja vacio el campo de matricula al editar, el servicio conserva la matricula original del coche para evitar errores de duplicidad.
- **Validacion en el front-end**: comprobacion en JavaScript de que el ID, la marca, el modelo y el precio no esten vacios antes de enviar la peticion `PUT`.

## Guia paso a paso para preparar, realizar, probar y ejecutar la tarea

1. Inicia MySQL en el puerto 3306 y ejecuta el proyecto Spring Boot ubicado en `Jpa_Spring_has_adraou` en el puerto 8080.
2. En el back-end (`CocheServiceImpl.java` y `CocheController.java`), verifica el metodo `update(Long id, Coche cocheDetails)` y el endpoint `@PutMapping("/{id}")`.
3. Prueba primero el endpoint desde Postman o Bruno enviando una peticion `PUT` a `http://localhost:8080/coches/1` con un cuerpo JSON que modifique el modelo y el precio dejando `"matricula": ""`.
4. Abre `Sem_17/day_3/index.html` con Live Server en el puerto 5500.
5. Pulsa "Ver todos los coches" para consultar los IDs disponibles en la base de datos.
6. En la seccion "Actualizar un coche por su ID (PUT)", introduce un ID existente (por ejemplo `1`), una marca, un modelo y un precio nuevo, dejando la matricula en blanco.
7. Pulsa "Actualizar coche" y comprueba tanto en pantalla como en la consola del navegador (`console.log`) que el registro se ha actualizado conservando su matricula original.
