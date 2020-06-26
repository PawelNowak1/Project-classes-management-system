package com.bd2.backend.repository;

import com.bd2.backend.entities.Semester;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface SemesterRepository extends CrudRepository<Semester, Long> {
    @Query(value = "select s from Semester s join s.students st where (st.id = ?1)",
            nativeQuery = false)
    List<Semester> findAllStudentSemester(Long studentId);
}
