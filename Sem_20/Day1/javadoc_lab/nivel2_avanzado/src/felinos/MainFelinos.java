package felinos;

/**
 * Clase principal para probar las clases Gato y Tigre.
 * 
 * @author Pepito Perez
 * @version 1.0
 */
public class MainFelinos {

    /**
     * Constructor por defecto.
     */
    public MainFelinos() {
    }

    /**
     * Metodo principal main.
     * 
     * @param args Argumentos de consola.
     */
    public static void main(String[] args) {
        System.out.println("Pruebas del paquete felinos");

        // Creamos un objeto Gato
        Gato miGato = new Gato("Michi", 3, "Naranja");
        System.out.println(miGato.emitirSonido());
        System.out.println(miGato.ronronear());
        System.out.println(miGato.dormir(8));

        System.out.println();

        // Creamos un objeto Tigre
        Tigre miTigre = new Tigre("Shere Khan", 5, "Bengala");
        System.out.println(miTigre.emitirSonido());
        System.out.println(miTigre.dormir(6));
    }
}
