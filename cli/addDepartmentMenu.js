const inquirer = require("inquirer");
const fetch = require("node-fetch");

const newDepartment = (department) =>
  fetch("http://localhost:3001/api/department", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: department }),
  });

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
      newDepartment(answers.department);
      return "Department added";
    });
};

module.exports = deptMenu;
