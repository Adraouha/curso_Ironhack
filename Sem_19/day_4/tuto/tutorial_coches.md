# Tutorial de uso de las funciones de coches

Este tutorial explica como utilizar las variables de `variables.js` junto con las funciones de `funciones.js` dentro de nuestra aplicacion web.

## 1. Calcular el precio final con IVA

Para obtener el precio con impuestos incluidos, llamamos a `calcularPrecioConIva(precioBase, impuesto)`:

```javascript
const total = calcularPrecioConIva(12000, porcentajeIva);
console.log(total); // 14520
```

## 2. Formatear la ficha de un coche

Con `formatearFichaCoche(marca, modelo, precio)` generamos un texto listo para mostrar en el DOM:

```javascript
const ficha = formatearFichaCoche("Seat", "Ibiza", 12000);
mostrarEnPantalla("salida", ficha);
```
