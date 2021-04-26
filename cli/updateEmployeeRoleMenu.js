const inquirer = require("inquirer");
const fetch = require("node-fetch");
const getWholeRoster = require("../utils/getWholeRoster");

const getEmployees = async () => {
  const employees = await getWholeRoster("employees_list");
  return employees;
};
const getRoles = async () => {
  const roles = await getWholeRoster("roles_list");
  return roles;
};

const getId = function (name, array, key) {
  let myId;
  array.forEach((element) => {
    if (element[key] === name) {
      myId = element.id;
    }
  });
  return myId;
};

const updateRole = (id, role_id) =>
  fetch(`http://localhost:3001/api/employee/${id}/role`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(role_id),
  });

const modRoleEmployeeMenu = async () => {
  debugger;
  const employeeList = await getEmployees();
  const OPTIONS = employeeList.map((employee) => {
    return employee.manager;
  });
  const roleList = await getRoles();
  const OPTIONS2 = roleList.map((role) => {
    return role.title;
  });
  return inquirer
    .prompt([
      {
        type: "list",
        name: "employee",
        message: "Which employee's role do you want to change?",
        choices: OPTIONS,
      },
      {
        type: "list",
        name: "role",
        message: "What is the new role of your employee?",
        choices: OPTIONS2,
      },
    ])
    .then(async (answers) => {
      debugger;
      const employee = await getId(answers.employee, employeeList, "manager");
      const role = await getId(answers.role, roleList, "title");
      updateRole(employee, role);
      return "Employee's role updated";
    });
};

module.exports = modRoleEmployeeMenu;
