package com.bd2.backend.rest;

import com.bd2.backend.entities.Attendance;
import com.bd2.backend.entities.Student;
import com.bd2.backend.response.MarksResponse;
import com.bd2.backend.service.impl.StudentServiceImpl;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@PreAuthorize("hasAnyRole('ROLE_STUDENT', 'ROLE_TEACHER', 'ROLE_ADMIN')")
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
                                                      @RequestParam(required = false) String name,
                                                      @RequestParam(defaultValue = "true") Boolean onlyActive){
        return ResponseEntity.ok(studentService.findStudents(pageNo, pageSize, name, onlyActive));
    }

    @RequestMapping(path = "/{semesterId}/paginated", method = RequestMethod.GET)
    public ResponseEntity<?> findStudents(@PathVariable("semesterId") Long semesterId,
                                          @RequestParam(defaultValue = "0") Integer pageNo,
                                          @RequestParam(defaultValue = "10") Integer pageSize,
                                          @RequestParam(required = false) String name,
                                          @RequestParam(defaultValue = "true") Boolean onlyActive) {
        return ResponseEntity.ok(studentService.findStudents(pageNo, pageSize, semesterId, name, onlyActive));
    }

    @GetMapping("/all")
    public ResponseEntity<List<Student>> getAllStudents() {
        return ResponseEntity.ok(this.studentService.getAllStudents());
    }

    @GetMapping("/all/{semesterId}")
    public ResponseEntity<List<Student>> getAllStudentsOnSpecifiedSemester(@PathVariable(value = "semesterId") Long semesterId) {
        return ResponseEntity.ok(this.studentService.getAllStudentsOnSemester(semesterId));
    }

    @RequestMapping(path = "/checkattendance", method = RequestMethod.POST)
    public ResponseEntity<?> checkAttendance(@RequestBody Attendance attendance) {
        studentService.saveAttendance(attendance);
        return ResponseEntity.ok("ok");
    }

    @RequestMapping(path = "/checkaattendances", method = RequestMethod.POST)
    public ResponseEntity<?> checkAttendanceList(@RequestBody List<Attendance> attendance) {
        for (Attendance attend : attendance)
            studentService.saveAttendance(attend);
        return ResponseEntity.ok("ok");
    }

    @RequestMapping(path = "/getattendance", method = RequestMethod.GET)
    public ResponseEntity<List<Attendance>> getAttendanceList(@RequestParam(required = false) Long sectionId,
                                                                @RequestParam(required = false) Long studentId) {
        return ResponseEntity.ok(studentService.getAttendance(sectionId, studentId));
    }

    @RequestMapping(path = "/attendance/delete/{attendanceId}", method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteAttendance(@PathVariable("attendanceId") Long attendanceId) {
        studentService.deleteAttendance(attendanceId);
        return ResponseEntity.ok("ok");
    }

    @GetMapping(path = "/mark/{studentId}")
    public ResponseEntity<List<MarksResponse>> getMarkForStudent(@PathVariable("studentId") Long studentId) {
        return ResponseEntity.ok(this.studentService.getAllStudentsMarks(studentId));
    }
}
