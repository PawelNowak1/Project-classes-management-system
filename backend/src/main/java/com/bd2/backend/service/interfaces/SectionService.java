package com.bd2.backend.service.interfaces;

import com.bd2.backend.entities.Section;
import com.bd2.backend.entities.Student;
import com.bd2.backend.entities.StudentSection;
import com.bd2.backend.response.MarksResponse;
import com.bd2.backend.response.StudentsInSectionResponse;

import java.util.List;

public interface SectionService {
    Long createSection(Section section);
    void deleteSection(Long sectionId);
    Iterable<Section> findAllSections(Long semesterId);

    Section findSection(Long sectionId);

    void addStudentToSection(StudentSection studentSection);

    void addStudentToSection(Long studentId, Long sectionId);

    Iterable<StudentSection> findStudentSection(Long semesterId, Long sectionId);

    StudentsInSectionResponse getStudentsInSection(Long sectionId);

    void deleteStudentFromSection(Long studentSectionId);

    void deleteAllStudentsFromSection(Long sectionId);

    void changeSectionState(String state, Long sectionId);

    void setMarkToStudent(Integer mark, Long studentSectionId);

    Integer getSectionLimit(Long sectionId);

    Section getSection(Long sectionId);

    Long getCurrentStudentsCountInSection(Long sectionId);

    boolean isStudentAlreadyInSection(Long studentId, Long sectionId);

    List<MarksResponse> getAllStudentsMarksInSection(Long sectionId);

    List<?> getSummaryForSemester(Long semesterId, Long teacherId);

    List<Student> findStudentsWithoutSection(Long semesterId);

    boolean isStudentOnTheSameSemesterAsSection(Long studentId, Long sectionId);

    boolean isStudentAlreadyInSectionOnSemester(Long studentId, Long sectionId);

    StudentSection getStudentSection(Long studentSectionId);
}
