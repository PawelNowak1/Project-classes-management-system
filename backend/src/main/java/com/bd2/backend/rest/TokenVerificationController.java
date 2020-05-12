package com.bd2.backend.rest;

import com.bd2.backend.entities.User;
import com.bd2.backend.repository.StudentRepository;
import com.bd2.backend.repository.TeacherRepository;
import com.bd2.backend.repository.UserRepository;
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
            if (user != null) {
                switch (user.getRole().getRole()) {
                    case ROLE_TEACHER:
                        return ResponseEntity.ok(this.teacherRepository.findById(user.getId()).get());
                    case ROLE_STUDENT:
                        return ResponseEntity.ok(this.studentRepository.findById(user.getId()).get());
                    case ROLE_ADMIN:
                        return ResponseEntity.ok(user);
                }
            }
            return ResponseEntity.badRequest()
                    .body("Token is valid, but user associated with token doesn't exist!\n");
        } else {
            return ResponseEntity.ok(Collections.singletonMap("valid", "no"));
        }
    }
}
