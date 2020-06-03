package com.bd2.backend.repository;

import com.bd2.backend.entities.Attachment;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface AttachmentRepository extends CrudRepository<Attachment, Long> {
    List<Attachment> findAllBySectionId(Long sectionId);
}
