package com.bd2.backend.rest;

import com.bd2.backend.entities.Section;
import com.bd2.backend.entities.Student;
import com.bd2.backend.entities.StudentSection;
import com.bd2.backend.response.MarksResponse;
import com.bd2.backend.response.StudentsInSectionResponse;
import com.bd2.backend.security.SectionStates;
import com.bd2.backend.service.MyUserDetails;
import com.bd2.backend.service.impl.SectionServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@PreAuthorize("hasAnyRole('ROLE_STUDENT', 'ROLE_TEACHER')")
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
        if(!this.sectionService.isStudentOnTheSameSemesterAsSection(studentSection.getStudent().getId(), studentSection.getSection().getId())) {
            return ResponseEntity
                    .badRequest()
                    .body("Student with id " + studentSection.getStudent().getId() + " must be on the same semester as section with id "
                    + studentSection.getSection().getId() + "!\n");

        }
        if (this.sectionService.isStudentAlreadyInSectionOnSemester(studentSection.getStudent().getId(), studentSection.getSection().getId())) {
            return ResponseEntity
                    .badRequest()
                    .body("Student with id " + studentSection.getStudent().getId() + " is already in section on the same semester as section with id " +
                            studentSection.getSection().getId() + "!\n");
        }
        if (!section.getState().equals(SectionStates.reg.name())) {
            return ResponseEntity
                    .badRequest()
                    .body("Section is not in registered state anymore - new student cannot be added.\n");
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

    @RequestMapping(path = "/addStudents", method = RequestMethod.POST)
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
        if(!this.sectionService.isStudentOnTheSameSemesterAsSection(studentsSections.get(0).getStudent().getId(), studentsSections.get(0).getSection().getId())) {
            return ResponseEntity
                    .badRequest()
                    .body("All students must be on the same semester as section with id "
                            + studentsSections.get(0).getSection().getId() + "!\n");

        }
        if (this.sectionService.isStudentAlreadyInSectionOnSemester(studentsSections.get(0).getStudent().getId(), studentsSections.get(0).getSection().getId())) {
            return ResponseEntity
                    .badRequest()
                    .body("Students are already in section on the same semester as section with id " +
                            studentsSections.get(0).getSection().getId() + "!\n");
        }
        if (!section.getState().equals(SectionStates.reg.name())) {
            return ResponseEntity
                    .badRequest()
                    .body("Section is not in registered state anymore - new students cannot be added.\n");
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

    @RequestMapping(path = "/getStudentsWithoutSection/{semesterId}", method = RequestMethod.GET)
    public ResponseEntity<List<Student>> getStudentsWithoutSection(@PathVariable("semesterId") Long semesterId) {
        return ResponseEntity.ok(sectionService.findStudentsWithoutSection(semesterId));
    }

    @RequestMapping(path = "/deleteStudent/{studentSectionId}", method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteStudentFromSection(@PathVariable("studentSectionId") Long studentSectionId) {
        StudentSection studentSection = this.sectionService.getStudentSection(studentSectionId);
        if (studentSection == null) {
            return ResponseEntity
                    .badRequest()
                    .body("Student is not in this section!\n");
        }
        if (!studentSection.getSection().getState().equals(SectionStates.reg.name())) {
            return ResponseEntity
                    .badRequest()
                    .body("Section is not in registered state anymore - student cannot be deleted from it.\n");
        }
        sectionService.deleteStudentFromSection(studentSectionId);
        return ResponseEntity.ok("Usunięto studenta z sekcji\n");
    }

    @RequestMapping(path = "/students", method = RequestMethod.GET)
    public ResponseEntity<Iterable<StudentSection>> findStudentSection(@RequestParam(required = false) Long semesterId,
                                                                         @RequestParam(required = false) Long sectionId) {
        return ResponseEntity.ok(sectionService.findStudentSection(semesterId, sectionId));
    }

    @GetMapping(path="/students/{sectionId}")
    public ResponseEntity<StudentsInSectionResponse> getStudentsInSection(@PathVariable("sectionId") Long sectionId) {
        return ResponseEntity.ok(this.sectionService.getStudentsInSection(sectionId));
    }

    @RequestMapping(path = "/mark", method = RequestMethod.POST)
    public ResponseEntity<?> setMarkToStudent(@RequestParam Integer mark, @RequestParam Long studentSectionId) {
        sectionService.setMarkToStudent(mark, studentSectionId);
        return ResponseEntity.ok("Wystawiono ocene");
    }

    @GetMapping(path = "/mark/{sectionId}")
    public ResponseEntity<List<MarksResponse>> getAllMarksForStudentsInSection(@PathVariable("sectionId") Long sectionId) {
        return ResponseEntity.ok(this.sectionService.getAllStudentsMarksInSection(sectionId));
    }

    @GetMapping(path = "/summary/{semesterId}")
    public ResponseEntity<?> getSummaryForSemester(@PathVariable("semesterId") Long semesterId) {
        MyUserDetails userDetails = (MyUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return ResponseEntity.ok(this.sectionService.getSummaryForSemester(semesterId, userDetails.getId()));
    }
}
