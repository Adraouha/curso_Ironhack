package com.empanadas.stock.repository;

import com.empanadas.stock.model.Ingrediente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IngredienteRepository extends JpaRepository<Ingrediente, Long> {

    
}