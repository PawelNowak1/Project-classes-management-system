package com.bd2.backend.response;

import com.bd2.backend.entities.Section;
import com.bd2.backend.entities.Student;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;
import java.util.LinkedList;
import java.util.List;

@Data
public class StudentsInSectionResponse {
    private Section section;
    private List<StudentsInSection> studentsInSection;

    public StudentsInSectionResponse() {
        this.studentsInSection = new LinkedList<>();
    }

    public void addStudent(Student student, Date date, Integer mark) {
        this.studentsInSection.add(new StudentsInSection(
                student,
                date,
                mark
        ));
    }
}

@Data
@AllArgsConstructor
class StudentsInSection {
    private Student student;
    private Date date;
    private Integer mark;
}
