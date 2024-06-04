// Define the function
function getStudentsByLocation(students, city) {
  return students.filter((student) => student.location === city);
}

// Export the function
export default getStudentsByLocation;
