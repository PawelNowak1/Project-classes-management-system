package com.bd2.backend.request;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class StudentMarkRequest {
    private Long studentSectionId;
    private Integer mark;
}
