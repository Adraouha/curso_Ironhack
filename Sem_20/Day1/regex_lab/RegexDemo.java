import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Ejemplo basico de Expresiones Regulares en Java para principiantes.
 * 
 * @author Pepito Perez
 * @version 1.0
 */
public class RegexDemo {

    public static void main(String[] args) {

        System.out.println("--- 1. Ejemplo basico con String.matches() ---");

        // Ejemplo directo del temario de la clase:
        String myString = " %usuario1usuario2$%&";
        String myPattern2 = "\\s+.*"; // \\s significa espacio en blanco

        Boolean matchExists2 = myString.matches(myPattern2);
        System.out.println("Texto: " + myString);
        System.out.println("Patron: " + myPattern2);
        System.out.println("Coincide?: " + matchExists2); // Imprime: true

        System.out.println();

        System.out.println("--- 2. Validar formato de telefono ---");

        // Formato: 3 numeros, guion, 3 numeros, guion, 3 numeros
        String telefono = "569-542-523";
        String patronTelefono = "[0-9]{3}-[0-9]{3}-[0-9]{3}";

        boolean esValido = telefono.matches(patronTelefono);
        System.out.println("Telefono: " + telefono);
        System.out.println("Es valido?: " + esValido); // Imprime: true

        System.out.println();

        System.out.println("--- 3. Buscar palabras que empiezan por 'C' ---");

        // Usamos Pattern y Matcher para buscar en un texto
        String frase = "La Cacatua come Cacahuetes y juega con el Gato";
        Pattern patron = Pattern.compile("\\bC[a-z]+");
        Matcher buscador = patron.matcher(frase);

        while (buscador.find()) {
            System.out.println("Encontrado: " + buscador.group());
        }
    }
}
