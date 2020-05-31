package com.bd2.backend.rest;

import com.bd2.backend.entities.Semester;
import com.bd2.backend.entities.Student;
import com.bd2.backend.service.impl.SemesterServiceImpl;
import com.bd2.backend.service.impl.StudentServiceImpl;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@Controller
@RequestMapping("/semesters")
public class SemesterController {

    final SemesterServiceImpl semesterService;

    public SemesterController(SemesterServiceImpl semesterService) {
        this.semesterService = semesterService;
    }

    @RequestMapping(path = "/all", method = RequestMethod.GET)
    public ResponseEntity<Iterable<Semester>> findSemesters() {
        return ResponseEntity.ok(semesterService.findAllSemesters());
    }
}
