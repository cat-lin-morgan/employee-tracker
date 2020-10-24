//this will run the inquirer prompts

const { resolveSoa } = require("dns")



//view department
//presented with a formatted table showing department names and department ids


//view all roles
//presented with the job title, role id, the department that role belongs to, and the salary for that role
SELECT roles.title, roles.id AS 'role id' , department.name AS 'department name', roles.salary
FROM roles
LEFT JOIN department
ON roles.department_id = department.id;

//view all employees
//presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, 
// departments, salaries, and managers that the employees report to
SELECT employee.id AS 'employee id', employee.first_name AS 'employee first name', employee.last_name AS 'employee last name', 
roles.title AS 'role title', department.name AS 'department name', roles.salary, 
concat(manager_t.first_name, ' ', manager_t.last_name) AS manager
FROM employee
LEFT JOIN roles
ON employee.role_id = roles.id
LEFT JOIN department
ON roles.department_id = department.id
LEFT JOIN employee AS manager_t
ON employee.manager_id = manager_t.id;

//add a department, 
//am prompted to enter the name of the department and that department is added to the database



//add a role
//prompted to enter the name, salary, and department for the role and that role is added to the database

//add an employee
//prompted to enter the employee’s first name, last name, role, and manager and that employee is added to the database

//and update an employee role
// prompted to select an employee to update and their new role and this information is updated in the database