package com.bd2.backend.service.impl;

import com.bd2.backend.entities.Section;
import com.bd2.backend.entities.StudentSection;
import com.bd2.backend.repository.SectionRepository;
import com.bd2.backend.repository.StudentSectionRepository;
import com.bd2.backend.response.MarksResponse;
import com.bd2.backend.service.interfaces.SectionService;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SectionServiceImpl implements SectionService {

    private final SectionRepository sectionRepository;
    private final StudentSectionRepository studentSectionRepository;

    public SectionServiceImpl(SectionRepository sectionRepository, StudentSectionRepository studentSectionRepository) {
        this.sectionRepository = sectionRepository;
        this.studentSectionRepository = studentSectionRepository;
    }

    @Override
    public Long createSection(Section section) {
        return sectionRepository.save(section).getId();
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
    public Section findSection(Long sectionId) {
        Optional<Section> optionalSection = sectionRepository.findById(sectionId);
        return optionalSection.orElse(null);
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

    @Override
    public void changeSectionState(String state, Long sectionId) {
        Optional<Section> optionalSection = sectionRepository.findById(sectionId);
        if (optionalSection.isPresent()) {
            Section section = optionalSection.get();
            section.setState(state);
            sectionRepository.save(section);
        }
    }

    @Override
    public void setMarkToStudent(Integer mark, Long studentSectionId) {
        Optional<StudentSection> optionalSection = studentSectionRepository.findById(studentSectionId);
        if (optionalSection.isPresent()) {
            StudentSection studentSection = optionalSection.get();
            studentSection.setMark(mark);
            studentSection.setDate(new Date());
            studentSectionRepository.save(studentSection);
        }
    }

    @Override
    public Integer getSectionLimit(Long sectionId) {
        Optional<Section> section;
        if ((section = this.sectionRepository.findById(sectionId)).isPresent()) {
            return section.get().getSectionLimit();
        }
        return null;
    }

    @Override
    public Section getSection(Long sectionId) {
        Optional<Section> section;
        if ((section = this.sectionRepository.findById(sectionId)).isPresent()) {
            return section.get();
        }
        return null;
    }

    @Override
    public Long getCurrentStudentsCountInSection(Long sectionId) {
        List<StudentSection> studentsInSection = this.studentSectionRepository.findAllBySectionId(sectionId);
        if(studentsInSection != null) {
            return Long.valueOf(studentsInSection.stream().count());
        }
        return null;
    }

    @Override
    public boolean isStudentAlreadyInSection(Long studentId, Long sectionId) {
        return this.studentSectionRepository.findByStudentIdAndSectionId(studentId, sectionId).isPresent();
    }

    @Override
    public List<MarksResponse> getAllStudentsMarksInSection(Long sectionId) {
        return this.studentSectionRepository.findAllBySectionId(sectionId)
                .stream().map(studentSection ->
                        new MarksResponse(
                                studentSection.getDate(),
                                studentSection.getMark(),
                                studentSection.getSection().getId(),
                                studentSection.getStudent().getId()
                        )).collect(Collectors.toList());
    }
}
