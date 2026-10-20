/**
 * @file Archivo sencillo de variables sin funciones para practicar JSDoc.
 * @author Hassan Adraou
 * @since 1.0.0
 * @version 1.1.0
 * @description Definicion de constantes y variables basicas del concesionario de coches.
 * {@link https://jsdoc.app/}
 * {@link https://developer.mozilla.org/es/docs/Web/JavaScript}
 */

/**
 * Nombre del concesionario principal.
 * @type {string}
 */
const nombreConcesionario = "Concesionario Ironhack";

/**
 * Direccion URL base de la API local de coches.
 * @type {string}
 */
const urlApiCoches = "http://localhost:8080/coches";

/**
 * Numero maximo de coches mostrados por pagina.
 * @type {number}
 */
let limitePorPagina = 10;

/**
 * Porcentaje de IVA aplicable al precio de los coches.
 * @type {number}
 */
const porcentajeIva = 21;

/**
 * Indica si el servidor local esta disponible.
 * @type {boolean}
 */
let servidorActivo = true;

/**
 * Lista inicial de marcas disponibles en la tienda.
 * @type {Array<string>}
 */
const marcasDisponibles = ["Seat", "Renault", "Toyota", "Peugeot", "Audi"];
