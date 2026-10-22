package felinos;

/**
 * Clase madre que representa a un Felino generico.
 * 
 * <p>Comentario para iniciar esta seccion de documentacion.</p>
 * 
 * @author Pepito Perez
 * @version 1.0
 * @see Gato
 * @see Tigre
 */
public class Felino {

    // Atributos privados (no se documentan en javadoc)
    private String nombre;
    private int edad;

    /**
     * Constructor para inicializar los datos del felino.
     * 
     * @param nombre Nombre del felino.
     * @param edad Edad en anios.
     */
    public Felino(String nombre, int edad) {
        this.nombre = nombre;
        this.edad = edad;
    }

    /**
     * Metodo que emite el sonido generico del felino.
     * 
     * @return Mensaje con el sonido que hace.
     */
    public String emitirSonido() {
        return this.nombre + " hace un sonido de felino.";
    }

    /**
     * Metodo para simular que el felino duerme.
     * 
     * @param horas Numero de horas que duerme.
     * @return Mensaje con las horas que durmio.
     */
    public String dormir(int horas) {
        return this.nombre + " duerme durante " + horas + " horas.";
    }

    /**
     * Devuelve el nombre del animal.
     * 
     * @return El nombre actual.
     */
    public String getNombre() {
        return nombre;
    }

    /**
     * Devuelve la edad del animal.
     * 
     * @return La edad en anios.
     */
    public int getEdad() {
        return edad;
    }
}
