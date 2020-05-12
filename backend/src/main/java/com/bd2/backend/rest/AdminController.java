package com.bd2.backend.rest;

import com.bd2.backend.entities.User;
import com.bd2.backend.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@CrossOrigin(origins = "*", maxAge = 3600)
@Controller
@RequestMapping("/admin")
@PreAuthorize("hasRole('ROLE_ADMIN')")
public class AdminController {
    final UserService userService;

    public AdminController(UserService userService) {
        this.userService = userService;
    }

    @RequestMapping(path = "/paginated", method = RequestMethod.GET)
    public ResponseEntity<Page<User>> findStudents(@RequestParam(defaultValue = "0") Integer pageNo,
                                                      @RequestParam(defaultValue = "10") Integer pageSize,
                                                      @RequestParam(required = false) String username) {
        return ResponseEntity.ok(userService.findAdmins(pageNo, pageSize, username));
    }
}
