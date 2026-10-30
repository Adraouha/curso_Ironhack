// Archivo de utilidades numericas para la practica de Jest Coverage

// 1. Comprueba si un numero es par usando el operador modulo %
function esPar(numero) {
    if (typeof numero !== "number" || isNaN(numero)) {
        return false;
    }
    return numero % 2 === 0;
}

// 2. Obtiene el numero maximo de un array utilizando metodos de Math
function obtenerMaximo(arrayNumeros) {
    if (!Array.isArray(arrayNumeros) || arrayNumeros.length === 0) {
        return null;
    }
    return Math.max(...arrayNumeros);
}

// 3. Calcula la media aritmetica de un array de numeros
function calcularMedia(arrayNumeros) {
    if (!Array.isArray(arrayNumeros) || arrayNumeros.length === 0) {
        return 0;
    }
    const sumaTotal = arrayNumeros.reduce((acumulado, actual) => acumulado + actual, 0);
    const media = sumaTotal / arrayNumeros.length;
    return Number(media.toFixed(2));
}

// 4. Ordena los numeros de menor a mayor
// Nota destacada en la unidad:
// arrayNumeros.sort((a, b) => a - b); modifica el array original en memoria.
// original.toSorted((a, b) => a - b); crea un nuevo array sin modificar el original.
function ordenarMenorMayor(arrayNumeros) {
    if (!Array.isArray(arrayNumeros)) {
        return [];
    }
    // toSorted() crea un nuevo array ordenado manteniendo intacto el original
    return arrayNumeros.toSorted((a, b) => a - b);
}

// 5. Exportacion multiple con CommonJS
module.exports = {
    esPar,
    obtenerMaximo,
    calcularMedia,
    ordenarMenorMayor
};
