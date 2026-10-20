# Semana 18 - Dia 3: API key y datos meteorologicos

## Conceptos principales

- **Autenticacion mediante API Key**: clave personal (`appid`) que identifica al desarrollador ante servicios externos como OpenWeatherMap para autorizar las consultas HTTP.
- **Parametros de consulta (`Query Params`) en la URL**: envio de opciones en la direccion tras el signo `?` separadas por `&`, como `q=barcelona,es` (ubicacion), `units=metric` (grados Celsius) y `lang=es` (descripcion en espanol).
- **Proteccion de credenciales con `.gitignore`**: la clave privada se guarda en un archivo local `config.js` incluido en `.gitignore` para que no se suba al repositorio de GitHub, dejando `config.example.js` como plantilla de referencia.
- **Representacion en texto plano**: lectura de propiedades del objeto JSON (`data.name`, `data.weather[0].description`, `data.main.temp`, `data.main.humidity`) y visualizacion mediante `innerText` sin iconos ni emojis.

## Guia paso a paso para preparar, realizar, probar y ejecutar la tarea

1. Registrate en OpenWeatherMap y copia tu clave personal desde la seccion "My API keys".
2. Prueba primero la peticion en Postman o Thunder Client realizando un `GET` a `https://api.openweathermap.org/data/2.5/weather?q=barcelona,es&appid=TU_API_KEY&units=metric&lang=es`.
3. En la carpeta `Sem_18/day_3`, copia el archivo `config.example.js` con el nombre `config.js` y pega tu clave dentro de la constante `API_KEY`.
4. Comprueba que el archivo `.gitignore` incluye `config.js` para evitar publicar tu API key en GitHub.
5. Revisa `Sem_18/day_3/index.html`, `style.css` y `main.js` para ver como se realiza el `fetch` y se asignan los datos a los contenedores HTML con `innerText`.
6. Abre `Sem_18/day_3/index.html` con Live Server en el puerto 5500.
7. Escribe el nombre de una ciudad (por ejemplo `Barcelona` o `Madrid`), pulsa "Consultar tiempo" y verifica en la pagina y en la consola (`console.log`) la ciudad, el estado del cielo en texto, la temperatura, la sensacion termica, la humedad y el viento.
