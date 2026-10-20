package com.ironhack.cochesjpa1;

import com.ironhack.cochesjpa1.Entity.Coche;
import com.ironhack.cochesjpa1.Entity.Usuario;
import com.ironhack.cochesjpa1.Repository.CocheRepository;
import com.ironhack.cochesjpa1.Repository.UsuarioRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class Cochesjpa1Application {

	public static void main(String[] args) {
		SpringApplication.run(Cochesjpa1Application.class, args);
	}

	@Bean
	public CommandLineRunner initData(CocheRepository cocheRepository,
	                                   UsuarioRepository usuarioRepository,
	                                   PasswordEncoder passwordEncoder) {
		return args -> {
			// Cargar coches iniciales si la tabla esta vacia
			if (cocheRepository.count() == 0) {
				cocheRepository.save(new Coche(null, "Seat", "Ibiza", "1111-AAA", 12000.0));
				cocheRepository.save(new Coche(null, "Renault", "Clio", "2222-BBB", 13500.0));
				cocheRepository.save(new Coche(null, "Toyota", "Corolla", "3333-CCC", 21000.0));
				cocheRepository.save(new Coche(null, "Peugeot", "208", "4444-DDD", 15000.0));
				cocheRepository.save(new Coche(null, "Audi", "A3", "5555-EEE", 28000.0));
			}

			// Crear usuario de prueba (admin / 1234) si no existe
			if (usuarioRepository.findByUsername("admin").isEmpty()) {
				Usuario admin = new Usuario(null, "admin", passwordEncoder.encode("1234"));
				usuarioRepository.save(admin);
			}
		};
	}

}
