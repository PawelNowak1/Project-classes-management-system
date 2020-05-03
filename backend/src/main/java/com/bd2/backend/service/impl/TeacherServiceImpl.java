package com.bd2.backend.service.impl;

import com.bd2.backend.entities.Teacher;
import com.bd2.backend.repository.TeacherRepository;
import com.bd2.backend.service.interfaces.TeacherService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
public class TeacherServiceImpl implements TeacherService {

    private final TeacherRepository teacherRepository;

    public TeacherServiceImpl(TeacherRepository teacherRepository) {
        this.teacherRepository = teacherRepository;
    }

    @Override
    public Page<Teacher> findTeachers(int page, int size, String firstName, String lastName) {
        return teacherRepository.findTeacherPaginated(lastName, firstName, PageRequest.of(page, size));
    }
}
