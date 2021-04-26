const path = require("path");
const fetch = require("node-fetch");

const getWholeRoster = async (tableName) => {
  let rawData = await fetch(`http://localhost:3001/api/${tableName}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  let toTable = await rawData.json();
  return toTable.data;
};

module.exports = getWholeRoster;
