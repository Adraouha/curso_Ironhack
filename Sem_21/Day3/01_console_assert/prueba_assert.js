// Demostracion practica de console.assert()
// console.assert(condicion, mensajeDeError)
// - Si la condicion es VERDADERA (true), la consola no muestra nada (el test pasa).
// - Si la condicion es FALSA (false), la consola muestra un error Assertion failed.

// 1. Funcion suma de ejemplo
function suma(a, b) {
    return a + b;
}

// Comprobaciones con console.assert
console.log("Iniciando pruebas con console.assert()...");

// Pruebas que son verdaderas (no imprimen nada, pasan con exito)
console.assert(suma(2, 3) === 5, "Fallo: 2 + 3 deberia ser 5");
console.assert(suma(-1, 1) === 0, "Fallo: -1 + 1 deberia ser 0");
console.assert(suma(0, 0) === 0, "Fallo: 0 + 0 deberia ser 0");

// Prueba provocada deliberadamente para observar un fallo en consola
// console.assert(suma(2, 2) === 5, "Fallo provocado: 2 + 2 no es 5");

// 2. Funciones de los ejercicios
function calcularDescuento(precio) {
    if (precio <= 0) return 0;
    return precio - (precio * 0.10);
}

function esMayorDeEdad(edad) {
    return edad >= 18;
}

function contarCaracteres(frase) {
    if (typeof frase !== "string") return 0;
    return frase.length;
}

// Pruebas de las funciones
console.assert(calcularDescuento(100) === 90, "Fallo: el 10% de 100 deja el precio en 90");
console.assert(calcularDescuento(0) === 0, "Fallo: precio 0 con descuento deberia ser 0");

console.assert(esMayorDeEdad(20) === true, "Fallo: 20 anos debe devolver true");
console.assert(esMayorDeEdad(18) === true, "Fallo: 18 anos exactos debe devolver true");
console.assert(esMayorDeEdad(17) === false, "Fallo: 17 anos debe devolver false");

console.assert(contarCaracteres("Hola") === 4, "Fallo: 'Hola' tiene 4 caracteres");
console.assert(contarCaracteres("Hola mundo") === 10, "Fallo: 'Hola mundo' tiene 10 caracteres con el espacio");
console.assert(contarCaracteres("") === 0, "Fallo: frase vacia debe tener 0 caracteres");

console.log("Todas las pruebas correctas de console.assert() han pasado sin emitir errores.");
