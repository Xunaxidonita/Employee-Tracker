const getWholeRoster = require ("../utils/getWholeRoster");
  
  const getRoles = async () => {
    const roles = await getWholeRoster("roles");
    return roles;
  };
  
  const getId = function (role, array) {
  array.forEach(element => {
      if (element.name === role) {
          return element.id;
      }
  })
  };
  
  const genFullId = async (role, array) => {
      const deptUrl = "employees/role/";
      const id = await getId(role, array);
      const fullUrl = deptUrl + id;
      return fullUrl;
  }
  
  const byRoleMenu = async () => {
    const rolesTable = await getRoles();
    const roleList = rolesTable.map((role) => {
      role.name;
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
      .then((answers) => {
          const fullUrl = await genFullId(answers.role, rolesTable);
        const getEmployeesByTable = await getWholeRoster(fullUrl);
        return getEmployeesByTable;
      });
  };
  
  module.exports = byRoleMenu;