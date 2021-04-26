const inquirer = require("inquirer");
const fetch = require("node-fetch");
const getWholeRoster = require("../utils/getWholeRoster");

const getDepartments = async () => {
  const departments = await getWholeRoster("departments");
  return departments;
};

const getId = function (department, array) {
  debugger;
  let myId;
  array.forEach((element) => {
    if (element.name === department) {
      myId = element.id;
    }
  });
  return myId;
};

const newRole = (title, salary, department_id) =>
  fetch("http://localhost:3001/api/role", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      salary: salary,
      department_id: department_id,
    }),
  });

const roleMenu = async () => {
  const departmentList = await getDepartments();
  const OPTIONS = departmentList.map((dept) => {
    return dept.name;
  });
  return inquirer
    .prompt([
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
        choices: OPTIONS,
      },
    ])
    .then((answers) => {
      const myId = getId(answers.department, departmentList);
      newRole(answers.title, answers.salary, myId);
      return "Role added";
    });
};

module.exports = roleMenu;
