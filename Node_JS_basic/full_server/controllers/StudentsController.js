import readDatabase from '../utils';

class StudentsController {
  static getAllStudents(req, res, DATABASE) {
    readDatabase(DATABASE)
      .then((fields) => {
        const response = ['This is the list of our students'];

        const sorted = Object.keys(fields).sort((a, b) => a.localeCompare(b));

        sorted.forEach((field) => {
          response.push(
            `Number of students in ${field}: ${fields[field].length}. List: ${fields[field].join(', ')}`
          );
        });

        res.status(200).send(response.join('\n'));
      })
      .catch(() => {
        res.status(500).send('Cannot load the database');
      });
  }

  static getAllStudentsByMajor(req, res, DATABASE) {
    const { major } = req.params;

    if (major !== 'CS' && major !== 'SWE') {
      res.status(500).send('Major parameter must be CS or SWE');
      return;
    }

    readDatabase(DATABASE)
      .then((fields) => {
        res.status(200).send(`List: ${fields[major].join(', ')}`);
      })
      .catch(() => {
        res.status(500).send('Cannot load the database');
      });
  }
}

export default StudentsController;
