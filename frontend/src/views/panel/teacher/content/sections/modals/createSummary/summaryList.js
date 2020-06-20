import React, { useState, useEffect } from 'react';

const SummaryList = ({ summary, students, sections }) => {
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [filteredSections, setFilteredSections] = useState([]);

    useEffect(() => {
        setFilteredStudents(
            ...filteredStudents,
            students.filter((s) =>
                summary.find((sum) => sum.studentId === s.id)
            )
        );

        setFilteredSections(
            ...filteredSections,
            sections.filter((s) =>
                summary.find((sum) => sum.sectionId === s.id)
            )
        );
    }, []);

    const createStudent = (summaryEntry) => {
        var student = filteredStudents.find(
            (s) => s.id === summaryEntry.studentId
        );
        var section = filteredSections.find(
            (x) => x.id === summaryEntry.sectionId
        );

        if (student && section) {
            return {
                mark: summaryEntry.mark ?? 'brak',
                date: summaryEntry.date ?? 'brak',
                fullName: createName(student),
                section: section.name ? section.name : 'brak',
            };
        }

        return {};
    };

    const mapStudentFromSummary = () => {
        return summary.map((x) => createStudent(x));
    };

    const createName = (student) => {
        if (student && student.firstName && student.lastName)
            return student.firstName + ' ' + student.lastName;

        return 'brak';
    };

    return mapStudentFromSummary().map((s) => (
        <tr>
            <td>{s.date}</td>
            <td className="name">{s.section}</td>
            <td>{s.fullName}</td>
            <td>{s.mark}</td>
        </tr>
    ));
};

export default SummaryList;
