package com.bd2.backend.repository;

import com.bd2.backend.entities.Teacher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface TeacherRepository extends PagingAndSortingRepository<Teacher, Long> {

    @Query(value = "select t from Teacher t where (?1 is null or t.lastName like %?1%) and (?2 is null or t.firstName like %?2%)",
            countQuery = "select count (t) from Teacher t where (?1 is null or t.lastName like %?1%) and (?2 is null or t.firstName like %?2%)",
            nativeQuery = false)
    Page<Teacher> findTeacherPaginated(String lastName, String firstName, Pageable pageable);
}
