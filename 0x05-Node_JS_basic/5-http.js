const fs = require('fs');
const http = require('http');

const databaseFilePath = process.argv[2];

function countStudents(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }
      const lines = data.split('\n');
      const relevantLines = lines.slice(1).filter((line) => line.trim() !== '');
      let totalStudents = 0;
      const fields = {};
      for (const line of relevantLines) {
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
      let result = `Number of students: ${totalStudents}\n`;
      for (const field in fields) {
        if (Object.prototype.hasOwnProperty.call(fields, field)) {
          result += `Number of students in ${field}: ${fields[field].count}. List: ${fields[field].students.join(', ')}\n`;
        }
      }
      resolve(result.trim()); // Ensure to resolve with a string
    });
  });
}

module.exports = countStudents;

const app = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  if (req.url === '/') {
    res.statusCode = 200;
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    res.statusCode = 200;
    res.write('This is the list of our students\n');
    countStudents(databaseFilePath)
      .then((data) => {
        res.write(data);
        res.end();
      })
      .catch((error) => {
        res.write(error.message);
        res.end();
      });
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
});

app.listen(1245, () => {
  console.log('Server is listening on port 1245');
});

module.exports = app;
