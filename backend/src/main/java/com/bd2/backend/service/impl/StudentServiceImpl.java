package com.bd2.backend.service.impl;

import com.bd2.backend.entities.Student;
import com.bd2.backend.repository.StudentRepository;
import com.bd2.backend.service.interfaces.StudentService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
public class StudentServiceImpl implements StudentService {

    private final StudentRepository studentRepository;

    public StudentServiceImpl(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    @Override
    public Page<Student> findStudents(int page, int size, String name) {
        return studentRepository.findStudentsPaginated(name, PageRequest.of(page, size));
    }
}
