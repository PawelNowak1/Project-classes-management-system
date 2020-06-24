package com.bd2.backend.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Date;

@Entity
public class Attachment {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(length = 100)
    private String fileName;

    @Column(length = 50)
    private String fileType;

    private Date insertDate;

    @ManyToOne
    private Student student;

    @JsonIgnore
    @ManyToOne
    private Section section;

    @Column(length = 100)
    private String description;

    @Lob
    @JsonIgnore
    private byte[] content;

    public Attachment() {
    }

    public Attachment(String fileName, String fileType, Student student, Section section, String description, byte[] content) {
        this.fileName = fileName;
        this.fileType = fileType;
        this.insertDate = new Date();
        this.student = student;
        this.section = section;
        this.description = description;
        this.content = content;
    }

    public Long getId() {
        return id;
    }

    public String getFileName() {
        return fileName;
    }

    public String getFileType() {
        return fileType;
    }

    public Date getInsertDate() {
        return insertDate;
    }

    public Student getStudent() {
        return student;
    }

    public Section getSection() {
        return section;
    }

    public String getDescription() {
        return description;
    }

    public byte[] getContent() {
        return content;
    }
}
