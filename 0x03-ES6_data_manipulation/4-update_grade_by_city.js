export default function updateStudentGradeByCity(students, city, newGrades) {
  const studentsInCity = students.filter((student) => student.location === city);

  const updatedStudents = studentsInCity.map((student) => {
    const updatedStudent = { ...student };

    const gradeObject = newGrades.find((grade) => grade.studentId === student.id);

    if (gradeObject) {
      updatedStudent.grade = gradeObject.grade;
    } else {
      updatedStudent.grade = 'N/A';
    }

    return updatedStudent;
  });

  return updatedStudents;
}
