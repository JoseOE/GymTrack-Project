package com.gymtrack.controller;

import com.gymtrack.model.User;
import com.gymtrack.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", "El email ya está registrado."));
        }
        
        // Hashear contraseña antes de guardar
        user.setPassword(hashPassword(user.getPassword()));
        userRepository.save(user);
        
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Usuario registrado exitosamente");
        response.put("nombre", user.getNombre());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User loginRequest) {
        Optional<User> userOpt = userRepository.findByEmail(loginRequest.getEmail());
        
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            // Verificar hash de contraseña
            if (user.getPassword().equals(hashPassword(loginRequest.getPassword()))) {
                Map<String, Object> response = new HashMap<>();
                response.put("message", "Login exitoso");
                response.put("nombre", user.getNombre());
                return ResponseEntity.ok(response);
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Credenciales incorrectas."));
    }

    // Algoritmo nativo de Java para encriptar la contraseña (SHA-256)
    // Se implementa así para mantener el backend ligero sin dependencias extra como Spring Security.
    private String hashPassword(String password) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            byte[] hash = md.digest(password.getBytes());
            StringBuilder hexString = new StringBuilder();
            for (byte b : hash) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) hexString.append('0');
                hexString.append(hex);
            }
            return hexString.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("Error al encriptar la contraseña", e);
        }
    }
}
