package com.bd2.backend.request;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class StudentAttendanceRequest {
    private Long studentSectionId;
    private String status;
}
