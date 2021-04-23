const getWholeRoster = require ("../utils/getWholeRoster");
  
  const getManagers = async () => {
    const managers = await getWholeRoster("managers");
    return managers;
  };
  
  const getId = function (manager, array) {
  array.forEach(element => {
      if (element.name === manager) {
          return element.id;
      }
  })
  };
  
  const genFullId = async (manager, array) => {
      const deptUrl = "employees/manager/";
      const id = await getId(manager, array);
      const fullUrl = deptUrl + id;
      return fullUrl;
  }
  
  const byManagerMenu = async () => {
    const managersTable = await getManagers();
    const managerList = managersTable.map((manager) => {
      manager.name;
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
      .then((answers) => {
          const fullUrl = await genFullId(answers.manager, managersTable);
        const getEmployeesByTable = await getWholeRoster(fullUrl);
        return getEmployeesByTable;
      });
  };
  
  module.exports = byManagerMenu;