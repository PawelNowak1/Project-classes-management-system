package com.bd2.backend.rest;

import com.bd2.backend.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.Map;

@Controller
@RequestMapping("/token")
public class TokenVerificationController {

    @Autowired
    private JwtUtils jwtUtils;

    @GetMapping("/verify/{token}")
    public ResponseEntity<?> verifyToken(@PathVariable("token") String token) {
        if (jwtUtils.validateJwtToken(token)) {
            Map<String, String> response = new LinkedHashMap<>();
            response.put("username", jwtUtils.getUsernameFromJwtToken(token));
            response.put("valid", "yes");
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.ok(Collections.singletonMap("valid", "no"));
        }
    }
}
