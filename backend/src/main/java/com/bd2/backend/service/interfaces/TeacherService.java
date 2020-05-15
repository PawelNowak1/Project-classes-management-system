package com.bd2.backend.service.interfaces;

import com.bd2.backend.entities.Teacher;
import org.springframework.data.domain.Page;

public interface TeacherService {
    Page<Teacher> findTeachers(int page, int size, String name);
}
