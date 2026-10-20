package com.ironhack.cochesjpa1.Controller;

import com.ironhack.cochesjpa1.Entity.Usuario;
import com.ironhack.cochesjpa1.Service.UsuarioService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping({"/usuarios", "/api/usuarios"})
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @PostMapping
    public ResponseEntity<String> crearUsuario(@RequestBody Usuario usuario) {
        usuarioService.crearUsuario(usuario);
        return ResponseEntity.status(HttpStatus.CREATED).body("Usuario creado correctamente");
    }
}
