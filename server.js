const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const inputCheck = require("./utils/inputCheck");
const db = require("./db/connection");
const apiRoutes = require("./routes/apiRoutes");

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.get("/", (req, res) => {
  res.json({
    message: "Hello World",
  });
});
app.use("/api", apiRoutes);

db.query(`SELECT * FROM employees`, (err, rows) => {
  console.log(rows);
});

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

// GET a single employee
db.query(`SELECT * FROM employees WHERE id = 1`, (err, row) => {
  if (err) {
    console.log(err);
  }
  console.log(row);
});

// Delete a employee
db.query(`DELETE FROM employees WHERE id = ?`, 1, (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log(result);
});

// Create a employee
const sql = `INSERT INTO employees (id, first_name, last_name, role_id, manager_id) 
              VALUES (?,?,?,?,?)`;
const params = [1, "Ronald", "Firbank", 1, 34];

db.query(sql, params, (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log(result);
});

// Start server after DB connection
db.connect((err) => {
  if (err) throw err;
  console.log("Database connected.");
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
