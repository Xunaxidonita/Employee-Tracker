const inquirer = require("inquirer");
const getWholeRoster = require("../utils/getWholeRoster");

const getRoles = async () => {
  const roles = await getWholeRoster("roles_list");
  return roles;
};

const getId = function (role, array) {
  let myId;
  array.forEach((element) => {
    if (element.title === role) {
      myId = element.id;
    }
  });
  return myId;
};

const genFullId = (role, array) => {
  const deptUrl = "employees/role/";
  const id = getId(role, array);
  const fullUrl = deptUrl + id;
  return fullUrl;
};

const byRoleMenu = async () => {
  const roles = await getRoles();
  const roleList = roles.map((role) => {
    return role.title;
  });
  return inquirer
    .prompt([
      {
        type: "list",
        name: "role",
        message: "What role do you want to check?",
        choices: roleList,
      },
    ])
    .then(async (answers) => {
      debugger;
      const fullUrl = await genFullId(answers.role, roles);
      const getEmployeesByTable = await getWholeRoster(fullUrl);
      return getEmployeesByTable;
    });
};

module.exports = byRoleMenu;
