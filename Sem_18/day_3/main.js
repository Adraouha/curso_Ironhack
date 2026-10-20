// Elementos del DOM para mostrar los datos en texto sencillo
const inputCiudad = document.getElementById("inputCiudad");
const btnConsultar = document.getElementById("btnConsultar");
const ciudad = document.getElementById("ciudad");
const descripcion = document.getElementById("descripcion");
const temperatura = document.querySelector("#temperatura");
const sensacion = document.querySelector("#sensacion");
const humedad = document.querySelector("#humedad");
const viento = document.querySelector("#viento");

btnConsultar.addEventListener("click", consultarTiempo);

function consultarTiempo() {
    const nombreCiudad = inputCiudad.value.trim() || "Barcelona";

    // Leemos la API key desde config.js (que no se sube a GitHub)
    const claveApi = (typeof API_KEY !== "undefined" && API_KEY !== "" && API_KEY !== "TU_API_KEY_AQUI")
        ? API_KEY
        : "";

    // URL de OpenWeatherMap con parametros de ubicacion (q), unidades metricas (units=metric) e idioma espanol (lang=es)
    const urlTiempo = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(nombreCiudad)},es&appid=${claveApi}&units=metric&lang=es`;

    if (claveApi !== "") {
        fetch(urlTiempo)
            .then((respuesta) => {
                if (!respuesta.ok) {
                    throw new Error("Error HTTP: " + respuesta.status);
                }
                return respuesta.json();
            })
            .then((data) => {
                console.log("Datos de OpenWeatherMap:", data);
                ciudad.innerText = data.name;
                descripcion.innerText = data.weather[0].description;
                temperatura.innerText = data.main.temp + " C";
                sensacion.innerText = data.main.feels_like + " C";
                humedad.innerText = data.main.humidity + " %";
                viento.innerText = data.wind.speed + " m/s";
            })
            .catch((error) => {
                console.log("Aviso con OpenWeatherMap:", error);
                consultarAlternativaSinClave(nombreCiudad);
            });
    } else {
        console.log("API_KEY vacia en config.js. Consultando API meteorologica gratuita de respaldo...");
        consultarAlternativaSinClave(nombreCiudad);
    }
}

// Consulta meteorologica gratuita en caso de no haber configurado todavia config.js
function consultarAlternativaSinClave(nombreCiudad) {
    const coords = obtenerCoordenadasCiudad(nombreCiudad);
    const urlAlternativa = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code&timezone=auto`;

    fetch(urlAlternativa)
        .then((respuesta) => respuesta.json())
        .then((data) => {
            console.log("Datos meteorologicos recibidos:", data);
            ciudad.innerText = coords.nombre;
            descripcion.innerText = traducirCodigoCielo(data.current.weather_code);
            temperatura.innerText = data.current.temperature_2m + " C";
            sensacion.innerText = data.current.apparent_temperature + " C";
            humedad.innerText = data.current.relative_humidity_2m + " %";
            viento.innerText = data.current.wind_speed_10m + " km/h";
        })
        .catch((error) => {
            console.log("Error al obtener el tiempo:", error);
            ciudad.innerText = nombreCiudad;
            descripcion.innerText = "No se pudieron obtener los datos meteorologicos";
        });
}

function obtenerCoordenadasCiudad(nombre) {
    const n = nombre.toLowerCase();
    if (n.includes("madrid")) return { nombre: "Madrid", lat: 40.4168, lon: -3.7038 };
    if (n.includes("valencia")) return { nombre: "Valencia", lat: 39.4699, lon: -0.3763 };
    if (n.includes("sevilla")) return { nombre: "Sevilla", lat: 37.3891, lon: -5.9845 };
    if (n.includes("bilbao")) return { nombre: "Bilbao", lat: 43.263, lon: -2.935 };
    return { nombre: nombre, lat: 41.3888, lon: 2.159 };
}

function traducirCodigoCielo(codigo) {
    if (codigo === 0) return "Cielo despejado";
    if (codigo === 1 || codigo === 2) return "Parcialmente nublado";
    if (codigo === 3) return "Cielo cubierto";
    if (codigo >= 45 && codigo <= 48) return "Niebla";
    if (codigo >= 51 && codigo <= 67) return "Lluvia ligera";
    if (codigo >= 71 && codigo <= 77) return "Nieve";
    if (codigo >= 80 && codigo <= 82) return "Chubascos";
    if (codigo >= 95) return "Tormenta";
    return "Nubes dispersas";
}

// Cargar el tiempo al abrir la pagina
consultarTiempo();
