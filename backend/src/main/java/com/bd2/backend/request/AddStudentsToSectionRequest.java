package com.bd2.backend.request;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class AddStudentsToSectionRequest {
    private List<Long> studentIds;
    private Long sectionId;
}
