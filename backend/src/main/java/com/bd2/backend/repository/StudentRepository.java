package com.bd2.backend.repository;

import com.bd2.backend.entities.Student;
import org.springframework.data.repository.CrudRepository;

public interface StudentRepository extends CrudRepository<Student, Long> {
}
