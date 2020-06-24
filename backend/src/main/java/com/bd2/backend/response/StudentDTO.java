package com.bd2.backend.response;

import com.bd2.backend.entities.Attachment;
import com.bd2.backend.entities.Attendance;
import com.bd2.backend.entities.Student;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StudentDTO {
    private Student student;
    private Long studentSectionId;
    private List<Attachment> attachment;
    private List<Attendance> attendances;
}
