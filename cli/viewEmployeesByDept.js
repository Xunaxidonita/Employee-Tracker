const inquirer = require("inquirer");
const getWholeRoster = require("../utils/getWholeRoster");

const getDepartments = async () => {
  const departments = await getWholeRoster("departments");
  return departments;
};

const getId = function (department, array) {
  let myId;
  array.forEach((element) => {
    if (element.name === department) {
      myId = element.id;
    }
  });
  return myId;
};

const genFullId = async (department, array) => {
  const deptUrl = "employees/department/";
  const id = getId(department, array);
  const fullUrl = deptUrl + id;
  return fullUrl;
};

const byDeptMenu = async () => {
  const departmentsTable = await getDepartments();
  const departmentList = departmentsTable.map((dept) => {
    return dept.name;
  });
  return inquirer
    .prompt([
      {
        type: "list",
        name: "department",
        message: "What department do you want to check?",
        choices: departmentList,
      },
    ])
    .then(async (answers) => {
      const fullUrl = await genFullId(answers.department, departmentsTable);
      const getEmployeesByTable = await getWholeRoster(fullUrl);
      return getEmployeesByTable;
    });
};

module.exports = byDeptMenu;
