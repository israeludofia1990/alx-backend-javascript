const fs = require('fs');

module.exports = function countStudents(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }

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
          fields[field].students.push(firstName);
          totalStudents += 1;
        }
      }

      console.log(`Number of students: ${totalStudents}`);

      for (const field in fields) {
        if (Object.prototype.hasOwnProperty.call(fields, field)) {
          console.log(`Number of students in ${field}: ${fields[field].count}. List: ${fields[field].students.join(', ')}`);
        }
      }

      resolve();
    });
  });
};
