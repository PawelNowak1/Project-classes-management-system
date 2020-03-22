package com.bd2.backend.entities;

import javax.persistence.*;
import java.util.Set;

@Entity
public class Semester {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String course;

    private Integer year; // maybe change to string if year format is e.g. 2019/2020

    private Integer semesterNumber;

    @ManyToMany(mappedBy = "semesters")
    Set<Student> students;
}
