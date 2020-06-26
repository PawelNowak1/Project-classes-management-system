package com.bd2.backend.service.impl;

import com.bd2.backend.entities.Semester;
import com.bd2.backend.repository.SemesterRepository;
import com.bd2.backend.repository.StudentRepository;
import com.bd2.backend.service.interfaces.SemesterService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SemesterServiceImpl implements SemesterService {
    private final SemesterRepository semesterRepository;

    public SemesterServiceImpl(SemesterRepository semesterRepository) {
        this.semesterRepository = semesterRepository;
    }

    @Override
    public Iterable<Semester> findAllSemesters(Long semesterId) {
        if (semesterId != null)
            return this.semesterRepository.findAllStudentSemester(semesterId);
        return this.semesterRepository.findAll();
    }
}
