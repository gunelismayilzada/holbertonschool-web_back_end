import readDatabase from '../utils';

class StudentsController {
  static getAllStudents(req, res) {
    const db = process.argv[2];

    readDatabase(db)
      .then((data) => {
        let output = 'This is the list of our students';

        const fields = Object.keys(data).sort((a, b) => a.localeCompare(b));

        fields.forEach((field) => {
          output += `\nNumber of students in ${field}: ${data[field].length}. List: ${data[field].join(', ')}`;
        });

        res.status(200).send(output);
      })
      .catch(() => {
        res.status(500).send('Cannot load the database');
      });
  }

  static getAllStudentsByMajor(req, res) {
    const db = process.argv[2];
    const major = req.params.major;

    if (major !== 'CS' && major !== 'SWE') {
      res.status(500).send('Major parameter must be CS or SWE');
      return;
    }

    readDatabase(db)
      .then((data) => {
        res.status(200).send(`List: ${data[major].join(', ')}`);
      })
      .catch(() => {
        res.status(500).send('Cannot load the database');
      });
  }
}

export default StudentsController;
