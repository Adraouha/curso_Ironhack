package felinos;

/**
 * Representa a un tigre de la selva.
 * 
 * <p>Esta clase es hija de {@link Felino}.</p>
 * 
 * @author Pepito Perez
 * @version 1.0
 * @see Gato
 */
public class Tigre extends Felino {

    private String tipo;

    /**
     * Constructor para crear un tigre.
     * 
     * @param nombre Nombre del tigre.
     * @param edad Edad en anios.
     * @param tipo Tipo o subespecie (ejemplo: Bengala).
     */
    public Tigre(String nombre, int edad, String tipo) {
        super(nombre, edad);
        this.tipo = tipo;
    }

    /**
     * Hace el rugido del tigre.
     * 
     * @return El rugido en texto.
     */
    @Override
    public String emitirSonido() {
        return getNombre() + " ruge con fuerza: Grrrr, ROAAR!";
    }

    /**
     * Devuelve el tipo de tigre.
     * 
     * @return Tipo o subespecie.
     */
    public String getTipo() {
        return tipo;
    }
}
