const inquirer = require("inquirer");
const getWholeRoster = require("../utils/getWholeRoster");

const getManagers = async () => {
  const managers = await getWholeRoster("employees_list");
  return managers;
};

const getId = function (manager, array) {
  let myId;
  array.forEach((element) => {
    if (element.manager === manager) {
      myId = element.id;
    }
  });
  return myId;
};

const genFullId = async (manager, array) => {
  const deptUrl = "employees/manager/";
  const id = getId(manager, array);
  const fullUrl = deptUrl + id;
  return fullUrl;
};

const byManagerMenu = async () => {
  const managersTable = await getManagers();
  const managerList = managersTable.map((manager) => {
    return manager.manager;
  });

  return inquirer
    .prompt([
      {
        type: "list",
        name: "manager",
        message: "What manager do you want to check?",
        choices: managerList,
      },
    ])
    .then(async (answers) => {
      debugger;
      const fullUrl = await genFullId(answers.manager, managersTable);
      const getEmployeesByTable = await getWholeRoster(fullUrl);
      return getEmployeesByTable;
    });
};

module.exports = byManagerMenu;
