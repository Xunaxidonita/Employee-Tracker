const inquirer = require("inquirer");

const roleMenu = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "Enter the new role's title",
    },
    {
      type: "input",
      name: "salary",
      message: "What is the salary for this role?",
    },
    {
      type: "list",
      name: "department",
      message: "What department does it belong to?",
      choices: ,
    },
  ])
  .then((answers) => {
    return answers;
  });
};

module.exports = roleMenu;
