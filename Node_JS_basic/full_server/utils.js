import fs from 'fs';

const readDatabase = (filePath) => new Promise((resolve, reject) => {
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      reject(err);
      return;
    }

    const lines = data.trim().split('\n');
    const students = {};

    for (let i = 1; i < lines.length; i += 1) {
      const line = lines[i].split(',');
      const firstname = line[0];
      const field = line[3];

      if (!students[field]) students[field] = [];
      students[field].push(firstname);
    }

    resolve(students);
  });
});

export default readDatabase;
