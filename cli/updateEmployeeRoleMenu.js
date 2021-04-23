const inquirer = require("inquirer");

const modRoleEmployeeMenu = () => {
  return inquirer.prompt([
    {
      type: "list",
      name: "employee",
      message: "Which employee's role do you want to update?",
      choices: ,
    },
  ])
  .then((answers) => {
    return answers.employee;
  });
};

module.exports = modEmployeeMenu;