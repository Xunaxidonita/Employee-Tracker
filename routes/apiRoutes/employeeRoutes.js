const express = require("express");
const router = express.Router();
const db = require("../../db/connection");
const inputCheck = require("../../utils/inputCheck");

// Get all employees
router.get("/employees", (req, res) => {
  const sql = `
    SELECT with_department.id, with_department.first_name, with_department.last_name, title, salary, department, CONCAT(employees.first_name, ' ', employees.last_name) AS manager
    FROM (SELECT with_role.id, first_name, last_name, manager_id, title , salary, name AS department
            FROM (SELECT employees.*, roles.title , roles.salary, roles.department_id
                    FROM employees 
                    LEFT JOIN roles ON employees.role_id = roles.id
            ) AS with_role
            LEFT JOIN departments ON with_role.department_id = departments.id
        ) AS with_department
    LEFT JOIN employees ON with_department.manager_id = employees.id;`;

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

// Get employees by department
router.get("/employees/department/:department_id", (req, res) => {
  const sql = `
    SELECT with_department.id, with_department.first_name, with_department.last_name, title, salary, department, with_department.department_id, CONCAT(employees.first_name, ' ', employees.last_name) AS manager
    FROM (SELECT with_role.id, first_name, last_name, manager_id, title, salary, name AS department, department_id
            FROM (SELECT employees.*, roles.title , roles.salary, roles.department_id
                    FROM employees 
                    LEFT JOIN roles ON employees.role_id = roles.id
            ) AS with_role
            LEFT JOIN departments ON with_role.department_id = departments.id
        ) AS with_department
    LEFT JOIN employees ON with_department.manager_id = employees.id
        WHERE with_department.department_id = ?;`;
  const params = [req.params.department_id];

  db.query(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

// Get employees by role
router.get("/employees/role/:role_id", (req, res) => {
  const sql = `
    SELECT with_department.id, with_department.first_name, with_department.last_name, title, salary, department, with_department.role_id, CONCAT(employees.first_name, ' ', employees.last_name) AS manager
    FROM (SELECT with_role.id, first_name, last_name, manager_id, title , salary, name AS department, with_role.role_id
            FROM (SELECT employees.*, roles.title , roles.salary, roles.department_id
                    FROM employees 
                    LEFT JOIN roles ON employees.role_id = roles.id
            ) AS with_role
            LEFT JOIN departments ON with_role.department_id = departments.id
        ) AS with_department
    LEFT JOIN employees ON with_department.manager_id = employees.id
        WHERE with_department.role_id = ?;`;
  const params = [req.params.role_id];

  db.query(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

// Get employees by manager
router.get("/employees/manager/:manager_id", (req, res) => {
  const sql = `
    SELECT with_department.id, with_department.first_name, with_department.last_name, title, salary, department, with_department.manager_id, CONCAT(employees.first_name, ' ', employees.last_name) AS manager
    FROM (SELECT with_role.id, first_name, last_name, manager_id, title , salary, name AS department
            FROM (SELECT employees.*, roles.title , roles.salary, roles.department_id
                    FROM employees 
                    LEFT JOIN roles ON employees.role_id = roles.id
            ) AS with_role
            LEFT JOIN departments ON with_role.department_id = departments.id
        ) AS with_department
    LEFT JOIN employees ON with_department.manager_id = employees.id
        WHERE with_department.manager_id = ?;`;
  const params = [req.params.manager_id];

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

// Get a single employee
router.get("/employee/:id", (req, res) => {
  const sql = `
  SELECT with_department.id, with_department.first_name, with_department.last_name, title, salary, department, CONCAT(employees.first_name, ' ', employees.last_name) AS manager
  FROM (SELECT with_role.id, first_name, last_name, manager_id, title , salary, name AS department
          FROM (SELECT employees.*, roles.title , roles.salary, roles.department_id
                  FROM employees 
                  LEFT JOIN roles ON employees.role_id = roles.id
          ) AS with_role
          LEFT JOIN departments ON with_role.department_id = departments.id
      ) AS with_department
  LEFT JOIN employees ON with_department.manager_id = employees.id
      WHERE with_department.id = ?;`;
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
router.delete("/employee/:id", (req, res) => {
  const sql = `DELETE FROM employees WHERE id = ?;`;
  const params = [req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: res.message });
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
router.post("/employee", ({ body }, res) => {
  const errors = inputCheck(
    body,
    "first_name",
    "last_name",
    "role_id",
    "manager_id"
  );
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }
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
});

// Update an employee's role
router.put("/employee/role/:id/role", (req, res) => {
  const errors = inputCheck(req.body, "role_id");
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }
  const sql = `UPDATE employees SET role_id = ? 
                 WHERE id = ?;`;
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

// Update an employee's manager
router.put("/employee/:id/manager", (req, res) => {
  const errors = inputCheck(req.body, "manager_id");
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }
  const sql = `UPDATE employees SET manager_id = ? 
                   WHERE id = ?;`;
  const params = [req.body.manager_id, req.params.id];
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

//Get employees list
router.get("/employees_list", (req, res) => {
  const sql = `SELECT employees.id, CONCAT(employees.first_name, ' ', employees.last_name) AS manager FROM employees`;
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

module.exports = router;
