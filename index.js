const db = require('./db/index');
const inquirer = require('inquirer');


//this will run the main menu inquirer prompts
const mainMenuQuestions = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'main_menu',
            message: 'What would you like to do?',
            choices: ['View All Employees',
                'View All Departments',
                'View All Roles',
                'Add Employee',
                'Add Department',
                'Add Role',
                'Update Employee']
        }
    ]).then(answers => {
        if('View All Employees' === answers.main_menu){
            db.viewEmployees().then(mainMenuQuestions);
        } else if ('View All Departments' === answers.main_menu) {
            db.viewDepartment().then(mainMenuQuestions);
        } else if ('View All Roles' === answers.main_menu) {
            db.viewRoles().then(mainMenuQuestions);
        } else if ('Add Employee' === answers.main_menu) {
            addEmployeeQuestions();
        } else if ('Add Department' === answers.main_menu) {
            addDepartmentQuestions();
        } else if ('Add Role' === answers.main_menu) {
            addRoleQuestions();
        } else if ('Update Employee' === answers.main_menu) {
            updateEmployeeQuestions();
        } else {
            console.log(answers);
            mainMenuQuestions();
        }
    })
};

//this will run the add employee inquirer prompts
const addEmployeeQuestions = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'What is their first name?',
            validate: (firstNameInput) => {
                if (firstNameInput) {
                    return true;
                } else {
                    console.log('Nope! You gotta tell us their first name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'What is their last name?',
            validate: (lastNameInput) => {
                if (lastNameInput) {
                    return true;
                } else {
                    console.log('Nope! You gotta tell us their last name!');
                    return false;
                }
            }
        },
        {
            type: 'list',
            name: 'getRole',
            message: 'What is their role?',
            choices: db.getRoles
        },
        {
            type: 'confirm',
            name: 'confirmManager',
            message: 'Does this person have a manager?',
            default: true,
        },
        {
            type: 'list',
            name: 'getManager',
            message: 'Who is their manager?',
            choices: db.getEmployees,
            when: ({ confirmManager }) => {
                if (confirmManager) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    ]).then( answers => {
        console.log(answers);
        db.addEmployee(answers.firstName, answers.lastName, answers.getRole, answers.getManager);
    }).then(mainMenuQuestions);
};

//this will run the add department inquirer prompts
const addDepartmentQuestions= () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'departmentName',
            message: 'What is the department name',
            validate: (department) => {
                if (department) {
                    return true;
                } else {
                    console.log('Nope! You gotta tell us the department name!');
                    return false;
                }
            }
        }
    ]).then( answers => {
        db.addDepartment(answers.departmentName);
    }).then(mainMenuQuestions)
};

//this will run the add role inquirer prompts
const addRoleQuestions= () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'roleName',
            message: 'What is the role name',
            validate: (roleInput) => {
                if (roleInput) {
                    return true;
                } else {
                    console.log('Nope! You gotta tell us the role name!');
                    return false;
                }
            }
        },
        {
            type: 'number',
            name: 'salary',
            message: 'What is the salary of the role?',
            validate: (celeryInput) => {
                if (celeryInput) {
                    return true;
                } else {
                    console.log('Nope! You gotta tell us the salary of the role!');
                    return false;
                }
            }
        },
        {
            type: 'list',
            name: 'departmentId',
            message: 'What department is this role in?',
            choices: db.getDepartments
        }
    ]).then( answers => {
        db.addRole(answers.roleName, answers.salary, answers.departmentId);
    }).then(mainMenuQuestions)
};

//this will run the add role inquirer prompts
const updateEmployeeQuestions = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'employeeId',
            message: 'Select which employee to update:',
            choices: db.getEmployees
        },
        {
            type: 'list',
            name: 'roleId',
            message: 'What role would this employee have:',
            choices: db.getRoles
        }
    ]).then( answers => {
        db.updateEmployee(answers.roleId, answers.employeeId);
    }).then(mainMenuQuestions)
};

mainMenuQuestions();