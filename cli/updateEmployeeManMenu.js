const inquirer = require("inquirer");

const modManEmployeeMenu = () => {
  return inquirer.prompt([
    {
      type: "list",
      name: "employee",
      message: "Which employee's manager do you want to update?",
      choices: ,
    },
    {
      type: "list",
      name: "manager",
      message: "Which employee do you want to set as the new manager?",
      choices: ,
    },
  ])
  .then((answers) => {
    return answers;
  });
};

module.exports = modManEmployeeMenu;
