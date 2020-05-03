package com.bd2.backend.repository;

import com.bd2.backend.entities.Student;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface StudentRepository extends PagingAndSortingRepository<Student, Long> {

    @Query(value = "select s from Student s where (?1 is null or s.lastName like %?1%) and (?2 is null or s.firstName like %?2%)",
            countQuery = "select count (s) from Student s where (?1 is null or s.lastName like %?1%) and (?2 is null or s.firstName like %?2%)",
            nativeQuery = false)
    Page<Student> findStudentsPaginated(String lastName, String firstName, Pageable pageable);
}
