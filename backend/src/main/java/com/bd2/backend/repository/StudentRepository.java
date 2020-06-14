package com.bd2.backend.repository;

import com.bd2.backend.entities.Student;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface StudentRepository extends PagingAndSortingRepository<Student, Long> {

    @Query(value = "select s from Student s where (?1 is null or s.lastName like %?1% or s.firstName like %?1% or s.user.id like %?1%) and (?2 is null or s.user.active = ?2)",
            countQuery = "select count (s) from Student s where (?1 is null or s.lastName like %?1% or s.firstName like %?1% or s.user.id like %?1%) and (?2 is null or s.user.active = ?2)",
            nativeQuery = false)
    Page<Student> findStudentsPaginated(String name, String active, Pageable pageable);

    @Query(value = "select s from Student s join s.semesters sm where sm.id = ?2 and (?1 is null or s.lastName like %?1% or s.firstName like %?1% or s.user.id like %?1%) and (?3 is null or s.user.active = ?3)",
            countQuery = "select count (s) from Student s join s.semesters sm where sm.id = ?2 and (?1 is null or s.lastName like %?1% or s.firstName like %?1% or s.user.id like %?1%) and (?3 is null or s.user.active = ?3)",
            nativeQuery = false)
    Page<Student> findStudentsPaginated(String name, Long semesterId, String active, Pageable pageable);

    @Query(value = "select s from Student s join s.semesters sm where sm.id = ?1 and s.id NOT IN (select studentSect.student.id from StudentSection studentSect join studentSect.section section WHERE section.semester.id = ?1)",
            nativeQuery = false)
    List<Student> findStudentsWithoutSection(Long semesterId);

    List<Student> findAll();

    @Query(value = "SELECT s FROM Student s JOIN s.semesters sm WHERE sm.id = ?1",
            countQuery = "SELECT COUNT (s) FROM Student s JOIN s.semesters sm WHERE sm.id = ?1",
            nativeQuery = false)
    List<Student> findAllBySemesters(Long semesterId);
}
