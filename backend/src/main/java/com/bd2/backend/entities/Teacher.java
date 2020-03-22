package com.bd2.backend.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Teacher {

    @Id
    @GeneratedValue
    private Long id;
    private String firstName;
    private String lastName;
}
