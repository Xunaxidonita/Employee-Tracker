const inquirer = require("inquirer");
const getWholeRoster = require("../utils/getWholeRoster");

const getEmployees = async () => {
  const employees = await getWholeRoster("employees_list");
  return employees;
};

const getSingleEmployee = async (id) => {
  const urlSingleEmp = "/employee/" + id;
  const employee = await getWholeRoster(urlSingleEmp);
  return employee;
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

const viewSingleEmployeeMenu = async () => {
  const employeeList = await getEmployees();
  const OPTIONS = employeeList.map((employee) => {
    return employee.manager;
  });
  return inquirer
    .prompt([
      {
        type: "list",
        name: "selected",
        message: "What employee do you want to view?",
        choices: OPTIONS,
      },
    ])
    .then(async (answers) => {
      const employee = getId(answers.selected, employeeList);
      const myEmployee = await getSingleEmployee(employee);
      return myEmployee;
    });
};

module.exports = viewSingleEmployeeMenu;
