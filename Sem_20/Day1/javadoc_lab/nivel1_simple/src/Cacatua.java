package nivel1_simple;

/**
 * Clase que representa a una Cacatua.
 * 
 * <p>Esta clase sirve de ejemplo para aprender a usar <b>Javadoc</b> en Java.</p>
 * 
 * @author Pepito Perez
 * @version 1.0
 */
public class Cacatua {

    // Atributos privados (no se suelen documentar en Javadoc)
    private String nombre;
    private String color;
    private int edad;

    /**
     * Constructor para crear una Cacatua con sus datos basicos.
     * 
     * @param nombre El nombre de la cacatua.
     * @param color El color de sus plumas.
     * @param edad La edad en anios.
     */
    public Cacatua(String nombre, String color, int edad) {
        this.nombre = nombre;
        this.color = color;
        this.edad = edad;
    }

    /**
     * Hace que la cacatua cante o emita un sonido.
     * 
     * @return El sonido que hace la cacatua en texto.
     */
    public String cantar() {
        return this.nombre + " dice: Kikiriki y silba alegremente.";
    }

    /**
     * Simula el vuelo de la cacatua indicando los metros recorridos.
     * 
     * @param metros Cantidad de metros que vuela.
     * @return Mensaje con la distancia volada.
     */
    public String volar(int metros) {
        return this.nombre + " ha volado " + metros + " metros.";
    }

    /**
     * Devuelve el nombre de la cacatua.
     * 
     * @return El nombre actual.
     */
    public String getNombre() {
        return nombre;
    }

    /**
     * Devuelve la edad de la cacatua.
     * 
     * @return La edad en anios.
     */
    public int getEdad() {
        return edad;
    }

    /**
     * Metodo principal main para probar la clase de forma sencilla.
     * 
     * @param args Argumentos de consola (no se usan).
     */
    public static void main(String[] args) {
        System.out.println("Prueba de la clase Cacatua");
        
        // Creamos un objeto Cacatua
        Cacatua miCacatua = new Cacatua("Lola", "Blanco", 2);
        
        // Probamos los metodos
        System.out.println(miCacatua.cantar());
        System.out.println(miCacatua.volar(15));
    }
}
