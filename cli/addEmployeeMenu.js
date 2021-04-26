const inquirer = require("inquirer");
const fetch = require("node-fetch");
const getWholeRoster = require("../utils/getWholeRoster");

const getRoles = async () => {
  const roles = await getWholeRoster("roles_list");
  return roles;
};

const getManagers = async () => {
  const managers = await getWholeRoster("employees_list");
  return managers;
};

const getId = function (column_name, array, key) {
  let myId;
  array.forEach((element) => {
    if (element[key] === column_name) {
      myId = element.id;
    }
  });
  return myId;
};

const newEmployee = (first_name, last_name, role_id, manager_id) =>
  fetch("http://localhost:3001/api/employee", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      first_name: first_name,
      last_name: last_name,
      role_id: role_id,
      manager_id: manager_id,
    }),
  });

const employeeMenu = async () => {
  const roleList = await getRoles();
  const OPTIONS1 = roleList.map((role) => {
    return role.title;
  });
  const managerList = await getManagers();
  const OPTIONS2 = managerList.map((manager) => {
    return manager.manager;
  });

  return inquirer
    .prompt([
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
        choices: OPTIONS1,
      },
      {
        type: "list",
        name: "manager",
        message: "Choose a manager",
        choices: OPTIONS2,
      },
    ])
    .then((answers) => {
      debugger;
      const roleId = getId(answers.role, roleList, "title");
      const managerId = getId(answers.manager, managerList, "manager");
      newEmployee(answers.first_name, answers.last_name, roleId, managerId);
      return "Employee added";
    });
};

module.exports = employeeMenu;
