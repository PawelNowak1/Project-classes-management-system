package com.bd2.backend.rest;

import com.bd2.backend.entities.Student;
import com.bd2.backend.service.impl.StudentServiceImpl;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@Controller
@RequestMapping("/student")
public class StudentController {

    final StudentServiceImpl studentService;

    public StudentController(StudentServiceImpl studentService) {
        this.studentService = studentService;
    }

    @RequestMapping(path = "/paginated", method = RequestMethod.GET)
    public ResponseEntity<Page<Student>> findStudents(@RequestParam(defaultValue = "0") Integer pageNo,
                                                   @RequestParam(defaultValue = "10") Integer pageSize,
                                                   @RequestParam(required = false) String name) {
        return ResponseEntity.ok(studentService.findStudents(pageNo, pageSize, name));
    }
}
