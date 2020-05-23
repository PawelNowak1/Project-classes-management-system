package com.bd2.backend.rest;

import com.bd2.backend.entities.Section;
import com.bd2.backend.entities.StudentSection;
import com.bd2.backend.service.impl.SectionServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @RequestMapping(path = "/all", method = RequestMethod.GET)
    public ResponseEntity<Iterable<Section>> getAllSections(@RequestParam(required = false) Long semesterId) {
        return ResponseEntity.ok(sectionService.findAllSections(semesterId));
    }

    @RequestMapping(path = "/addStudent", method = RequestMethod.POST)
    public ResponseEntity<?> addStudent(@RequestBody StudentSection studentSection) {
        // TODO Walidacja stanu sekcji
        // TODO Jeżeli mark != null to wstawienie Daty (najlepiej chyba Trigger na tabeli)
        sectionService.addStudentToSection(studentSection);
        return ResponseEntity.ok("Dodano studenta do sekcji");
    }

    @RequestMapping(path = "/addStudents", method = RequestMethod.POST)
    public ResponseEntity<?> addStudent(@RequestBody List<StudentSection> studentSection) {
        // TODO Walidacja stanu sekcji
        // TODO Jeżeli mark != null to wstawienie Daty (najlepiej chyba Trigger na tabeli)
        for(StudentSection stud : studentSection)
            sectionService.addStudentToSection(stud);
        return ResponseEntity.ok("Dodano studenta do sekcji");
    }

    @RequestMapping(path = "/deleteStudent/{studentSectionId}", method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteStudentFromSection(@PathVariable("studentSectionId") Long studentSectionId) {
        sectionService.deleteStudentFromSection(studentSectionId);
        return ResponseEntity.ok("Usunięto studenta z sekcji");
    }

    @RequestMapping(path = "/students", method = RequestMethod.GET)
    public ResponseEntity<Iterable<StudentSection>> findStudentSections(@RequestParam(required = false) Long semesterId,
                                                               @RequestParam(required = false) Long sectiondId) {
        return ResponseEntity.ok(sectionService.findStudentSection(semesterId, sectiondId));
    }
}
