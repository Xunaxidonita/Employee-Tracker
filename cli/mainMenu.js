const inquirer = require("inquirer");
const cTable = require("console.table");
const newDeptMenu = require("./addDepartmentMenu");
const byDeptMenu = require("./viewEmployeesByDept");
const byRoleMenu = require("./viewEmployeesByRole");
const byManagerMenu = require("./viewEmployeesByManager");
const getWholeRoster = require("../utils/getWholeRoster");
const newRoleMenu = require("./addRoleMenu");
const newEmployeeMenu = require("./addEmployeeMenu");
const delEmployeeMenu = require("./delEmployeeMenu");
const updateEmployeeManager = require("./updateEmployeeManMenu");
const updateEmployeeRole = require("./updateEmployeeRoleMenu");
const viewSingleEmployeeMenu = require("./viewSingleEmployee");

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
  "View a single employee",
];

const answerChecker = async function (answer) {
  let data;
  switch (answer) {
    case OPTIONS[0]:
      data = await getWholeRoster("departments");
      break;
    case OPTIONS[1]:
      data = await getWholeRoster("roles");
      break;
    case OPTIONS[2]:
      data = await getWholeRoster("employees");
      break;
    case OPTIONS[3]:
      data = await byDeptMenu();
      break;
    case OPTIONS[4]:
      data = await byRoleMenu();
      break;
    case OPTIONS[5]:
      data = await byManagerMenu();
      break;
    case OPTIONS[6]:
      data = await newDeptMenu();
      break;
    case OPTIONS[7]:
      data = await newRoleMenu();
      break;
    case OPTIONS[8]:
      data = await newEmployeeMenu();
      break;
    case OPTIONS[9]:
      data = await delEmployeeMenu();
      break;
    case OPTIONS[10]:
      data = await updateEmployeeManager();
      break;
    case OPTIONS[11]:
      data = await updateEmployeeRole();
      break;
    case OPTIONS[12]:
      data = await viewSingleEmployeeMenu();
      break;
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
      answerChecker(answers.selected).then((data) => {
        console.table(data);
        mainMenu();
      });
    });
};

module.exports = {
  mainMenu,
  OPTIONS,
};
