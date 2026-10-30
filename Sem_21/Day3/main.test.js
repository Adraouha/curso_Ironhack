// Archivo de pruebas con Jest para Day 3
// Importacion de las funciones con CommonJS
const {
    suma,
    calcularDescuento,
    esMayorDeEdad,
    contarCaracteres
} = require("./main.js");

describe("Pruebas de la funcion suma()", () => {
    test("Debe sumar dos numeros positivos correctamente", () => {
        expect(suma(2, 3)).toBe(5);
        expect(suma(10, 20)).toBe(30);
    });

    test("Debe funcionar con numeros negativos", () => {
        expect(suma(-5, -5)).toBe(-10);
        expect(suma(-4, 10)).toBe(6);
    });

    test("Debe manejar el cero correctamente (caso limite)", () => {
        expect(suma(0, 0)).toBe(0);
        expect(suma(5, 0)).toBe(5);
        expect(suma(0, -3)).toBe(-3);
    });
});

describe("Pruebas de Ejercicio 1: calcularDescuento()", () => {
    test("Debe aplicar un 10% de descuento a un precio estandar", () => {
        expect(calcularDescuento(100)).toBe(90);
        expect(calcularDescuento(50)).toBe(45);
        expect(calcularDescuento(200)).toBe(180);
    });

    test("Debe manejar precios con decimales", () => {
        // 25.50 - 2.55 = 22.95
        expect(calcularDescuento(25.50)).toBe(22.95);
    });

    test("Debe devolver 0 si el precio es 0 (caso limite)", () => {
        expect(calcularDescuento(0)).toBe(0);
    });

    test("Debe devolver 0 si el precio es negativo o invalido (caso limite)", () => {
        expect(calcularDescuento(-50)).toBe(0);
        expect(calcularDescuento("precio")).toBe(0);
    });
});

describe("Pruebas de Ejercicio 2: esMayorDeEdad()", () => {
    test("Debe devolver true para personas mayores de 18 anos", () => {
        expect(esMayorDeEdad(19)).toBe(true);
        expect(esMayorDeEdad(25)).toBe(true);
        expect(esMayorDeEdad(65)).toBe(true);
    });

    test("Debe devolver false para personas menores de 18 anos", () => {
        expect(esMayorDeEdad(17)).toBe(false);
        expect(esMayorDeEdad(10)).toBe(false);
        expect(esMayorDeEdad(1)).toBe(false);
    });

    test("Debe devolver true para el caso limite de tener exactamente 18 anos", () => {
        expect(esMayorDeEdad(18)).toBe(true);
    });

    test("Debe devolver false para casos limite de 0 o edades negativas", () => {
        expect(esMayorDeEdad(0)).toBe(false);
        expect(esMayorDeEdad(-5)).toBe(false);
        expect(esMayorDeEdad("18")).toBe(false);
    });
});

describe("Pruebas de Ejercicio 3: contarCaracteres()", () => {
    test("Debe contar los caracteres de una palabra simple", () => {
        expect(contarCaracteres("hola")).toBe(4);
        expect(contarCaracteres("JavaScript")).toBe(10);
    });

    test("Debe incluir los espacios en blanco en el recuento", () => {
        // "Hola mundo" -> 4 letras + 1 espacio + 5 letras = 10
        expect(contarCaracteres("Hola mundo")).toBe(10);
        // " a " -> 1 espacio + 1 letra + 1 espacio = 3
        expect(contarCaracteres(" a ")).toBe(3);
    });

    test("Debe devolver 0 para una frase vacia (caso limite)", () => {
        expect(contarCaracteres("")).toBe(0);
    });

    test("Debe contar correctamente frases con signos y varios espacios", () => {
        expect(contarCaracteres("Hola, que tal?")).toBe(14);
        expect(contarCaracteres("123 456")).toBe(7);
    });

    test("Debe devolver 0 si no se proporciona un string (caso limite)", () => {
        expect(contarCaracteres(null)).toBe(0);
        expect(contarCaracteres(undefined)).toBe(0);
    });
});
