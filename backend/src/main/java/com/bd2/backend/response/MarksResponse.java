package com.bd2.backend.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;

@AllArgsConstructor
@Data
public class MarksResponse {

    private Date date;
    private Integer mark;
    private Long sectionId;
    private Long studentId;
}
