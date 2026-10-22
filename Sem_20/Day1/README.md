# Semana 20 - Dia 1: Javadoc y Expresiones Regulares (RegEx)

Guia basica y sencilla para aprender a documentar codigo en Java con **Javadoc** y a validar texto con **Expresiones Regulares (RegEx)**.

---

## 1. Javadoc

### Que es Javadoc?
Javadoc es una herramienta que viene incluida en el JDK de Java. Sirve para crear documentacion automatica en formato HTML a partir de los comentarios que escribimos en nuestro codigo fuente Java.

Para que Javadoc reconozca un comentario, debemos abrirlo con `/**` y cerrarlo con `*/`:

```java
/**
 * @author Pepito Perez
 * Comentario para iniciar esa seccion de documentacion.
 * @param nombre Comentario del parametro.
 * @return Comentario del return.
 * @see laOtraClaseParecida
 * Esta clase es hija de {@link ClaseMadre}
 */
```

### Etiquetas mas utilizadas:
- `@author`: Nombre del autor del codigo.
- `@version`: Version de la clase.
- `@param`: Explica para que sirve un parametro de un metodo o constructor.
- `@return`: Explica que dato devuelve el metodo.
- `@see`: Enlaza a otra clase parecida o relacionada.
- `{@link Clase}`: Crea un enlace directo a otra clase dentro del texto.

### Regla sobre los atributos privados:
En Java se documentan principalmente las **clases** y los **metodos publicos**.  
Los atributos privados (`private`) no se suelen documentar en Javadoc para no dar pistas de como esta hecha la clase por dentro (encapsulamiento).

### Formato con HTML basico:
Dentro de los comentarios de Javadoc podemos usar etiquetas HTML sencillas como:
- `<p>` para separar parrafos.
- `<b>` para poner texto en **negrita**.
- `<i>` para poner texto en *cursiva*.
- `<code>` para resaltar nombres de variables o metodos.

### Como generar la documentacion Javadoc desde la terminal:
Abre la terminal en la carpeta correspondiente:

1. Si estas dentro de la carpeta donde estan los archivos `.java`:
   ```bash
   javadoc *.java
   ```
2. Si quieres guardar el HTML en una carpeta llamada `docu`:
   ```bash
   javadoc -d docu *.java
   ```
3. Si estas en la carpeta superior a `src`:
   ```bash
   javadoc -d docu src/*.java
   ```

*(Nota para Windows: si la terminal dice que no reconoce la orden `javadoc`, debes anadir la ruta `bin` de tu JDK a las Variables de Entorno del sistema, por ejemplo: `C:\Program Files\Java\jdk-21.0.11\bin`).*

### Extensiones recomendadas en VS Code:
- **Javadoc Tools**: Ayuda a autocompletar plantillas de comentarios y a exportar el Javadoc sin usar la consola.
- **Extension Pack for Java**: Al escribir `/**` encima de cualquier metodo y pulsar `Enter`, crea automaticamente la estructura de etiquetas.

---

## 2. Expresiones Regulares (RegEx)

### Que son las RegEx?
Una expresion regular (RegEx o RegExp) es una formula o patron que sirve para comprobar si un texto cumple un formato determinado (por ejemplo: si es un telefono valido, un correo o si tiene letras y numeros).

Nos ahorra tener que escribir bucles `for` o algoritmos largos para revisar caracter por caracter.

### Por que select, checkbox y radio NO necesitan validacion RegEx?
En los formularios web:
- Los campos de texto libre (`<input type="text">`, etc.) si necesitan validacion RegEx porque el usuario puede escribir cualquier cosa por error.
- En cambio, los **select**, **checkbox** y **radio buttons** no necesitan RegEx porque el usuario solo elige opciones fijas cuyos valores (`value`) ya los ha decidido el programador.

### El atributo title en HTML:
Cuando usamos el atributo `pattern` en un `<input>`, es muy util poner tambien el atributo `title`. Si el usuario se equivoca de formato, el navegador muestra el texto del `title` como ayuda:
```html
<input type="text" pattern="[0-9]{3}-[0-9]{3}-[0-9]{3}" title="El formato debe ser 569-542-523">
```

### Como leer y validar con JavaScript (.value):
En JavaScript recogemos el valor escrito por el usuario con `.value`:
```javascript
let valorDelEmail = document.getElementById("correo").value;
```

#### Los 3 metodos basicos de RegEx en JavaScript:
1. **`pattern.test(str)`**: Devuelve `true` si coincide, o `false` si no coincide:
   ```javascript
   let pattern = /hello/;
   let str = "hello world";
   let result = pattern.test(str);
   console.log(result); // Salida: true
   ```
2. **`pattern.exec(str)`**: Busca la coincidencia y devuelve un array con datos (indice, texto, etc.):
   ```javascript
   let result = pattern.exec(str);
   console.log(result); // Salida: ["world", index: 6, input: "hello world"]
   ```
3. **`str.match(pattern)`**: Busca las coincidencias en la cadena:
   ```javascript
   let str = "The quick brown fox jumps over the lazy dog.";
   let matches = str.match(/the/gi);
   console.log(matches); // Salida: ["The", "the"]
   ```

### Ejemplo en Java:
```java
String myString = " %usuario1usuario2$%&";
String myPattern2 = "\\s+.*"; // \\s significa espacio
Boolean matchExists2 = myString.matches(myPattern2); // Salida: true
```

### Ejemplo en MySQL:
```sql
SELECT * FROM movies WHERE title REGEXP '^[abcd]';
```

---

## 3. Estructura de carpetas creada

- `javadoc_lab/`
  - `nivel1_simple/`: Clase sencilla `Cacatua.java` con su documentacion HTML generada en la carpeta `docu/`.
  - `nivel2_avanzado/`: Clases con herencia `Felino.java`, `Gato.java` y `Tigre.java`, con su documentacion HTML en `docu/`.
- `regex_lab/`
  - `index.html`: Formulario sencillo sin iconos ni animaciones.
  - `style.css`: Estilo basico y limpio.
  - `app.js`: Codigo JavaScript facil de entender que lee con `.value` y prueba `test()`, `exec()` y `match()`.
  - `RegexDemo.java`: Programa en Java para probar `matches()`.
  - `regex_mysql.sql`: Consultas SQL sencillas con `REGEXP`.
  - `guia_retos_regexlearn.md`: Chuleta de simbolos para resolver retos de expresiones regulares.

---

## 4. Como probar todo paso a paso

### Ver la documentacion HTML de Javadoc:
1. Entra en `Sem_20/Day1/javadoc_lab/nivel1_simple/docu/index.html` y abrelo con dos clics en tu navegador.
2. Entra en `Sem_20/Day1/javadoc_lab/nivel2_avanzado/docu/index.html` para ver las clases de Felinos.

### Probar el formulario web de RegEx:
1. Abre el archivo `Sem_20/Day1/regex_lab/index.html` con tu navegador (o con Live Server).
2. Escribe en el telefono y pulsa el boton "Validar con JavaScript (.value)".
3. Prueba los botones de `test()`, `exec()` y `match()` para ver el resultado en la pantalla.

### Probar el codigo Java de RegEx:
Abre la terminal en `Sem_20/Day1/regex_lab` y ejecuta:
```bash
javac -d bin RegexDemo.java
java -cp bin RegexDemo
```
