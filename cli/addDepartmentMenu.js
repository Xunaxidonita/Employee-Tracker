const inquirer = require("inquirer");

const deptMenu = () => {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "department",
        message: "Enter the new department's name",
      },
    ])
    .then((answers) => {
      return answers.department;
    });
};

module.exports = deptMenu;
