const { mainMenu } = require("./cli/mainMenu");

(async () => {
  const selectedOption = await mainMenu();

  console.log(`selected: ${selectedOption}`);
})();
