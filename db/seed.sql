USE employees;

INSERT INTO department (name)
VALUES ('Engineering'), ('Sales'), ('Legal'), ('Finance');

INSERT INTO role (title, salary, department_id)
VALUES ('Lead Engineer', 250000, 1), ('Sales Person', 80000, 2), ('Lawyer', 200000, 3), ('Accountant', 250000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Cat', 'Morgan', 1, NULL), ('Leticia', 'Accountant', 4, 1);