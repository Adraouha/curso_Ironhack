# Semana 18 - Dia 2: Mejorar el chatbot Eliza

## Conceptos principales

- **Expresiones regulares (`Pattern` y `Matcher` en Java)**: deteccion de palabras clave en las frases del usuario (saludos, despedidas, `necesito`, `quiero`, `creo`, `si`, `no`, `no se`) para elegir una respuesta adecuada y reflejar pronombres (`yo` a `tu`, `mi` a `tu`).
- **Normalizacion de texto (`Normalizer`)**: transformacion de la entrada del usuario a minusculas y eliminacion de tildes antes de evaluar las reglas para que funcione igual si el usuario escribe con o sin acentos.
- **Control de respuestas repetidas**: almacenamiento de la ultima respuesta enviada por el bot para elegir otra distinta cuando existen varias opciones disponibles.
- **Validacion de mensajes vacios o muy cortos**: comprobacion de la longitud del texto antes de aplicar las reglas para pedir al usuario que se explique mejor.
- **Estado de carga en el front-end («Pensando...»)**: creacion temporal de un mensaje en el chat antes de mostrar la respuesta definitiva del servidor.

## Guia paso a paso para preparar, realizar, probar y ejecutar la tarea

1. Inicia MySQL en el puerto 3306 y crea la base de datos vacia ejecutando: `CREATE DATABASE IF NOT EXISTS eliza;`.
2. Revisa el archivo `Sem_18/day_2/eliza/src/main/resources/application.properties` con el nombre de la base de datos `eliza`, el usuario `root` y la contrasena configurada.
3. Revisa las mejoras implementadas en `Sem_18/day_2/eliza/src/main/java/com/ejemplo/eliza/service/ElizaService.java` (normalizacion sin tildes ni mayusculas, nuevas reglas, validacion de mensajes cortos o vacios y control para no repetir respuestas seguidas).
4. Revisa los archivos del front-end separados en `Sem_18/day_2/eliza/src/main/resources/static/` (`index.html`, `style.css` y `main.js`).
5. Inicia el servidor Spring Boot desde `Sem_18/day_2/eliza` con el comando `./mvnw spring-boot:run`.
6. Abre `http://localhost:8080` en el navegador (o abre `static/index.html` con Live Server en el puerto 5500).
7. Prueba a enviar saludos (`Hola`, `Buenos dias`), frases con `necesito descansar`, `quiero aprobar`, `creo que si`, `no se`, mensajes de una sola letra o vacios, y despedidas (`Adios`), comprobando que aparece el aviso «Pensando...» antes de cada respuesta y que Eliza no repite la misma frase dos veces seguidas.
