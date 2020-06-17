package com.bd2.backend.entities;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class StudentSection {

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    private Student student;

    @ManyToOne
    private Section section;

    private Integer mark;

    private Date date;

    public StudentSection(Student student, Section section) {
        this.student = student;
        this.section = section;
    }
}
