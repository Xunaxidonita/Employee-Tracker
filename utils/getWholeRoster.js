const getWholeRoster = async (tableName) => {
  let rawData = await fetch(`/api/${tableName}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  let toTable = await rawData.json();
  return toTable.data;
};

module.exports = getWholeRoster;
