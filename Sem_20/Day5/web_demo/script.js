// Codigo JavaScript sencillo para comprobar la interactividad de la web

// Esperamos a que cargue el documento
document.addEventListener("DOMContentLoaded", function () {
    let boton = document.getElementById("btn-comprobar");
    let mensaje = document.getElementById("mensaje-estado");

    // Al hacer clic en el boton, actualizamos el texto
    boton.addEventListener("click", function () {
        mensaje.textContent = "El archivo JavaScript funciona correctamente. La web esta lista para publicarse en la carpeta htdocs.";
        mensaje.style.backgroundColor = "#e8f4fd";
        mensaje.style.borderColor = "#b6e0fe";
        mensaje.style.color = "#004085";
    });
});
