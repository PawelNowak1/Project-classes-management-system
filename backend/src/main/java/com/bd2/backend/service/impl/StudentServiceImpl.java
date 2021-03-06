package com.bd2.backend.service.impl;

import com.bd2.backend.entities.Attendance;
import com.bd2.backend.entities.Student;
import com.bd2.backend.entities.StudentSection;
import com.bd2.backend.repository.AttendanceRepository;
import com.bd2.backend.repository.StudentRepository;
import com.bd2.backend.repository.StudentSectionRepository;
import com.bd2.backend.request.StudentAttendanceRequest;
import com.bd2.backend.request.StudentMarkRequest;
import com.bd2.backend.response.MarksResponse;
import com.bd2.backend.service.interfaces.StudentService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class StudentServiceImpl implements StudentService {

    private final StudentRepository studentRepository;
    private final AttendanceRepository attendanceRepository;
    private final StudentSectionRepository studentSectionRepository;

    public StudentServiceImpl(StudentRepository studentRepository, AttendanceRepository attendanceRepository,
                              StudentSectionRepository studentSectionRepository) {
        this.studentRepository = studentRepository;
        this.attendanceRepository = attendanceRepository;
        this.studentSectionRepository = studentSectionRepository;
    }

    @Override
    public Page<Student> findStudents(int page, int size, String name, Boolean active) {
        if (active)
            return studentRepository.findStudentsPaginated(name, "Y", PageRequest.of(page, size));
        return studentRepository.findStudentsPaginated(name, "N", PageRequest.of(page, size));
    }

    @Override
    public Page<Student> findStudents(int page, int size, Long semesterId, String name, Boolean active) {
        if (active)
            return studentRepository.findStudentsPaginated(name, semesterId, "Y", PageRequest.of(page, size));
        return studentRepository.findStudentsPaginated(name, semesterId, "N", PageRequest.of(page, size));
    }

    @Override
    public List<Student> getAllStudents() {
        return this.studentRepository.findAll();
    }

    @Override
    public List<Student> getAllStudentsOnSemester(Long semesterId) {
        return this.studentRepository.findAllBySemesters(semesterId);
    }

    @Override
    public void saveAttendance(Attendance attendance) {
        if (attendance.getDate() == null)
            attendance.setDate(new Date());
        attendanceRepository.save(attendance);
    }

    @Override
    public void saveAttendance(StudentAttendanceRequest studentAttendanceRequest, Date date) {
        Attendance attendance = new Attendance();
        if (date == null)
            attendance.setDate(new Date());
        else
            attendance.setDate(date);
        attendance.setStatus(studentAttendanceRequest.getStatus());
        Optional<StudentSection> section = studentSectionRepository.findById(studentAttendanceRequest.getStudentSectionId());
        section.ifPresent(attendance::setStudentSection);
        attendanceRepository.save(attendance);
    }

    @Override
    public void saveMark(StudentMarkRequest mark, Date date) {
        Optional<StudentSection> studentSection = studentSectionRepository.findById(mark.getStudentSectionId());
        if (studentSection.isPresent()) {
            if (date == null)
                studentSection.get().setDate(new Date());
            else
                studentSection.get().setDate(date);
            studentSection.get().setMark(mark.getMark());
            studentSectionRepository.save(studentSection.get());
        }
    }

    @Override
    public List<Attendance> getAttendance(Long sectionId, Long studentId) {
        return attendanceRepository.findAttendace(sectionId, studentId);
    }

    @Override
    public void deleteAttendance(Long attendanceId) {
        attendanceRepository.deleteById(attendanceId);
    }

    @Override
    public List<MarksResponse> getAllStudentsMarks(Long studentId) {
        return this.studentSectionRepository.getAllByStudentUserId(studentId)
                .stream().map(studentSection ->
                    new MarksResponse(studentSection.getDate(),
                            studentSection.getMark(),
                            studentSection.getSection().getId(),
                            studentSection.getStudent().getId())
                ).collect(Collectors.toList());
    }
}
