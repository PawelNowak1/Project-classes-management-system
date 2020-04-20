package com.bd2.backend.repository;

import com.bd2.backend.entities.Attendance;
import org.springframework.data.repository.CrudRepository;

public interface AttendanceRepository extends CrudRepository<Attendance, Long> {
}
