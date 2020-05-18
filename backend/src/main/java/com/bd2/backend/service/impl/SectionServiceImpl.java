package com.bd2.backend.service.impl;

import com.bd2.backend.entities.Section;
import com.bd2.backend.repository.SectionRepository;
import com.bd2.backend.service.interfaces.SectionService;
import org.springframework.stereotype.Service;

@Service
public class SectionServiceImpl implements SectionService {

    private final SectionRepository sectionRepository;

    public SectionServiceImpl(SectionRepository sectionRepository) {
        this.sectionRepository = sectionRepository;
    }

    @Override
    public void createSection(Section section) {
        sectionRepository.save(section);
    }

    @Override
    public void deleteSection(Long sectionId) {
        sectionRepository.deleteById(sectionId);
    }
}
