# Semana 19 - Dia 4: Documentacion con JSDoc

## Conceptos principales

- **Bloques de comentarios JSDoc (`/** ... */`)**: comentarios especiales colocados justo antes de un archivo, variable o funcion que permiten describir el codigo y generar documentacion en HTML automaticamente.
- **Etiquetas de metadatos generales**: `@author` (autor del codigo), `@since` (version inicial), `@version` (version actual), `@description` (resumen del archivo) y `{@link url}` (enlaces a recursos externos).
- **Etiqueta de tipo (`@type`)**: indica el tipo de dato de una variable o constante (`{string}`, `{number}`, `{boolean}`, `{Array<string>}`).
- **Etiquetas para funciones (`@param` y `@returns`)**: documentan los parametros de entrada con su tipo y nombre (`@param {number} precioBase`) y el valor devuelto por la funcion (`@returns {number}`).
- **Archivo de configuracion `jsdoc.json`**: permite indicar a JSDoc la carpeta de salida (`destination`), la carpeta de tutoriales (`tutorials`) y la inclusion del `README.md`.

## Guia paso a paso para preparar, realizar, probar y ejecutar la tarea

1. Instala Node.js en el equipo y luego instala JSDoc de forma global ejecutando en la terminal: `npm install -g jsdoc`.
2. Revisa el archivo `Sem_19/day_4/variables.js` (sin funciones), que incluye `@author`, `@since`, `@version`, `@link` y `@type` en cada variable.
3. Revisa el archivo `Sem_19/day_4/funciones.js` (con varias funciones), que anade `@param` y `@returns` en cada funcion.
4. Revisa el archivo de configuracion `Sem_19/day_4/jsdoc.json` y el tutorial `Sem_19/day_4/tuto/tutorial_coches.md`.
5. Para generar la documentacion HTML desde la terminal situada en `Sem_19/day_4`, ejecuta el comando: `jsdoc -c jsdoc.json`.
6. Abre `Sem_19/day_4/docs/index.html` con Live Server o directamente en el navegador para navegar por la portada (generada desde el README), la seccion `Global` con todas las variables y funciones, y el tutorial `tutorial_coches`.
