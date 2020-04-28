package com.bd2.backend.entities;

import javax.persistence.*;

@Entity
public class Teacher {

    @Id
    @GeneratedValue
    private Long id;
    private String firstName;
    private String lastName;

    @OneToOne(fetch = FetchType.EAGER)
    @MapsId
    private User user;
}
