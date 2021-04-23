console.log(`  ___                  _                        ,__ __                                      
/ (_)                | |                      /|  |  |                                     
\__   _  _  _     _  | |  __         _   _     |  |  |   __,   _  _    __,   __,  _   ,_   
/    / |/ |/ |  |/ \_|/  /  \_|   | |/  |/     |  |  |  /  |  / |/ |  /  |  /  | |/  /  |  
\___/  |  |  |_/|__/ |__/\__/  \_/|/|__/|__/   |  |  |_/\_/|_/  |  |_/\_/|_/\_/|/|__/   |_/
               /|                /|                                           /|           
               \|                \|                                           \|           `);

const { mainMenu } = require("./cli/mainMenu");

const getEmployees = () =>
  fetch("/api/employees", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      apiKey: "keyTest",
    },
  });

const saveEmployee = (employee) =>
  fetch("/api/employees", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apiKey: "keyTest",
    },
    body: JSON.stringify(note),
  });

const deleteEmployee = (id) =>
  fetch(`/api/employee/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      apiKey: "keyTest",
    },
  });

(async () => {
  const selectedOption = await mainMenu();

  console.log(`selected: ${selectedOption}`);
})();
