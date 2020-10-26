//this will have the queries
const connection = require('./connection.js');
const cTable = require('console.table');


//query for presented with a formatted table showing department names and department ids
const viewDepartment = function () {
    return connection.promise().query(`SELECT department.name AS 'department name', department.id AS 'department id' FROM department;`)
    .then(([rows]) => {
        console.table('Departments', rows);
    })
    .catch(err => {
        console.log(err);
    });
};

//query for viewing all roles
const viewRoles = function () {
    return connection.promise().query(`SELECT roles.title AS 'role title', roles.id AS 'role id' , department.name AS 'department name', roles.salary
        FROM roles
        LEFT JOIN department
        ON roles.department_id = department.id;`)
    .then(([rows]) => {
        console.table('All Roles', rows);
    })
    .catch(err => {
        console.log(err);
    });
};



// query to view all employees
const viewEmployees = function () {
    return connection.promise().query(`SELECT employee.id AS 'employee id', employee.first_name AS 'employee first name', employee.last_name AS 'employee last name', 
        roles.title AS 'role title', department.name AS 'department name', roles.salary, 
        concat(manager_t.first_name, ' ', manager_t.last_name) AS manager
        FROM employee
        LEFT JOIN roles
        ON employee.role_id = roles.id
        LEFT JOIN department
        ON roles.department_id = department.id
        LEFT JOIN employee AS manager_t
        ON employee.manager_id = manager_t.id;`)
    .then(([rows]) => {
        console.table('All Employees In Company', rows);
    })
    .catch(err => {
        console.log(err);
    });
};



//query to add a department
const addDepartment = function (name) {
    const sql = `INSERT INTO department (name) VALUES (?)`;
    connection.promise().query(sql, name)
    .then(([results]) => {
        console.log('\n', results.affectedRows, 'Successfully added a department: ', name, '\n');
    })
    .then(viewDepartment)
    .catch(err => {
        console.log(err);
    });
};

const getRoles = function () {
    return connection.promise().query(`SELECT roles.title AS name, roles.id AS value FROM roles`)
    .then(([rows]) => {
        console.log(rows);
        return rows;
    });
};

const getEmployees = function () {
    return connection.promise().query(`SELECT concat(employee.first_name, ' ', employee.last_name) AS name, employee.id AS value FROM employee`)
    .then(([rows]) => {
        console.log(rows);
        return rows;
    });
};

// query to add a role
const addRole = function (title, salary, department_id) {
    const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`;
    const params = [title, salary, department_id];
    connection.promise().query(sql, params)
    .then(([results]) => {
        console.log('\n', results.affectedRows, 'Successfully added a role: ', title, '\n');
    })
    .then(viewRoles)
    .catch(err => {
        console.log(err);
    });
};


// query to add an employee
const addEmployee = function (first_name, last_name, role_id, manager_id) {
    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
    const params = [first_name, last_name, role_id, manager_id];
    connection.promise().query(sql, params)
    .then(([results]) => {
        console.log('\n', results.affectedRows, 'Successfully added a employee: ', first_name, last_name, '\n');
    })
    .then(viewEmployees)
    .catch(err => {
        console.log(err);
    });
};

//query to update employee
const updateEmployee = function (role_id, employee_id) {
    const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
    const params = [role_id, employee_id];
    connection.promise().query(sql, params)
    .then(([results]) => {
        console.log('\n', results.affectedRows, 'Successfully updated an employee: ', '\n');
    })
    .then(viewEmployees)
    .catch(err => {
        console.log(err);
    });
};

module.exports = {
    addEmployee,
    addRole,
    addDepartment,
    viewEmployees,
    viewRoles,
    viewDepartment,
    getRoles,
    getEmployees,
    updateEmployee
};
