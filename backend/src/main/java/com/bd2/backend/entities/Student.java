package com.bd2.backend.entities;

import lombok.Data;

import javax.persistence.*;
import java.util.*;

@Data
@Entity
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String firstName;

    private String lastName;

    @ManyToMany
    @JoinTable(
            name = "student_semester",
            joinColumns = @JoinColumn(name = "student_id"),
            inverseJoinColumns = @JoinColumn(name = "semester_id"))
    Set<Semester> semesters;

    @OneToOne(fetch = FetchType.EAGER)
    @MapsId
    private User user;

    public Student() {
    }

    public Student(String firstName, String lastName, User user) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.user = user;
    }

    public Student(String firstName, String lastName, User user, Semester semester) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.user = user;
        this.semesters = new HashSet<>(Collections.singletonList(semester));
    }
}
