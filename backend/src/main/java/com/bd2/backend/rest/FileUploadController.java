package com.bd2.backend.rest;

import com.bd2.backend.entities.Attachment;
import com.bd2.backend.repository.SectionRepository;
import com.bd2.backend.repository.StudentRepository;
import com.bd2.backend.service.AttachmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.Map;

@Controller
@RequestMapping("/file")
@PreAuthorize("hasRole('ROLE_STUDENT')")
public class FileUploadController {

    private final AttachmentService attachmentService;
    private final SectionRepository sectionRepository;
    private final StudentRepository studentRepository;

    @Autowired
    public FileUploadController(AttachmentService attachmentService, SectionRepository sectionRepository, StudentRepository studentRepository) {
        this.attachmentService = attachmentService;
        this.sectionRepository = sectionRepository;
        this.studentRepository = studentRepository;
    }

    @PostMapping("/upload")
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file, @RequestParam("description") String description,
                                        @RequestParam("studentId") Long studentId, @RequestParam("sectionId") Long sectionId) {
        Attachment attachment = this.attachmentService.saveAttachment(
                file,
                description,
                sectionRepository.findById(sectionId).get(),
                studentRepository.findById(studentId).get()
        );

        if (attachment != null) {
            Map<String, String> response = new LinkedHashMap<>();
            response.put("file_id", attachment.getId().toString());
            response.put("file_name", attachment.getFileName());
            response.put("file_type", attachment.getFileType());
            response.put("insert_date", attachment.getInsertDate().toString());
            response.put("file_size", String.valueOf(file.getSize()));

            return ResponseEntity.ok(response);
        }
        return ResponseEntity.badRequest()
                .body(Collections.singletonList("Failed to upload file " + file.getName()));
    }

    @GetMapping("/download/{fileId}")
    public ResponseEntity<Resource> downloadFile(@PathVariable("fileId") String fileId) {
        Attachment attachment = this.attachmentService.getFile(Long.valueOf(fileId));

        if (attachment != null) {
            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(attachment.getFileType()))
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + attachment.getFileName() + "\"")
                    .body(new ByteArrayResource(attachment.getContent()));
        }

        return ResponseEntity.badRequest()
                .body(null);

    }
}
