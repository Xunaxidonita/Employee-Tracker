const inquirer = require("inquirer");

const OPTIONS = ["view all departments", "view all roles"];

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
