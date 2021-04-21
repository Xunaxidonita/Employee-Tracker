const inquirer = require("inquirer");

const OPTIONS = [
  "view all departments",
  "view all roles",
  "view all employees",
  "add a department",
  "add a role",
  "add an employee",
  "update an employee role",
];

const mainMenu = () => {
  return inquirer
    .prompt([
      {
        type: "list",
        name: "selected",
        choices: OPTIONS,
      },
    ])
    .then((answers) => {
      return answers.selected;
    });
};

module.exports = {
  mainMenu,
  OPTIONS,
};
