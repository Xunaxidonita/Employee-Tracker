const inquirer = require("inquirer");
const fetch = require("node-fetch");
const getWholeRoster = require("../utils/getWholeRoster");

const getEmployees = async () => {
  const employees = await getWholeRoster("employees_list");
  return employees;
};

const getId = function (name, array) {
  let myId;
  array.forEach((element) => {
    if (element.manager === name) {
      myId = element.id;
    }
  });
  return myId;
};

const getManagerId = function (name, array) {
  if (name === "none") {
    return null;
  } else {
    const myId = getId(name, array);
    return myId;
  }
};

const updateManager = (id, manager_id) =>
  fetch(`http://localhost:3001/api/employee/${id}/manager`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ manager_id: manager_id }),
  });

const updateEmployeeManager = async () => {
  const employeeList = await getEmployees();
  const OPTIONS = employeeList.map((employee) => {
    return employee.manager;
  });
  const OPTIONS1 = ["none"];
  const OPTIONS2 = OPTIONS1.concat(OPTIONS);
  return inquirer
    .prompt([
      {
        type: "list",
        name: "employee",
        message: "Which employee's manager do you want to change?",
        choices: OPTIONS,
      },
      {
        type: "list",
        name: "manager",
        message: "Which employee do you want to set as the new manager?",
        choices: OPTIONS2,
      },
    ])
    .then((answers) => {
      const employee = getManagerId(answers.employee, employeeList);
      const manager = getManagerId(answers.manager, employeeList);
      updateManager(employee, manager);
      return "Employee's manager updated";
    });
};

module.exports = updateEmployeeManager;
