const inquirer = require("inquirer");
const deptMenu = require("./addDepartmentMenu");
const byDeptMenu = require("./viewEmployeesByDept");
const byRoleMenu = require("./viewEmployeesByRole");
const byManagerMenu = require("./viewEmployeesByManager");

const OPTIONS = [
  "View all departments",
  "View all roles",
  "View all employees",
  "View all employees by department",
  "View all employees by role",
  "View all emoployees by manager",
  "Add a department",
  "Add a role",
  "Add an employee",
  "Remove employee",
  "Update an employee's manager",
  "Update an employee's role",
];

const getWholeRoster = async (tableName) => {
  let rawData = await fetch(`/api/${tableName}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  let toTable = await rawData.json();
  return toTable.data;
};

const answerChecker = async function (answer) {
  let data;
  switch (answer) {
    case OPTIONS[0]:
      data = await getWholeRoster("departments");
    case OPTIONS[1]:
      data = await getWholeRoster("roles");
    case OPTIONS[2]:
      data = await getWholeRoster("employees");
    case OPTIONS[3]:
      data = await byDeptMenu();
    case OPTIONS[4]:
      data = await byRoleMenu();
    case OPTIONS[5]:
      data = await byManagerMenu();
    case OPTIONS[6]:
      data = await newDeptMenu();
    case OPTIONS[7]:
      data = await newRoleMenu();
    case OPTIONS[8]:
      data = await newEmployeeMenu();
    case OPTIONS[9]:
      data = await delEmployeeMenu();
    case OPTIONS[10]:
      data = await updateEmployeeManager();
    case OPTIONS[9]:
      data = await updateEmployeeRole();
    case OPTIONS[10]:
  }
  return data;
};

const mainMenu = () => {
  return inquirer
    .prompt([
      {
        type: "list",
        name: "selected",
        message: "What do you want to do?",
        choices: OPTIONS,
      },
    ])
    .then((answers) => {
      answerChecker(answers).then((data) => {});
    });
};

module.exports = {
  mainMenu,
  OPTIONS,
};
