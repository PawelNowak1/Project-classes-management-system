package com.bd2.backend.response;

import com.bd2.backend.entities.Section;
import com.bd2.backend.entities.Student;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

@Data
@AllArgsConstructor
public class AttachmentsResponse {
    private Section section;
    private List<StudentsWithAttachments> students;

    public AttachmentsResponse() {
        this.students = new LinkedList<>();
    }

    public void addStudentWithAttachments(Student student, Long id, String fileName, String fileType,
                                          Date insertDate, String description) {
        Optional<StudentsWithAttachments> studentsAttachments =
                this.students
                        .stream()
                        .filter(element -> element.getStudent().getUser().getId() == student.getUser().getId())
                        .findFirst();
        if (studentsAttachments.isPresent()) {
            int indexInList = this.students.indexOf(studentsAttachments.get());
            studentsAttachments.get().addAttachmentForStudent(id, fileName, fileType, insertDate, description);
            this.students.set(indexInList, studentsAttachments.get());
        } else {
            this.students.add(new StudentsWithAttachments(
                    student,
                    id,
                    fileName,
                    fileType,
                    insertDate,
                    description
            ));
        }
    }
}

@Data
class StudentsWithAttachments {
    private Student student;
    private List<StudentsAttachments> studentsAttachments = new LinkedList<>();

    public StudentsWithAttachments() {
        this.studentsAttachments = new LinkedList<>();
    }

    public StudentsWithAttachments(Student student, Long id, String fileName, String fileType,
                                   Date insertDate, String description) {
        this.student = student;
        this.studentsAttachments.add(new StudentsAttachments(
                id,
                fileName,
                fileType,
                insertDate,
                description
        ));
    }

    public void addAttachmentForStudent(Long id, String fileName, String fileType,
                                        Date insertDate, String description) {
        this.studentsAttachments.add(new StudentsAttachments(
                id,
                fileName,
                fileType,
                insertDate,
                description
        ));
    }
}

@Data
@AllArgsConstructor
class StudentsAttachments {
    private Long id;
    private String fileName;
    private String fileType;
    private Date insertDate;
    private String description;
}