const inquirer = require("inquirer");

const employeeMenu = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "first_name",
      message: "Enter the first name of the new employee",
    },
    {
      type: "input",
      name: "last_name",
      message: "Enter the last name",
    },
    {
      type: "list",
      name: "role",
      message: "Choose a role",
      choices: ,
    },
    {
        type: "list",
        name: "manager",
        message: "Choose a manager",
        choices: ,
      },
  ]).then((answers) => {
    return answers;
  });
};

module.exports = roleMenu;