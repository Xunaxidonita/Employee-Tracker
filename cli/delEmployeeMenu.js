const inquirer = require("inquirer");
const fetch = require("node-fetch");
const getWholeRoster = require("../utils/getWholeRoster");

const getEmployees = async () => {
  const employees = await getWholeRoster("employees_list");
  return employees;
};

const deleteEmployee = (id) =>
  fetch(`http://localhost:3001/api/employee/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

const getId = function (name, array) {
  let myId;
  array.forEach((element) => {
    if (element.manager === name) {
      myId = element.id;
    }
  });
  return myId;
};

const delEmployeeMenu = async () => {
  const employeeList = await getEmployees();
  const OPTIONS = employeeList.map((employee) => {
    return employee.manager;
  });

  return inquirer
    .prompt([
      {
        type: "list",
        name: "selected",
        message: "What employee do you want to remove?",
        choices: OPTIONS,
      },
    ])
    .then(async (answers) => {
      const employee = await getId(answers.selected, employeeList);
      deleteEmployee(employee);
      return "Employee removed";
    });
};

module.exports = delEmployeeMenu;
