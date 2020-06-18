package com.bd2.backend.rest;

import com.bd2.backend.entities.Teacher;
import com.bd2.backend.service.impl.TeacherServiceImpl;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@CrossOrigin(origins = "*", maxAge = 3600)
@Controller
@RequestMapping("/teacher")
public class TeacherController {

    final TeacherServiceImpl teacherService;

    public TeacherController(TeacherServiceImpl teacherService) {
        this.teacherService = teacherService;
    }

    @RequestMapping(path = "/paginated", method = RequestMethod.GET)
    public ResponseEntity<Page<Teacher>> findTeachers(@RequestParam(defaultValue = "0") Integer pageNo,
                                                      @RequestParam(defaultValue = "10") Integer pageSize,
                                                      @RequestParam(required = false) String name,
                                                      @RequestParam(defaultValue = "true") Boolean active) {
        return ResponseEntity.ok(teacherService.findTeachers(pageNo, pageSize, name, active));
    }
}
