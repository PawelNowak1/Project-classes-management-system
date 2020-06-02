package com.bd2.backend.service.impl;

import com.bd2.backend.entities.Attendance;
import com.bd2.backend.entities.Student;
import com.bd2.backend.repository.AttendanceRepository;
import com.bd2.backend.repository.StudentRepository;
import com.bd2.backend.service.interfaces.StudentService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class StudentServiceImpl implements StudentService {

    private final StudentRepository studentRepository;
    private final AttendanceRepository attendanceRepository;

    public StudentServiceImpl(StudentRepository studentRepository, AttendanceRepository attendanceRepository) {
        this.studentRepository = studentRepository;
        this.attendanceRepository = attendanceRepository;
    }

    @Override
    public Page<Student> findStudents(int page, int size, String name) {
        return studentRepository.findStudentsPaginated(name, PageRequest.of(page, size));
    }

    @Override
    public Page<Student> findStudents(int page, int size, Long semesterId, String name) {
        return studentRepository.findStudentsPaginated(name, semesterId, PageRequest.of(page, size));
    }

    @Override
    public void saveAttendance(Attendance attendance) {
        attendance.setDate(Timestamp.valueOf(LocalDateTime.now()));
        attendanceRepository.save(attendance);
    }

    @Override
    public List<Attendance> getAttendance(Long sectionId, Long studentId) {
        return attendanceRepository.findAttendace(sectionId, studentId);
    }

    @Override
    public void deleteAttendance(Long attendanceId) {
        attendanceRepository.deleteById(attendanceId);
    }
}
