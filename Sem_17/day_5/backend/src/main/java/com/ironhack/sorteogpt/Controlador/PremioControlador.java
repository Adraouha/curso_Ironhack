package com.ironhack.sorteogpt.Controlador;

import com.ironhack.sorteogpt.Entidad.Premio;
import com.ironhack.sorteogpt.Servicio.PremioServicio;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/premios")
@CrossOrigin(origins = "*")
public class PremioControlador {

    private final PremioServicio premioServicio;

    public PremioControlador(PremioServicio premioServicio) {
        this.premioServicio = premioServicio;
    }

    @GetMapping
    public List<Premio> listarPremios() {
        return premioServicio.listarPremios();
    }

    @GetMapping("/random")
    public Premio obtenerPremioRandom() {
        return premioServicio.obtenerPremioRandom();
    }

    @PostMapping
    public Premio guardarPremio(@RequestBody Premio premio) {
        return premioServicio.guardarPremio(premio);
    }
}
