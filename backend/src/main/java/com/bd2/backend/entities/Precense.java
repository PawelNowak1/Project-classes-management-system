package com.bd2.backend.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import java.util.Date;

@Entity
public class Precense {

    @Id
    @GeneratedValue
    private Long id;

    private Date date;

    private String status; // change to ENUM or dictionary?

    @ManyToOne
    StudentSection studentSection;
}
