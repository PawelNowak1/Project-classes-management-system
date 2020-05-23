package com.bd2.backend.service.impl;

import com.bd2.backend.entities.Section;
import com.bd2.backend.entities.StudentSection;
import com.bd2.backend.repository.SectionRepository;
import com.bd2.backend.repository.StudentSectionRepository;
import com.bd2.backend.service.interfaces.SectionService;
import org.springframework.stereotype.Service;

@Service
public class SectionServiceImpl implements SectionService {

    private final SectionRepository sectionRepository;
    private final StudentSectionRepository studentSectionRepository;

    public SectionServiceImpl(SectionRepository sectionRepository, StudentSectionRepository studentSectionRepository) {
        this.sectionRepository = sectionRepository;
        this.studentSectionRepository = studentSectionRepository;
    }

    @Override
    public void createSection(Section section) {
        sectionRepository.save(section);
    }

    @Override
    public void deleteSection(Long sectionId) {
        sectionRepository.deleteById(sectionId);
    }

    @Override
    public Iterable<Section> findAllSections(Long semesterId) {
        return sectionRepository.findAllBySemesterId(semesterId);
    }

    @Override
    public void addStudentToSection(StudentSection studentSection) {
        studentSectionRepository.save(studentSection);
    }

    @Override
    public Iterable<StudentSection> findStudentSection(Long semesterId, Long sectionId) {
        return studentSectionRepository.findAllStudentSections(semesterId, sectionId);
    }

    @Override
    public void deleteStudentFromSection(Long studentSectionId) {
        studentSectionRepository.deleteById(studentSectionId);
    }
}
