package com.bd2.backend.repository;

import com.bd2.backend.entities.Section;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface SectionRepository extends CrudRepository<Section, Long> {

    @Query(value = "select s from Section s where ?1 is null or s.semester.id = ?1",
            nativeQuery = false)
    List<Section> findAllBySemesterId(Long semesterId);
}
