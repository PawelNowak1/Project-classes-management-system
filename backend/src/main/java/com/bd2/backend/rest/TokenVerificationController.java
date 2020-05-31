package com.bd2.backend.rest;

import com.bd2.backend.entities.User;
import com.bd2.backend.repository.StudentRepository;
import com.bd2.backend.repository.TeacherRepository;
import com.bd2.backend.repository.UserRepository;
import com.bd2.backend.response.JwtResponse;
import com.bd2.backend.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Collections;

@CrossOrigin(origins = "*", maxAge = 3600)
@Controller
@RequestMapping("/token")
public class TokenVerificationController {

    private JwtUtils jwtUtils;
    private UserRepository userRepository;
    private TeacherRepository teacherRepository;
    private StudentRepository studentRepository;

    @Autowired
    public TokenVerificationController(JwtUtils jwtUtils, UserRepository userRepository,
                                       TeacherRepository teacherRepository, StudentRepository studentRepository) {
        this.jwtUtils = jwtUtils;
        this.userRepository = userRepository;
        this.teacherRepository = teacherRepository;
        this.studentRepository = studentRepository;
    }

    @GetMapping("/verify/{token}")
    public ResponseEntity<?> verifyToken(@PathVariable("token") String token) {
        if (jwtUtils.validateJwtToken(token)) {
            User user = this.userRepository.findByUsername(jwtUtils.getUsernameFromJwtToken(token));

            return ResponseEntity.ok(new JwtResponse(
                    token,
                    user.getId(),
                    user.getUsername(),
                    user.getEmail(),
                    user.getRole().getRole().toString()
            ));
        } else {
            return ResponseEntity.ok(Collections.singletonMap("valid", "no"));
        }
    }
}
