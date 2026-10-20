# Semana 18 - Dia 4: Crear elementos con createElement y appendChild

## Conceptos principales

- **`document.createElement(etiqueta)`**: metodo del DOM que crea en memoria un nodo HTML nuevo (`div`, `img`, `p`, `tr`, `td`) sin necesidad de concatenar cadenas con `innerHTML`.
- **`elemento.classList.add(clase)`**: asigna una clase de CSS al elemento recien creado desde JavaScript para darle estilo de tarjeta, imagen o texto.
- **`contenedor.appendChild(hijo)`**: inserta un nodo hijo dentro de un elemento padre, permitiendo construir una tarjeta completa o una fila de tabla y agregarla al documento.
- **Recorrido de resultados con `for...of` y paginacion**: iteracion sobre el array `data.results` devuelto por la API de Rick and Morty y uso del parametro `?page=` para avanzar o retroceder de pagina.

## Guia paso a paso para preparar, realizar, probar y ejecutar la tarea

1. Revisa en `Sem_18/day_4/index.html` el contenedor `#contenedor` para las tarjetas y el cuerpo de tabla `#tablaDOM` para las filas.
2. Revisa en `Sem_18/day_4/main.js` la funcion `crearTarjetaPersonaje(perso)`, donde se crea el `div` con `createElement("div")`, se le aplica la clase `"card"` con `classList.add()`, se crean la imagen y los parrafos y se unen con `appendChild()`.
3. Abre `Sem_18/day_4/index.html` con Live Server en el puerto 5500.
4. Al cargar la pagina se muestra automaticamente un unico registro (el personaje con ID 1). Prueba a cambiar el numero en el campo de entrada y pulsa "Mostrar personaje" para consultar otro registro individual.
5. Pulsa el boton "Mostrar pagina de personajes" para recorrer el array completo de la API y generar todas las tarjetas y filas de la tabla dinamicamente.
6. Utiliza los botones "Pagina anterior" y "Pagina siguiente" para navegar entre las distintas paginas de la API y verifica los datos en la consola del navegador (`console.log`).
