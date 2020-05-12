package com.bd2.backend.rest;

import com.bd2.backend.entities.Role;
import com.bd2.backend.entities.Student;
import com.bd2.backend.entities.Teacher;
import com.bd2.backend.entities.User;
import com.bd2.backend.repository.RoleRepository;
import com.bd2.backend.repository.StudentRepository;
import com.bd2.backend.repository.TeacherRepository;
import com.bd2.backend.repository.UserRepository;
import com.bd2.backend.request.RegistrationRequest;
import com.bd2.backend.security.JwtUtils;
import com.bd2.backend.security.Roles;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.validation.Valid;

@CrossOrigin(origins = "*", maxAge = 3600)
@Controller
@RequestMapping("/registration")
public class RegistrationController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    TeacherRepository teacherRepository;

    @Autowired
    StudentRepository studentRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @PostMapping
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegistrationRequest registrationRequest) {
        if (userRepository.existsByUsername(registrationRequest.getUsername()) || userRepository.existsByEmail(registrationRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body("Error! User with specified username or e-mail already exists!");
        }

        User user = new User(
                registrationRequest.getUsername(),
                encoder.encode(registrationRequest.getPassword()),
                registrationRequest.getEmail(),
                registrationRequest.getActive()
        );

        String roleFromRequest = registrationRequest.getRole();
        Role userRole;
        if (roleFromRequest == null) {
            userRole = roleRepository.findByRole(Roles.ROLE_TEACHER);
        } else {
            switch (roleFromRequest) {
                case "admin":
                    userRole = roleRepository.findByRole(Roles.ROLE_ADMIN);
                    break;
                case "teacher":
                    userRole = roleRepository.findByRole(Roles.ROLE_TEACHER);
                    break;
                default:
                    userRole = roleRepository.findByRole(Roles.ROLE_STUDENT);
            }
        }

        user.setRole(userRole);
        userRepository.save(user);
        if (userRole.getRole().equals(Roles.ROLE_TEACHER))
            teacherRepository.save(new Teacher(registrationRequest.getName(), registrationRequest.getLastName(), user));
        if (userRole.getRole().equals(Roles.ROLE_STUDENT))
            studentRepository.save(new Student(registrationRequest.getName(), registrationRequest.getLastName(), user));
        return ResponseEntity.ok("User " + user.getUsername() + " registered successfully!");
    }
}
