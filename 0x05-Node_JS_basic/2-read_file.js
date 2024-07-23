const fs = require('fs');

module.exports = function countStudents(pathFile) {
  try {
    const data = fs.readFileSync(pathFile, 'utf8');
    const lines = data.split('\n');
    const relevantLines = lines.slice(1);
    let totalStudents = 0;
    const fields = {};
    for (const line of relevantLines) {
      if (line.trim() !== '') {
        const parts = line.split(',');
        const firstName = parts[0].trim();
        const field = parts[parts.length - 1].trim();
        if (!fields[field]) {
          fields[field] = { count: 0, students: [] };
        }
        fields[field].count += 1;
        totalStudents += 1;
        fields[field].students.push(firstName);
      }
    }
    console.log(`Number of students: ${totalStudents}`);
    for (const field in fields) {
      if (Object.prototype.hasOwnProperty.call(fields, field)) {
        console.log(`Number of students in ${field}: ${fields[field].count}. List: ${fields[field].students.join(', ')}`);
      }
    }
  } catch (err) {
    throw new Error('Cannot load the database');
  }
};
