package com.bd2.backend.entities;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class Topic {

    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private String description;
    private String status; // change to ENUM or dictionary?

    @ManyToOne(fetch = FetchType.EAGER)
    private Teacher teacher;
}
