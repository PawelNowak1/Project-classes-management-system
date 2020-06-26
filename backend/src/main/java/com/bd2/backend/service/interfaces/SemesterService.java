package com.bd2.backend.service.interfaces;

import com.bd2.backend.entities.Semester;

import java.util.List;

public interface SemesterService {
    Iterable<Semester> findAllSemesters(Long studentId);
}
