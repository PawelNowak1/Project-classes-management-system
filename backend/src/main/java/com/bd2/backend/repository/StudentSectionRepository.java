package com.bd2.backend.repository;

import com.bd2.backend.entities.StudentSection;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface StudentSectionRepository extends CrudRepository<StudentSection, Long> {
    @Query(value = "select s from StudentSection s where (?1 is null or s.section.semester.id = ?1) and (?2 is null or s.section.id = ?2)",
            nativeQuery = false)
    List<StudentSection> findAllStudentSections(Long semesterId, Long sectionId);

    Optional<StudentSection> findByStudentIdAndSectionId(Long studentId, Long sectionId);

    List<StudentSection> findAllBySectionId(Long sectionId);
    List<StudentSection> getAllByStudentUserId(Long studentUserId);
    List<StudentSection> findAllBySectionSemesterIdAndSectionTopicTeacherId(Long semesterId, Long teacherId);
}
