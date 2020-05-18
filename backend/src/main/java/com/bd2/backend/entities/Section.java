package com.bd2.backend.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
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
