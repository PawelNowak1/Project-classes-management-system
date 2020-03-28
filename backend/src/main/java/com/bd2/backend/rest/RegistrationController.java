package com.bd2.backend.rest;

import com.bd2.backend.entities.User;
import com.bd2.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/registration")
public class RegistrationController {

    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        User userExists = userService.findUserByUsername(user.getUsername());
        if (userExists != null) {
            return new ResponseEntity("User with specified username already exists!", HttpStatus.BAD_REQUEST);
        }

        try {
            return new ResponseEntity("User has been registered successfully!", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

}
