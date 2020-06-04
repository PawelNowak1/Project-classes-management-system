package com.bd2.backend.rest;

import com.bd2.backend.entities.Section;
import com.bd2.backend.entities.StudentSection;
import com.bd2.backend.security.SectionStates;
import com.bd2.backend.service.impl.SectionServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
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

    @RequestMapping(path = "/{sectionId}", method = RequestMethod.GET)
    public ResponseEntity<Section> getSection(@PathVariable("sectionId") Long sectionId) {
        return ResponseEntity.ok(sectionService.findSection(sectionId));
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

        if (studentSection.getMark() != null) {
            studentSection.setDate(new Date());
        }

        sectionService.addStudentToSection(studentSection);
        return ResponseEntity.ok("Dodano studenta do sekcji\n");
    }

    @RequestMapping(path = "/addStudents", method = RequestMethod.POST) //przetestować
    public ResponseEntity<?> addStudent(@RequestBody List<StudentSection> studentsSections) {
        Section section = this.sectionService.getSection(studentsSections.get(0).getSection().getId());

        int studentsFromRequestAlreadyInSection = 0;
        for (StudentSection studentSection : studentsSections) {
            if (this.sectionService.isStudentAlreadyInSection(studentSection.getStudent().getId(), section.getId())) {
                ++studentsFromRequestAlreadyInSection;
            }
        }

        if (section == null) {
            return ResponseEntity
                    .badRequest()
                    .body("Section with id " + studentsSections.get(0).getSection().getId() + " does not exist!\n");
        }
        if (section.getState().equals(SectionStates.close.name())) {
            return ResponseEntity
                    .badRequest()
                    .body("Section is already closed - new students cannot be added.\n");
        }
        if (this.sectionService.getCurrentStudentsCountInSection(studentsSections.get(0).getSection().getId())
                + studentsSections.size() - studentsFromRequestAlreadyInSection > section.getSectionLimit()) {
            return ResponseEntity
                    .badRequest()
                    .body("In this section is not enough free spaces - new students cannot be added!\n");
        }
        for (StudentSection studentSection : studentsSections) {
            if (studentSection.getMark() != null) {
                studentSection.setDate(new Date());
            }
            if (!this.sectionService.isStudentAlreadyInSection(studentSection.getStudent().getId(), section.getId())) {
                sectionService.addStudentToSection(studentSection);
            }
        }

        return ResponseEntity.ok("All students added to section!\n");
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
