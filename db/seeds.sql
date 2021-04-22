INSERT INTO departments (name)
VALUES
('Sales'),
('Engineering'),
('Finance'),
('Legal');

INSERT INTO roles (title, salary, department_id)
VALUES
('Sales Lead', 100000, 1 ),
('Salesperson', 80000, 1 ),
('Lead Engineer', 150000, 2), 
('Software Engineer',120000, 2 ),
('Accountant', 125000, 3),
('Legal Team Lead',250000, 4 ),
('Lawyer',190000, 4 );

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
  ('Jonh', 'Doe', 1, NULL),
  ('Mike', 'Chan', 2, 1),
  ('Ashley', 'Rodriguez', 3, NULL),
  ('Kevin', 'Tupin', 4, 3),
  ('Katherine', 'Mansfield', 5, NULL),
  ('Dora', 'Carrington', 6, NULL),
  ('Edward', 'Bellamy', 7, 6),
  ('Montague', 'Summers', 4, 3),
  ('Octavia', 'Butler', 2, 1),
  ('Unica', 'Zurn', 4, 3);
