package com.ironhack.cochesjpa1.Service;

import com.ironhack.cochesjpa1.Entity.Usuario;
import com.ironhack.cochesjpa1.Repository.UsuarioRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public UsuarioService(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Usuario crearUsuario(Usuario usuario) {
        // Encriptamos la contrasena con BCrypt antes de guardar
        String passwordHasheada = passwordEncoder.encode(usuario.getPassword());
        usuario.setPassword(passwordHasheada);
        return usuarioRepository.save(usuario);
    }
}
