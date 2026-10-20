package com.ironhack.sorteogpt.Servicio;

import com.ironhack.sorteogpt.Entidad.Premio;
import com.ironhack.sorteogpt.Repositorio.PremioRepositorio;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;

@Service
public class PremioServicio {

    private final PremioRepositorio premioRepositorio;
    private final Random random = new Random();

    public PremioServicio(PremioRepositorio premioRepositorio) {
        this.premioRepositorio = premioRepositorio;
    }

    public List<Premio> listarPremios() {
        return premioRepositorio.findAll();
    }

    public Premio guardarPremio(Premio premio) {
        return premioRepositorio.save(premio);
    }

    public Premio obtenerPremioRandom() {
        List<Premio> premios = premioRepositorio.findAll();
        if (premios.isEmpty()) {
            return new Premio("No hay premios registrados todavia");
        }
        int indice = random.nextInt(premios.size());
        return premios.get(indice);
    }
}
