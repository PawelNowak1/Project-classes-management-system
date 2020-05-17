package com.bd2.backend.repository;

import com.bd2.backend.entities.Student;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface StudentRepository extends PagingAndSortingRepository<Student, Long> {

    @Query(value = "select s from Student s where (?1 is null or s.lastName like %?1% or s.firstName like %?1% or s.user.id like %?1%)",
            countQuery = "select count (s) from Student s where (?1 is null or s.lastName like %?1% or s.firstName like %?1% or s.user.id like %?1%)",
            nativeQuery = false)
    Page<Student> findStudentsPaginated(String name, Pageable pageable);

    @Query(value = "select s from Student s join s.semesters sm where sm.id = ?2 and (?1 is null or s.lastName like %?1% or s.firstName like %?1% or s.user.id like %?1%)",
            countQuery = "select count (s) from Student s join s.semesters sm where sm.id = ?2 and (?1 is null or s.lastName like %?1% or s.firstName like %?1% or s.user.id like %?1%)",
            nativeQuery = false)
    Page<Student> findStudentsPaginated(String name, Long semesterId, Pageable pageable);
}
