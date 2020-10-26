USE employees;

INSERT INTO department (name)
VALUES ('Engineering'), ('Sales'), ('Legal'), ('Money Team'), ('Garbage'), ('Zoo'), ('Swimming');

INSERT INTO roles (title, salary, department_id)
VALUES ('Lead Engineer', 250000, 1), ('Sales Person', 80000, 2), ('Lawyer', 200000, 3), ('Accountant', 250000, 4), ('Wizard', 2500000, 5), ('Lion Keeper', 280000, 6), ('Fly on the Wall', 10000, 6),;

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Cat', 'Morgan', 1, NULL), ('Leticia', 'Person', 4, 1);