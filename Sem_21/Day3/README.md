# Semana 21 - Dia 3: Testing en JavaScript

Guia de introduccion a las pruebas de software en JavaScript con `console.assert()` y con el framework de pruebas Jest.

---

## 1. Por que son importantes las pruebas de software

Escribir pruebas permite:
- Comprobar de forma automatica e inmediata que las funciones se comportan como se espera.
- Detectar errores de regresion cuando modificamos o refactorizamos el codigo.
- Validar no solo el camino feliz (cuando el usuario introduce datos ideales), sino tambien los casos limite o extremos donde suelen aparecer los fallos.

---

## 2. Comprobaciones basicas con console.assert()

`console.assert()` es una funcion nativa de JavaScript que evalua una expresion logica:
- Si la condicion es `true`: No ocurre nada y la ejecucion continua en silencio.
- Si la condicion es `false`: Muestra un mensaje de error en la consola indicando que la asercion ha fallado.

Ejemplo:
```javascript
function suma(a, b) {
    return a + b;
}

// Pasa correctamente (no muestra nada)
console.assert(suma(2, 3) === 5, "Error: 2 + 3 deberia ser 5");

// Falla y muestra el mensaje de error en la consola
console.assert(suma(2, 2) === 5, "Error: 2 + 2 no es 5");
```

Para probar el archivo de ejemplo incluido:
```bash
node 01_console_assert/prueba_assert.js
```

---

## 3. Introduccion a Jest

Jest es una de las librerias de testing mas utilizadas en el ecosistema de JavaScript y Node.js. Proporciona una sintaxis clara (`describe`, `test`, `expect`, `toBe`), ejecuta multiples pruebas en paralelo y genera informes legibles del resultado.

### Instalacion y configuracion paso a paso en un proyecto Node.js:
1. Iniciar el proyecto con `package.json`:
   ```bash
   npm init -y
   ```
2. Instalar Jest como dependencia de desarrollo:
   ```bash
   npm install --save-dev jest
   ```
3. Configurar el script de test en `package.json`:
   ```json
   {
     "scripts": {
       "test": "jest --verbose"
     }
   }
   ```
4. Ejecutar las pruebas:
   ```bash
   npm test
   ```

---

## 4. Exportacion e importacion con CommonJS

En Node.js clasico se utiliza el sistema de modulos CommonJS:

### Para exportar una sola funcion:
```javascript
// main.js
function suma(a, b) {
    return a + b;
}
module.exports = suma;
```

### Para exportar varias funciones:
```javascript
// main.js
module.exports = {
    suma,
    calcularDescuento,
    esMayorDeEdad,
    contarCaracteres
};
```

### Para importar en el archivo de test:
```javascript
// main.test.js
const {
    suma,
    calcularDescuento,
    esMayorDeEdad,
    contarCaracteres
} = require("./main.js");
```

---

## 5. Ejercicios desarrollados y casos limite

En `main.js` y `main.test.js` se han resuelto los siguientes ejercicios:

### Ejercicio 0: suma(a, b)
- Casos evaluados:
  - Numeros positivos (`2 + 3 = 5`).
  - Numeros negativos (`-5 + -5 = -10`).
  - Casos limite con cero (`0 + 0 = 0`, `5 + 0 = 5`).

### Ejercicio 1: calcularDescuento(precio)
Calcula un descuento del 10 % y devuelve el precio final:
- Casos evaluados:
  - Precios normales: 100 devuelve 90, 50 devuelve 45.
  - Precios con decimales: 25.50 devuelve 22.95.
  - Casos limite: Precio 0 devuelve 0; precios negativos o valores no numericos devuelven 0.

### Ejercicio 2: esMayorDeEdad(edad)
Comprueba si una persona tiene 18 anos o mas y devuelve `true` o `false`:
- Casos evaluados:
  - Mayores de edad: 19, 25, 65 devuelven `true`.
  - Menores de edad: 17, 10, 1 devuelven `false`.
  - Caso limite fundamental: Exactamente 18 anos devuelve `true` (`edad >= 18`).
  - Casos limite: Edad 0 o edades negativas devuelven `false`.

### Ejercicio 3: contarCaracteres(frase)
Cuenta los caracteres de una frase incluyendo los espacios en blanco:
- Casos evaluados:
  - Palabras simples: "hola" devuelve 4.
  - Con espacios en blanco: "Hola mundo" devuelve 10 (4 + 1 espacio + 5).
  - Caso limite: Frase vacia `""` devuelve 0.
  - Frases con signos y espacios al inicio o final: `" a "` devuelve 3.
  - Casos limite: Valores nulos o indefinidos devuelven 0.

---

## 6. Estructura de archivos

```
Day3/
|-- README.md                         (Esta guia explicativa)
|-- package.json                      (Configuracion de npm y Jest)
|-- main.js                           (Funciones exportadas con CommonJS)
|-- main.test.js                      (Tests unitarios con Jest)
`-- 01_console_assert/
    `-- prueba_assert.js              (Demostracion con console.assert)
```

---

## 7. Como ejecutar las pruebas

Desde la carpeta `Sem_21/Day3`:

```bash
# 1. Instalar dependencias si no estan instaladas
npm install

# 2. Lanzar la suite de tests
npm test
```

---

## 8. Recursos y documentacion oficial

- Documentacion oficial de Jest: https://jestjs.io/docs/getting-started
- Guia de Matchers de Jest: https://jestjs.io/docs/using-matchers
- MDN Web Docs: console.assert(): https://developer.mozilla.org/es/docs/Web/API/console/assert
