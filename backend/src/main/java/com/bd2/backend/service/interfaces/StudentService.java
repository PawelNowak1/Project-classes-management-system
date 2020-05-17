package com.bd2.backend.service.interfaces;

import com.bd2.backend.entities.Student;
import org.springframework.data.domain.Page;

public interface StudentService {

    Page<Student> findStudents(int page, int size, String name);
    Page<Student> findStudents(int page, int size, Long semesterId, String name);

}
