package com.bd2.backend.service.interfaces;

import com.bd2.backend.entities.Section;

public interface SectionService {
    void createSection(Section section);
    void deleteSection(Long sectionId);
}
