import inquirer from './node_modules/inquirer/lib/inquirer.js';
// import fs from './node_modules/fs/lib/fs.js';
import fs from 'fs'
// var path = require('path');

console.log('Hi, this is a ');

const questions = [
  {
    type: 'input',
    name: 'title',
    message: 'What is the title of your repository?',
    default: 'My-Repository',
  },
  {
    type: 'input',
    name: 'description',
    message: 'Please describe your repository.',
    default: 'This is a repository.',
  },
  {
    type: "confirm",
    name: "table of contents",
    message: "Would you like to include a table of contents?",
    default: true
  },
  {
    type: 'input',
    name: 'installation',
    message: 'Please describe the installation process.',
    default: 'This is how you install it.',
  },
  {
    type: "input",
    name: "usage",
    message: "Please describe how to use your repository.",
    default: "This is how you use it."
  },
  {
    type: 'rawlist',
    name: 'license',
    message: 'Which license would you like to use?',
    choices: ['MIT', 'APACHE 2.0', 'GPL 3.0', 'BSD 3', 'None'],
  },
  {
    "type": "input",
    "name": "contributing",
    "message": "How can you contribute to this project?",
    default: "This is how you can contribute."
  },
  {
    type: 'input',
    name: 'tests',
    message: 'How has this project been tested?',
    default: 'This is how it has been tested.',
  },
  {
    type: 'input',
    name: 'questions',
    message: 'Who do you contact if there are any questions?',
    default: 'This is who you contact.',
  },
];

function parseAnswer (answers) {
  let keys = Object.keys(answers);
  let result = '';

  for (let i = 0; i < keys.length; i++) {
    let key = keys[i];
    let value = answers[key];

    if (key === 'title') {
      result += `# ${value}\n\n`;
    }

    if (key === 'description') {
      result += `## Description\n${value}\n\n`;
    }

    if (key === 'table of contents') {
      result += "## Table of Contents\n" + keys.map((index) => {
        return `* [${index}](#${index})\n`;
      }
    ).toString().replace(/,/g, '');
    result += "\n\n";;
    };
    if (key === 'installation') {
      result += `## Installation\n${value}\n\n`;
    }

    if (key === 'usage') {
      result += `## Usage\n${value}\n\n`;
    }

    if (key === 'license') {
      result += `## License\n${value}\n\n`;
    }

    if (key === 'contributing') {
      result += `## Contributing\n${value}\n\n`;
    }

    if (key === 'tests') {
      result += `## Tests\n${value}\n\n`;
    }

    if (key === 'questions') {
      result += `## Questions\n${value}\n\n`;
    }
  }
  console.log(result);
  return result;
}

function saveToDisk (data) {
  fs.writeFile('README.md', data, function (err) {
    if (err) throw err;
    console.log('Saved!');
  });
}

inquirer.prompt(questions).then((answers) => {
  saveToDisk(parseAnswer(answers));
});
