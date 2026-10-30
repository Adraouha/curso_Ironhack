// Archivo de pruebas para utilidades.js utilizando Jest y diversos matchers
// Importacion multiple con CommonJS desde la carpeta js/
const {
    esPar,
    obtenerMaximo,
    calcularMedia,
    ordenarMenorMayor
} = require("../js/utilidades.js");

describe("Pruebas de la funcion esPar()", () => {
    test("Debe devolver true usando toBe() para numeros pares positivos y cero", () => {
        expect(esPar(2)).toBe(true);
        expect(esPar(4)).toBe(true);
        expect(esPar(0)).toBe(true);
        expect(esPar(100)).toBe(true);
    });

    test("Debe devolver true usando toBe() para numeros pares negativos", () => {
        expect(esPar(-2)).toBe(true);
        expect(esPar(-8)).toBe(true);
    });

    test("Debe devolver falsy usando toBeFalsy() para numeros impares", () => {
        expect(esPar(1)).toBeFalsy();
        expect(esPar(3)).toBeFalsy();
        expect(esPar(17)).toBeFalsy();
        expect(esPar(-5)).toBeFalsy();
    });

    test("Debe devolver falsy usando toBeFalsy() para entradas invalidas o no numericas", () => {
        expect(esPar("4")).toBeFalsy();
        expect(esPar(null)).toBeFalsy();
        expect(esPar(NaN)).toBeFalsy();
    });
});

describe("Pruebas de la funcion obtenerMaximo()", () => {
    test("Debe obtener el numero maximo con toBe()", () => {
        const numeros = [3, 9, 2, 15, 6];
        expect(obtenerMaximo(numeros)).toBe(15);
    });

    test("Debe usar toBeGreaterThan() para verificar que el maximo es mayor que otros elementos", () => {
        const numeros = [10, 20, 50, 5];
        const maximo = obtenerMaximo(numeros);

        expect(maximo).toBe(50);
        expect(maximo).toBeGreaterThan(10);
        expect(maximo).toBeGreaterThan(20);
        expect(maximo).toBeGreaterThan(5);
        expect(maximo).toBeGreaterThan(0);
    });

    test("Debe funcionar correctamente con arrays de numeros negativos", () => {
        const negativos = [-20, -5, -12, -2];
        const maximo = obtenerMaximo(negativos);

        expect(maximo).toBe(-2);
        expect(maximo).toBeGreaterThan(-20);
    });

    test("Debe devolver null para un array vacio o parametro invalido (caso limite)", () => {
        expect(obtenerMaximo([])).toBe(null);
        expect(obtenerMaximo("no es un array")).toBe(null);
    });
});

describe("Pruebas de la funcion calcularMedia()", () => {
    test("Debe calcular la media exacta de un array usando toBe()", () => {
        // (10 + 20 + 30) / 3 = 20
        expect(calcularMedia([10, 20, 30])).toBe(20);
        // (4 + 6) / 2 = 5
        expect(calcularMedia([4, 6])).toBe(5);
    });

    test("Debe usar toBeGreaterThan() para comprobar que la media supera un umbral esperado", () => {
        const notas = [7, 8, 9, 10];
        const media = calcularMedia(notas);

        expect(media).toBe(8.5);
        expect(media).toBeGreaterThan(7);
        expect(media).toBeGreaterThan(5);
    });

    test("Debe manejar decimales redondeando a dos cifras", () => {
        // (10 + 10 + 11) / 3 = 10.3333... -> 10.33
        expect(calcularMedia([10, 10, 11])).toBe(10.33);
    });

    test("Debe devolver 0 para un array vacio o parametro invalido (caso limite)", () => {
        expect(calcularMedia([])).toBe(0);
        expect(calcularMedia(null)).toBe(0);
    });
});

describe("Pruebas de la funcion ordenarMenorMayor()", () => {
    test("Debe ordenar un array de menor a mayor usando toEqual()", () => {
        const desordenado = [5, 2, 8, 1, 4];
        const resultado = ordenarMenorMayor(desordenado);

        // toEqual() compara la estructura y contenido del array, no la referencia en memoria
        expect(resultado).toEqual([1, 2, 4, 5, 8]);
    });

    test("Debe ordenar correctamente numeros negativos y positivos", () => {
        const mixtos = [0, -10, 5, -2, 8];
        expect(ordenarMenorMayor(mixtos)).toEqual([-10, -2, 0, 5, 8]);
    });

    test("Debe comprobar que el array original NO ha sido modificado (inmutabilidad)", () => {
        const original = [30, 10, 20];
        const copiaAntes = [...original];

        const ordenado = ordenarMenorMayor(original);

        // El resultado debe estar ordenado
        expect(ordenado).toEqual([10, 20, 30]);

        // El array original debe conservar su orden original sin mutaciones
        expect(original).toEqual(copiaAntes);
        expect(original).toEqual([30, 10, 20]);
    });

    test("Debe devolver un array vacio para entradas invalidas (caso limite)", () => {
        expect(ordenarMenorMayor([])).toEqual([]);
        expect(ordenarMenorMayor(null)).toEqual([]);
    });
});
