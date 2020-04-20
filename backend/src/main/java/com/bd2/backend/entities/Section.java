package com.bd2.backend.entities;

import javax.persistence.*;

@Entity
public class Section {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

    private String state; // change to ENUM or dictionary?

    private Integer sectionLimit;

    @ManyToOne
    private Topic topic;

    @ManyToOne
    private Semester semester;
}
