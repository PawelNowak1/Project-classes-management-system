package com.bd2.backend.repository;

import com.bd2.backend.entities.Attendance;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface AttendanceRepository extends CrudRepository<Attendance, Long> {

    @Query(value = "select a from Attendance a where (?1 is null or a.studentSection.id = ?1) and (?2 is null or a.studentSection.student.id = ?2)",
            nativeQuery = false)
    List<Attendance> findAttendace(Long sectionId, Long studentId);
}
