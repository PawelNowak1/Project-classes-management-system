package com.bd2.backend.entities;

import javax.persistence.*;
import java.util.Date;

@Entity
public class Attachment {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String content; // change to blob

    private Date insertDate;

    private String description;

    @ManyToOne
    private Section section;

    @ManyToOne
    private Student student;
}
