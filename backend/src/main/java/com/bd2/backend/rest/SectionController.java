package com.bd2.backend.rest;

import com.bd2.backend.entities.Section;
import com.bd2.backend.entities.StudentSection;
import com.bd2.backend.security.SectionStates;
import com.bd2.backend.service.impl.SectionServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.time.LocalDateTime;
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
        return ResponseEntity.ok(sectionService.createSection(section));
    }

    @RequestMapping(path = "/status", method = RequestMethod.POST)
    public ResponseEntity<?> changeSectionState(@RequestParam String state, @RequestParam Long sectionId) {
        sectionService.changeSectionState(state, sectionId);
        return ResponseEntity.ok("Zmieniono status");
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
        Section section = this.sectionService.getSection(studentSection.getSection().getId());
        if (section == null) {
            return ResponseEntity
                    .badRequest()
                    .body("Section with id " + studentSection.getSection().getId() + " does not exist!\n");
        }
        if (this.sectionService.isStudentAlreadyInSection(studentSection.getStudent().getId(), section.getId())) {
            return ResponseEntity
                    .badRequest()
                    .body("Student with id " + studentSection.getStudent().getId()
                            + " is already in section with id " + section.getId() + "!\n");
        }
        if (section.getState().equals(SectionStates.close.name())) {
            return ResponseEntity
                    .badRequest()
                    .body("Section is already closed - new student cannot be added.\n");
        }
        if (this.sectionService.getCurrentStudentsCountInSection(studentSection.getSection().getId()) >= section.getSectionLimit()) {
            return ResponseEntity
                    .badRequest()
                    .body("Section is already full - new student cannot be added!\n");
        }

        if(studentSection.getMark() != null) {
            studentSection.setDate(Timestamp.valueOf(LocalDateTime.now()));
        }

        sectionService.addStudentToSection(studentSection);
        return ResponseEntity.ok("Dodano studenta do sekcji\n");
    }

    @RequestMapping(path = "/addStudents", method = RequestMethod.POST) //przetestować
    public ResponseEntity<?> addStudent(@RequestBody List<StudentSection> studentSection) {
        // TODO Walidacja stanu sekcji
        // TODO Jeżeli mark != null to wstawienie Daty (najlepiej chyba Trigger na tabeli)
        for (StudentSection stud : studentSection) //tutaj walidacja po kazdym dodaniu!!
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

    @RequestMapping(path = "/mark", method = RequestMethod.POST)
    public ResponseEntity<?> setMarkToStudent(@RequestParam Integer mark, @RequestParam Long studentSectionId) {
        sectionService.setMarkToStudent(mark, studentSectionId);
        return ResponseEntity.ok("Wystawiono ocene");
    }
}
