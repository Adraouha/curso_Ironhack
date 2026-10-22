// =====================================================================
// Codigo JavaScript para principiantes: Validacion y Expresiones Regulares
// =====================================================================

// ---------------------------------------------------------------------
// 1. VALIDAR FORMULARIO USANDO .value
// ---------------------------------------------------------------------

// Obtenemos el boton por su ID y le anadimos el evento 'click'
document.getElementById("btn-validar").addEventListener("click", function() {

    // 1. Recogemos los valores de los inputs usando .value
    let valorTelefono = document.getElementById("telefono").value;
    let valorCorreo = document.getElementById("correo").value;
    let valorUsuario = document.getElementById("usuario").value;
    let valorCurso = document.getElementById("curso").value;

    // 2. Definimos los patrones RegEx en variables
    // Formato de telefono: 3 numeros, guion, 3 numeros, guion, 3 numeros
    let regexTelefono = /^[0-9]{3}-[0-9]{3}-[0-9]{3}$/;

    // Formato de correo basico
    let regexCorreo = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

    // Formato de usuario: de 4 a 10 letras o numeros
    let regexUsuario = /^[a-zA-Z0-9]{4,10}$/;

    // 3. Comprobamos cada campo con el metodo test()
    let esTelefonoValido = regexTelefono.test(valorTelefono);
    let esCorreoValido = regexCorreo.test(valorCorreo);
    let esUsuarioValido = regexUsuario.test(valorUsuario);

    // 4. Creamos un texto con el resultado
    let mensaje = "RESULTADOS DE LA VALIDACION:\n\n";

    if (esTelefonoValido) {
        mensaje += "Telefono: Correcto (" + valorTelefono + ")\n";
    } else {
        mensaje += "Telefono: Incorrecto. Debe tener formato 569-542-523\n";
    }

    if (esCorreoValido) {
        mensaje += "Correo: Correcto (" + valorCorreo + ")\n";
    } else {
        mensaje += "Correo: Incorrecto. Ejemplo valido: usuario@correo.com\n";
    }

    if (esUsuarioValido) {
        mensaje += "Usuario: Correcto (" + valorUsuario + ")\n";
    } else {
        mensaje += "Usuario: Incorrecto. Debe tener entre 4 y 10 caracteres\n";
    }

    mensaje += "Curso seleccionado: " + valorCurso + "\n";

    // 5. Mostramos el mensaje en la caja de resultados
    document.getElementById("resultado-formulario").textContent = mensaje;
});

// Boton para poner datos de ejemplo rapidamente
document.getElementById("btn-ejemplo").addEventListener("click", function() {
    document.getElementById("telefono").value = "569-542-523";
    document.getElementById("correo").value = "estudiante@ironhack.com";
    document.getElementById("usuario").value = "pepito12";
});


// ---------------------------------------------------------------------
// 2. METODOS BASICOS DE REGEX EN JAVASCRIPT
// ---------------------------------------------------------------------

// Metodo 1: test() -> Devuelve true si coincide, o false si no coincide
document.getElementById("btn-test").addEventListener("click", function() {
    let str = document.getElementById("texto-prueba").value;
    let patronTexto = document.getElementById("patron-prueba").value;

    // Creamos la expresion regular
    let pattern = new RegExp(patronTexto);

    // Ejecutamos test()
    let result = pattern.test(str);

    // Mostramos el resultado
    let textoSalida = "METODO test():\n";
    textoSalida += "Texto evaluado: \"" + str + "\"\n";
    textoSalida += "Patron: /" + patronTexto + "/\n";
    textoSalida += "Resultado: " + result + " (true = coincide, false = no coincide)";

    document.getElementById("resultado-metodos").textContent = textoSalida;
    console.log("Resultado de test():", result);
});

// Metodo 2: exec() -> Devuelve un array con informacion de la coincidencia
document.getElementById("btn-exec").addEventListener("click", function() {
    let str = document.getElementById("texto-prueba").value;
    let patronTexto = document.getElementById("patron-prueba").value;

    let pattern = new RegExp(patronTexto);

    // Ejecutamos exec()
    let result = pattern.exec(str);

    let textoSalida = "METODO exec():\n";
    textoSalida += "Texto evaluado: \"" + str + "\"\n";
    textoSalida += "Patron: /" + patronTexto + "/\n\n";

    if (result !== null) {
        textoSalida += "Coincidencia encontrada: \"" + result[0] + "\"\n";
        textoSalida += "Posicion (indice): " + result.index + "\n";
        textoSalida += "Texto original: \"" + result.input + "\"";
    } else {
        textoSalida += "Resultado: null (no se encontro ninguna coincidencia)";
    }

    document.getElementById("resultado-metodos").textContent = textoSalida;
    console.log("Resultado de exec():", result);
});

// Metodo 3: match() -> Busca todas las coincidencias en el texto
document.getElementById("btn-match").addEventListener("click", function() {
    let str = document.getElementById("texto-prueba").value;
    let patronTexto = document.getElementById("patron-prueba").value;

    // Creamos la expresion con la opcion 'g' para buscar globalmente
    let pattern = new RegExp(patronTexto, "g");

    // Ejecutamos match()
    let matches = str.match(pattern);

    let textoSalida = "METODO match():\n";
    textoSalida += "Texto evaluado: \"" + str + "\"\n";
    textoSalida += "Patron: /" + patronTexto + "/g\n\n";

    if (matches !== null) {
        textoSalida += "Coincidencias encontradas: " + matches.length + "\n";
        textoSalida += "Valores encontrados: " + JSON.stringify(matches);
    } else {
        textoSalida += "Resultado: null (no se encontro ninguna coincidencia)";
    }

    document.getElementById("resultado-metodos").textContent = textoSalida;
    console.log("Resultado de match():", matches);
});
