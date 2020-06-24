package com.bd2.backend.request;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
public class MarkRequest {
    private Date date;
    private List<StudentMarkRequest> studentMarkRequestList;
}
