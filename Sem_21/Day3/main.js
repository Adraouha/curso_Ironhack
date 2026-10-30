// Archivo principal con las funciones a evaluar

// Funcion inicial de prueba
function suma(a, b) {
    return a + b;
}

// Ejercicio 1: Calcular un descuento del 10 % y devolver el precio final
function calcularDescuento(precio) {
    if (typeof precio !== "number" || isNaN(precio)) {
        return 0;
    }
    if (precio <= 0) {
        return 0;
    }
    // Descuento del 10%
    const descuento = precio * 0.10;
    const precioFinal = precio - descuento;
    // Redondear a dos decimales si es necesario
    return Number(precioFinal.toFixed(2));
}

// Ejercicio 2: Comprobar si una persona es mayor de 18 anos y devolver true o false
function esMayorDeEdad(edad) {
    if (typeof edad !== "number" || isNaN(edad)) {
        return false;
    }
    return edad >= 18;
}

// Ejercicio 3: Contar los caracteres de una frase, incluyendo los espacios en blanco
function contarCaracteres(frase) {
    if (typeof frase !== "string") {
        return 0;
    }
    return frase.length;
}

// Exportacion de funciones utilizando el sistema CommonJS
module.exports = {
    suma,
    calcularDescuento,
    esMayorDeEdad,
    contarCaracteres
};
