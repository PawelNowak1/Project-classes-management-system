package com.bd2.backend.repository;

import com.bd2.backend.entities.Attachment;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface AttachmentRepository extends CrudRepository<Attachment, Long> {
    List<Attachment> findAllBySectionId(Long sectionId);

    @Query(value = "select a from Attachment a where (?1 is null or a.section.id = ?1) and (?2 is null or a.student.id = ?2)",
            nativeQuery = false)
    List<Attachment> findAttachment(Long sectionId, Long studentId);
}
