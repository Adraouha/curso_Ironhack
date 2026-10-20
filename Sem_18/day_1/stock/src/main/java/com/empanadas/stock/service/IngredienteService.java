package com.empanadas.stock.service;

import com.empanadas.stock.model.Ingrediente;
import com.empanadas.stock.repository.IngredienteRepository;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class IngredienteService {

    private final IngredienteRepository repository;

    public IngredienteService(IngredienteRepository repository) {
        this.repository = repository;
    }

    public List<Ingrediente> listar() {
        return repository.findAll();
    }

    public Ingrediente obtener(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Ingrediente no encontrado: " + id));
    }

    public Ingrediente crear(Ingrediente ingrediente) {
        ingrediente.setId(null);   // fuerza a crear uno nuevo, nunca a sobrescribir
        return repository.save(ingrediente);
    }

    public Ingrediente actualizar(Long id, Ingrediente datos) {
        Ingrediente existente = obtener(id);   // lanza 404 si no existe
        existente.setNombre(datos.getNombre());
        existente.setPrecio(datos.getPrecio());
        return repository.save(existente);
    }

    public void borrar(Long id) {
        obtener(id);   // lanza 404 si no existe
        try {
            repository.deleteById(id);
        } catch (DataIntegrityViolationException e) {
            throw new ResponseStatusException(HttpStatus.CONFLICT,
                    "No se puede borrar: el ingrediente se usa en alguna empanada");
        }
    }
}