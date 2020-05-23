package com.bd2.backend.service.interfaces;

import com.bd2.backend.entities.Section;
import com.bd2.backend.entities.StudentSection;

public interface SectionService {
    void createSection(Section section);
    void deleteSection(Long sectionId);
    Iterable<Section> findAllSections(Long semesterId);

    void addStudentToSection(StudentSection studentSection);

    Iterable<StudentSection> findStudentSection(Long semesterId, Long sectionId);

    void deleteStudentFromSection(Long studentSectionId);
}
