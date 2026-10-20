package com.ironhack.cochesjpa1;

import com.ironhack.cochesjpa1.Entity.Coche;
import com.ironhack.cochesjpa1.Entity.Marca;
import com.ironhack.cochesjpa1.Repository.CocheRepository;
import com.ironhack.cochesjpa1.Repository.MarcaRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

// Carga marcas iniciales en la base de datos
@Component
public class DataLoader implements CommandLineRunner {

    private final MarcaRepository marcaRepository;
    private final CocheRepository cocheRepository;

    public DataLoader(MarcaRepository marcaRepository, CocheRepository cocheRepository) {
        this.marcaRepository = marcaRepository;
        this.cocheRepository = cocheRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        Marca seat = marcaRepository.findByNombreIgnoreCase("Seat")
                .orElseGet(() -> marcaRepository.save(new Marca(null, "Seat", "Espana")));
        Marca renault = marcaRepository.findByNombreIgnoreCase("Renault")
                .orElseGet(() -> marcaRepository.save(new Marca(null, "Renault", "Francia")));
        Marca toyota = marcaRepository.findByNombreIgnoreCase("Toyota")
                .orElseGet(() -> marcaRepository.save(new Marca(null, "Toyota", "Japon")));
        Marca peugeot = marcaRepository.findByNombreIgnoreCase("Peugeot")
                .orElseGet(() -> marcaRepository.save(new Marca(null, "Peugeot", "Francia")));
        Marca audi = marcaRepository.findByNombreIgnoreCase("Audi")
                .orElseGet(() -> marcaRepository.save(new Marca(null, "Audi", "Alemania")));

        List<Coche> coches = cocheRepository.findAll();
        for (Coche c : coches) {
            if (c.getMarcaId() == null && c.getMarca() != null) {
                String m = c.getMarca().toLowerCase().trim();
                if (m.contains("seat")) c.setMarcaId(seat);
                else if (m.contains("renault")) c.setMarcaId(renault);
                else if (m.contains("toyota")) c.setMarcaId(toyota);
                else if (m.contains("peugeot")) c.setMarcaId(peugeot);
                else if (m.contains("audi")) c.setMarcaId(audi);
                cocheRepository.save(c);
            }
        }
    }
}
