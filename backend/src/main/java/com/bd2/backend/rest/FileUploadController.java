package com.bd2.backend.rest;

import com.bd2.backend.entities.Attachment;
import com.bd2.backend.entities.Section;
import com.bd2.backend.entities.Student;
import com.bd2.backend.repository.SectionRepository;
import com.bd2.backend.repository.StudentRepository;
import com.bd2.backend.response.AttachmentsResponse;
import com.bd2.backend.service.AttachmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@Controller
@RequestMapping("/file")
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

        Optional<Section> section = this.sectionRepository.findById(sectionId);
        Optional<Student> student = this.studentRepository.findById(studentId);
        if (!section.isPresent() || !student.isPresent()) {
            return ResponseEntity.badRequest()
                    .body(Collections.singletonMap("error", "section or student does not exist"));
        }
        Attachment attachment;
        attachment = this.attachmentService.saveAttachment(
                file,
                description,
                section.get(),
                student.get()
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
                .body(Collections.singletonMap("error", "Failed to upload file " + file.getName()));
    }

    @GetMapping("/download/{fileId}")
    public ResponseEntity<?> downloadFile(@PathVariable("fileId") Long fileId) {
        try {
            Attachment attachment = this.attachmentService.getFile(fileId);
            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(attachment.getFileType()))
                    .contentLength(attachment.getContent().length)
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + attachment.getFileName() + "\"")
                    .body(new ByteArrayResource(attachment.getContent()));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(Collections.singletonMap("error", e.getMessage()));
        }
    }

    @GetMapping("/all/{sectionId}")
    public ResponseEntity<?> getAllAttachmentsForSection(@PathVariable("sectionId") Long sectionId) {
        AttachmentsResponse attachmentsResponse = this.attachmentService.getAllAttachmentsForSection(sectionId);
        if(attachmentsResponse == null) {
            return ResponseEntity.badRequest()
                    .body("Cannot find attachment(s) for section with id " + sectionId + "!\n");
        }

        return ResponseEntity.ok(attachmentsResponse);
    }

    @GetMapping("/info/{fileId}")
    public ResponseEntity<?> getFileInfo(@PathVariable("fileId") Long fileId) {
        try {
            Attachment attachment = this.attachmentService.getFile(fileId);
            return ResponseEntity.ok()
                    .body(attachment);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(Collections.singletonMap("error", e.getMessage()));
        }
    }
}
