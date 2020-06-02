package com.bd2.backend.rest;

import com.bd2.backend.entities.Attendance;
import com.bd2.backend.entities.Student;
import com.bd2.backend.service.impl.StudentServiceImpl;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @RequestMapping(path = "/{semesterId}/paginated", method = RequestMethod.GET)
    public ResponseEntity<?> findStudents(@PathVariable("semesterId") Long semesterId,
                                          @RequestParam(defaultValue = "0") Integer pageNo,
                                          @RequestParam(defaultValue = "10") Integer pageSize,
                                          @RequestParam(required = false) String name) {
        return ResponseEntity.ok(studentService.findStudents(pageNo, pageSize, semesterId, name));
    }

    @RequestMapping(path = "/checkattendance", method = RequestMethod.POST)
    public ResponseEntity<?> checkAttendance(@RequestBody Attendance attendance) {
        studentService.saveAttendance(attendance);
        return ResponseEntity.ok("ok");
    }

    @RequestMapping(path = "/checkaattendances", method = RequestMethod.POST)
    public ResponseEntity<?> checkAttendanceList(@RequestBody List<Attendance> attendance) {
        for(Attendance attend : attendance)
            studentService.saveAttendance(attend);
        return ResponseEntity.ok("ok");
    }

    @RequestMapping(path = "/getattendance", method = RequestMethod.GET)
    public ResponseEntity<List<Attendance>> checkAttendanceList(@RequestParam(required = false) Long sectionId,
                                                 @RequestParam(required = false) Long studentId) {
        return ResponseEntity.ok(studentService.getAttendance(sectionId, studentId));
    }

    @RequestMapping(path = "/attendance/delete/{attendanceId}", method = RequestMethod.GET)
    public ResponseEntity<?> checkAttendanceList(@PathVariable("attendanceId") Long attendanceId) {
        studentService.deleteAttendance(attendanceId);
        return ResponseEntity.ok("ok");
    }
}
