/**
 * @file Archivo con varias funciones documentadas con JSDoc (@param y @returns).
 * @author Hassan Adraou
 * @since 1.0.0
 * @version 1.2.0
 * @description Funciones de calculo de precios, formateo de texto y validacion para la aplicacion de coches.
 * {@link https://jsdoc.app/}
 * @tutorial tutorial_coches
 */

/**
 * Calcula el precio final de un coche sumando el porcentaje de impuestos.
 * @param {number} precioBase - Precio del coche sin impuestos.
 * @param {number} impuesto - Porcentaje de impuesto a aplicar (por ejemplo 21).
 * @returns {number} Precio total con el impuesto incluido.
 */
function calcularPrecioConIva(precioBase, impuesto) {
    return precioBase + (precioBase * impuesto) / 100;
}

/**
 * Devuelve una cadena con la descripcion resumida de un coche.
 * @param {string} marca - Marca del vehiculo.
 * @param {string} modelo - Modelo del vehiculo.
 * @param {number} precio - Precio de venta en euros.
 * @returns {string} Texto formateado con la marca, el modelo y el precio.
 */
function formatearFichaCoche(marca, modelo, precio) {
    return marca + " " + modelo + " - Precio: " + precio + " EUR";
}

/**
 * Comprueba si una matricula tiene una longitud valida.
 * @param {string} matricula - Texto de la matricula introducida por el usuario.
 * @returns {boolean} Devuelve true si la matricula no esta vacia y tiene al menos 6 caracteres.
 */
function validarMatricula(matricula) {
    if (!matricula) {
        return false;
    }
    return matricula.trim().length >= 6;
}

/**
 * Muestra en un contenedor HTML el resultado de las funciones de ejemplo.
 * @param {string} idElemento - ID del elemento HTML donde se mostrara el texto.
 * @param {string} mensaje - Texto que se escribira en pantalla.
 * @returns {void}
 */
function mostrarEnPantalla(idElemento, mensaje) {
    const elemento = document.getElementById(idElemento);
    if (elemento) {
        elemento.textContent = mensaje;
    }
}
