const mysql = require("mysql2");
const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const inputCheck = require("./utils/inputCheck");
// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    // Your MySQL username,
    user: "root",
    // Your MySQL password
    password: "",
    database: "employees",
  },
  console.log("Connected to the employees database.")
);

app.get("/", (req, res) => {
  res.json({
    message: "Hello World",
  });
});

// Get all employees
app.get("/api/employees", (req, res) => {
  const sql = `SELECT * FROM employees`;

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    res.json({
      message: "success",
      data: rows,
    });
  });
});

// Get a single employee
app.get("/api/employee/:id", (req, res) => {
  const sql = `SELECT * FROM employees WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: row,
    });
  });
});

// Delete a employee
app.delete("/api/employee/:id", (req, res) => {
  const sql = `DELETE FROM employees WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.statusMessage(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({
        message: "employee not found",
      });
    } else {
      res.json({
        message: "deleted",
        changes: result.affectedRows,
        id: req.params.id,
      });
    }
  });
});

// Create a employee
app.post("/api/employee", ({ body }, res) => {
  const errors = inputCheck(
    body,
    "first_name",
    "last_name",
    "role_id",
    "manager_id"
  );
  if (errors) {
    const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
  VALUES (?,?,?,?)`;
    const params = [
      body.first_name,
      body.last_name,
      body.role_id,
      body.manager_id,
    ];

    db.query(sql, params, (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: "success",
        data: body,
      });
    });
    res.status(400).json({ error: errors });
    return;
  }
});

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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
