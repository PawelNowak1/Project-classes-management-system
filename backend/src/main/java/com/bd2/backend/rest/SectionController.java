package com.bd2.backend.rest;

import com.bd2.backend.entities.Section;
import com.bd2.backend.service.impl.SectionServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@Controller
@RequestMapping("/sections")
public class SectionController {

    final SectionServiceImpl sectionService;
    public SectionController(SectionServiceImpl sectionService) {
        this.sectionService = sectionService;
    }

    @RequestMapping(path = "/create", method = RequestMethod.POST)
    public ResponseEntity<?> createSection(@RequestBody Section section) {
        sectionService.createSection(section);
        return ResponseEntity.ok("dodano sekcje");
    }

    @RequestMapping(path = "/delete/{sectionId}", method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteSection(@PathVariable("sectionId") Long sectionId) {
        sectionService.deleteSection(sectionId);
        return ResponseEntity.ok("usunięto sekcje");
    }
}
