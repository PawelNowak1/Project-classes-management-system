package com.bd2.backend.service.impl;

import com.bd2.backend.entities.Section;
import com.bd2.backend.entities.Semester;
import com.bd2.backend.entities.Student;
import com.bd2.backend.entities.StudentSection;
import com.bd2.backend.repository.SectionRepository;
import com.bd2.backend.repository.SemesterRepository;
import com.bd2.backend.repository.StudentRepository;
import com.bd2.backend.repository.StudentSectionRepository;
import com.bd2.backend.response.MarksResponse;
import com.bd2.backend.response.StudentsInSectionResponse;
import com.bd2.backend.service.interfaces.SectionService;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class SectionServiceImpl implements SectionService {

    private final SectionRepository sectionRepository;
    private final StudentSectionRepository studentSectionRepository;
    private final StudentRepository studentRepository;
    private final SemesterRepository semesterRepository;

    public SectionServiceImpl(SectionRepository sectionRepository, StudentSectionRepository studentSectionRepository,
                              StudentRepository studentRepository, SemesterRepository semesterRepository) {
        this.sectionRepository = sectionRepository;
        this.studentSectionRepository = studentSectionRepository;
        this.studentRepository = studentRepository;
        this.semesterRepository = semesterRepository;
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
    public StudentsInSectionResponse getStudentsInSection(Long sectionId) {
        StudentsInSectionResponse studentsInSectionResponse = new StudentsInSectionResponse();
        List<StudentSection> studentSections = this.studentSectionRepository.findAllBySectionId(sectionId);
        if (studentSections.isEmpty()) {
            return null;
        }
        studentSections.forEach(studentSection -> {
            studentsInSectionResponse.setSection(studentSection.getSection());
            studentsInSectionResponse.addStudent(
                    studentSection.getStudent(),
                    studentSection.getDate(),
                    studentSection.getMark());
        });

        return studentsInSectionResponse;
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
        if (studentsInSection != null) {
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

    @Override
    public List<?> getSummaryForSemester(Long semesterId, Long teacherId) {
        List<StudentSection> studentsSections = this.studentSectionRepository.findAllBySectionSemesterIdAndSectionTopicTeacherId(semesterId, teacherId);
        if (studentsSections.isEmpty()) {
            return Collections.singletonList("Error: cannot generate summary for this semester - " +
                    "semester with specified id does not exist or teacher does not have section on this semester!");
        }
        return studentsSections
                .stream().map(studentSection ->
                        new MarksResponse(
                                studentSection.getDate(),
                                studentSection.getMark(),
                                studentSection.getSection().getId(),
                                studentSection.getStudent().getId()
                        )).collect(Collectors.toList());
    }

    @Override
    public List<Student> findStudentsWithoutSection(Long semesterId) {
        return this.studentRepository.findStudentsWithoutSection(semesterId);
    }

    @Override
    public boolean isStudentOnTheSameSemesterAsSection(Long studentId, Long sectionId) {
        Optional<Semester> semester = this.semesterRepository.findById(getSection(sectionId).getSemester().getId());
        if (semester.isPresent()) {
            List<Student> studentsOnSemester = semester.get().getStudents();
            if (studentsOnSemester.isEmpty()) {
                return false;
            }
            return studentsOnSemester
                    .stream()
                    .mapToLong(student -> student.getUser().getId())
                    .anyMatch(id -> id == studentId);
        }
        return false;
    }

    @Override
    public boolean isStudentAlreadyInSectionOnSemester(Long studentId, Long sectionId) {
        List<Student> students = findStudentsWithoutSection(getSection(sectionId).getSemester().getId());
        if (students.isEmpty()) {
            return true;
        }
        return students.stream()
                .mapToLong(student -> student.getUser().getId())
                .noneMatch(id -> id == studentId);
    }

    @Override
    public StudentSection getStudentSection(Long studentSectionId) {
        Optional<StudentSection> studentSection = this.studentSectionRepository.findById(studentSectionId);
        if (studentSection.isPresent()) {
            return studentSection.get();
        }
        return null;
    }
}
