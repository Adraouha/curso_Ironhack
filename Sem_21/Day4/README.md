# Semana 21 - Dia 4: Jest Coverage y Matchers Avanzados

Guia para mejorar las pruebas unitarias con Jest mediante el analisis de cobertura de codigo (`--coverage`), el uso de matchers avanzados (`toBeGreaterThan`, `toBeFalsy`, `toEqual`) y la organizacion modular del proyecto.

---

## 1. Cobertura de codigo (Test Coverage)

La cobertura de pruebas indica que porcentaje del codigo de nuestra aplicacion esta siendo ejecutado y verificado por los tests. Nos ayuda a detectar ramas condicionales no probadas, funciones olvidadas o lineas inaccesibles.

### 1.1. Ejecucion con --coverage
Para activar el informe de cobertura, se anade la bandera `--coverage` al comando de Jest:

```bash
npx jest --coverage
```

### 1.2. Configuracion en package.json
Para que se ejecute automaticamente cada vez que lanzamos las pruebas:

```json
{
  "scripts": {
    "test": "jest --coverage --verbose"
  }
}
```

Luego se ejecuta simplemente con:
```bash
npm test
```

### 1.3. Interpretacion de la tabla de cobertura
Al terminar la ejecucion, Jest muestra una tabla con cuatro columnas:
- `% Stmts` (Statements): Porcentaje de declaraciones ejecutadas.
- `% Branch` (Ramas): Porcentaje de bifurcaciones de control (`if`, `else`, operadores ternarios) recorridas.
- `% Funcs` (Funciones): Porcentaje de funciones invocadas.
- `% Lines` (Lineas): Porcentaje de lineas de codigo alcanzadas.
- `Uncovered Line #s`: Numero de las lineas concretas que no fueron probadas por ningun test.

Ademas, Jest genera automaticamente una carpeta llamada `coverage/`. Si abres el archivo `coverage/lcov-report/index.html` en un navegador web, podras ver un informe visual interactivo donde las lineas cubiertas se marcan en verde y las no cubiertas en rojo.

---

## 2. Matchers adicionales de Jest

Un matcher es el metodo que se encadena a `expect(valor)` para comprobar una condicion:

### 2.1. toBe() vs toEqual()
- `toBe()`: Comprueba igualdad referencial estricta (`===`). Es perfecto para tipos primitivos como numeros, strings o booleanos.  
  Si intentas comparar dos arrays con `toBe([1, 2])`, el test fallara porque en JavaScript dos arrays son objetos distintos en memoria aunque contengan los mismos elementos.
- `toEqual()`: Realiza una comparacion profunda (deep equality). Recorre recursivamente todas las propiedades de un array o un objeto para verificar que sus valores coincidan.  
  Ejemplo:
  ```javascript
  expect(ordenarMenorMayor([3, 1, 2])).toEqual([1, 2, 3]);
  ```

### 2.2. toBeGreaterThan()
Comprueba que un valor numerico sea estrictamente mayor que otro:
```javascript
const maximo = obtenerMaximo([10, 20, 50]);
expect(maximo).toBeGreaterThan(20);
```

### 2.3. toBeFalsy()
Comprueba que un valor sea evaluado como falso en un contexto booleano (`false`, `0`, `""`, `null`, `undefined`, `NaN`):
```javascript
expect(esPar(3)).toBeFalsy();
expect(esPar("texto")).toBeFalsy();
```

---

## 3. Organizacion del proyecto

Siguiendo las buenas practicas de desarrollo, el proyecto separa responsabilidades en carpetas:

```
Day4/
|-- package.json               (Configuracion de npm, Jest y script con --coverage)
|-- README.md                  (Esta documentacion tecnica)
|-- js/
|   `-- utilidades.js          (Codigo fuente con las funciones numericas)
`-- test/
    `-- utilidades.test.js     (Archivos de pruebas unitarias con Jest)
```

---

## 4. Funciones de utilidades numericas

En `js/utilidades.js` se implementan las cuatro funciones requeridas:

1. `esPar(numero)`: Comprueba si un numero es par utilizando el operador modulo `%`:
   ```javascript
   return numero % 2 === 0;
   ```
2. `obtenerMaximo(arrayNumeros)`: Utiliza el metodo de Math con el operador de propagacion (`spread`):
   ```javascript
   return Math.max(...arrayNumeros);
   ```
3. `calcularMedia(arrayNumeros)`: Suma todos los elementos con `reduce()` y divide entre la longitud del array.
4. `ordenarMenorMayor(arrayNumeros)`:
   - La funcion tradicional `array.sort((a, b) => a - b)` tiene el inconveniente de que **modifica (muta) el array original**.
   - Para no mutar los datos recibidos, se utiliza el metodo moderno `array.toSorted((a, b) => a - b)` o una copia previa `[...array].sort((a, b) => a - b)`. En los tests se comprueba de forma expresa que el array original permanece intacto.

---

## 5. Exportacion e importacion multiple

En el archivo de logica (`js/utilidades.js`):
```javascript
module.exports = {
    esPar,
    obtenerMaximo,
    calcularMedia,
    ordenarMenorMayor
};
```

En el archivo de pruebas (`test/utilidades.test.js`):
```javascript
const {
    esPar,
    obtenerMaximo,
    calcularMedia,
    ordenarMenorMayor
} = require("../js/utilidades.js");
```

---

## 6. Pasos para instalar y ejecutar las pruebas

1. Abre la terminal en la carpeta `Sem_21/Day4`:
   ```bash
   cd Sem_21/Day4
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Ejecuta la suite de pruebas con analisis de cobertura:
   ```bash
   npm test
   ```
4. Observa la tabla de cobertura en la terminal y comprueba que todas las funciones, lineas y ramas alcanzan el 100 % de cobertura.
