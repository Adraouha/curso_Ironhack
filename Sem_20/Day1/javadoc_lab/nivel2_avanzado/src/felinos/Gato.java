package felinos;

/**
 * Representa a un gato domestico.
 * 
 * <p>Esta clase es hija de {@link Felino}.</p>
 * 
 * @author Pepito Perez
 * @version 1.0
 * @see Tigre
 */
public class Gato extends Felino {

    private String color;

    /**
     * Constructor para crear un gato.
     * 
     * @param nombre Nombre del gato.
     * @param edad Edad en anios.
     * @param color Color del pelaje.
     */
    public Gato(String nombre, int edad, String color) {
        super(nombre, edad);
        this.color = color;
    }

    /**
     * Hace el maullido tipico del gato.
     * 
     * @return El sonido Miau en texto.
     */
    @Override
    public String emitirSonido() {
        return getNombre() + " dice: Miau, miau!";
    }

    /**
     * Simula que el gato ronronea.
     * 
     * @return Mensaje con el ronroneo.
     */
    public String ronronear() {
        return getNombre() + " ronronea: Prrrr, prrrr.";
    }

    /**
     * Devuelve el color del gato.
     * 
     * @return Color del pelaje.
     */
    public String getColor() {
        return color;
    }
}
