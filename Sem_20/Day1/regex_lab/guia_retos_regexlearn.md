# Chuleta basica de RegEx (RegexLearn)

Guia sencilla para entender los simbolos de expresiones regulares y resolver los retos de https://regexlearn.com/learn/regex101.

---

## 1. Simbolos basicos

| Simbolo | Que significa | Ejemplo |
| :--- | :--- | :--- |
| `.` | Cualquier caracter (excepto salto de linea) | `c.sa` coincide con "casa" y "cosa" |
| `\d` | Un numero o digito del 0 al 9 | `\d\d` coincide con "42" |
| `\D` | Cualquier cosa que NO sea un numero | `\D` coincide con "a", "-" |
| `\w` | Letra, numero o guion bajo | Coincide con caracteres alfanumericos |
| `\s` | Espacio en blanco | Espacios, tabuladores |

---

## 2. Grupos entre corchetes

| Simbolo | Que significa | Ejemplo |
| :--- | :--- | :--- |
| `[abc]` | Cualquiera de las letras a, b o c | `[bp]ato` coincide con "bato" o "pato" |
| `[a-z]` | Cualquier letra minuscula | De la 'a' a la 'z' |
| `[0-9]` | Cualquier numero | Del 0 al 9 |
| `[^abc]` | Cualquier caracter EXCEPTO a, b o c | Niega el conjunto |

---

## 3. Repeticiones (Cuantificadores)

| Simbolo | Cuantas veces se repite | Ejemplo |
| :--- | :--- | :--- |
| `+` | 1 o mas veces | `\d+` coincide con "5" o "12345" |
| `*` | 0 o mas veces (puede no estar) | `ho*la` coincide con "hla" y "hola" |
| `?` | Opcional (0 o 1 vez) | `https?` coincide con "http" y "https" |
| `{3}` | Exactamente 3 veces | `\d{3}` coincide con "569" |
| `{3,5}` | Entre 3 y 5 veces | `\d{3,5}` coincide con 3, 4 o 5 numeros |

---

## 4. Principio y final

| Simbolo | Que significa | Ejemplo |
| :--- | :--- | :--- |
| `^` | Empieza por... | `^Hola` solo si la frase empieza por Hola |
| `$` | Termina en... | `adios$` solo si la frase termina en adios |
| `^...$` | Todo el texto exacto | `^[0-9]{3}$` exactamente 3 numeros |

---

## 5. Como usar los retos de RegexLearn

1. Entra en https://regexlearn.com/learn/regex101.
2. Lee lo que te pide cada nivel.
3. Escribe la expresion regular en el cuadro.
4. Si te atascas, pulsa el boton "Show answer" para ver la solucion y entenderla.
