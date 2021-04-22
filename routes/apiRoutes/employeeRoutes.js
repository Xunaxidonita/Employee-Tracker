const express = require("express");
const router = express.Router();
const db = require("../../db/connection");
const inputCheck = require("../../utils/inputCheck");

// Get all employees
router.get("/api/employees", (req, res) => {
  const sql = `SELECT with_department.*, (first_name + last_name AS full_name FROM employees) FROM(SELECT with_role.id, first_name, last_name, manager_id, title , salary, name AS department
      FROM (SELECT employees.*, roles.title , roles.salary, roles.department_id
      FROM employees 
      LEFT JOIN roles 
      ON employees.role_id = roles.id)
      AS with_role
      LEFT JOIN departments 
      ON with_role.department_id = departments.id)
      AS with_department
      LEFT JOIN employees
      ON with_department.manager_id = employees.id
      AS manager
      ;`;

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
router.get("/api/employee/:id", (req, res) => {
  const sql = `SELECT with_role.id, first_name, last_name, manager_id, title , salary, name AS department
      FROM (SELECT employees.*, roles.title , roles.salary, roles.department_id
      FROM employees 
      LEFT JOIN roles 
      ON employees.role_id = roles.id)
      AS with_role
      LEFT JOIN departments 
      ON with_role.department_id = departments.id
      WHERE employees.id = ?;`;
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

// Delete an employee
router.delete("/api/employee/:id", (req, res) => {
  const sql = `DELETE FROM employees WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.statusMessage(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({
        message: "Employee not found",
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

// Create an employee
router.post("/api/employee", ({ body }, res) => {
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

// Update a employee's role
router.put("/api/employee/:id", (req, res) => {
  const errors = inputCheck(req.body, "role_id");
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }
  const sql = `UPDATE employees SET role_id = ? 
                 WHERE id = ?`;
  const params = [req.body.role_id, req.params.id];
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      // check if a record was found
    } else if (!result.affectedRows) {
      res.json({
        message: "Employee not found",
      });
    } else {
      res.json({
        message: "success",
        data: req.body,
        changes: result.affectedRows,
      });
    }
  });
});

module.exports = router;
