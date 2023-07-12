//DEPENDENCIES
const inquirer = require ("inquirer");
const mysql = require ("mysql2");
const cTable = require('console.table');

//CONNECT TO DATABASE
const db = mysql.createConnection({
    host: "localhost",
    port: 3301,
    user: "root",
    password: "alligator",
    database: "emp_db"
});

db.connect(function(err) {
    if(err) throw err
    console.log("Connect to emp_db")
    startPrompts();
});

//FUNCTION TO PROMPT USER FOR ACTION
function startPrompts(){
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            name: "choice",
            choices: [
                "View all employees",
                "View all roles",
                "View all departments",
                "Update employee",
                "Add employee",
                "Add role",
                "Add department",
            ]
        }
    ]).then(function(val) {
        switch (val.choice) {
            case "View All Employees":
                viewAllEmployees();
            break;

            case "View All Roles":
                viewAllRoles();
            break;

            case "View All Departments":
                viewAllDepartments();
            break;

            case "Update Employee":
                updateEmployee();
            break;

            case "Add Employee":
                addEmployee();
            break;

            case "Add Role":
                addRole();
            break;

            case "Add Department":
                addDepartment();
            break;

            case "View Employees by Manager":
                viewEmployeesByManager();
            break;
        }
    })
}

//FUNCTION TO VIEW ALL EMPLOYEES

//FUNCTION TO VIEW ALL EMPLOYEES BY ROLES

//FUNCTION TO INCLUDE ROLES AS AN OPTION FOR THE ADD EMPLOYEE PROMPT

//FUNCTION TO ADD EMPLOYEE

//FUNCTION TO UPDATE EMPLOYEE RECORD

//FUNCTION TO ADD ROLE

//FUNCTION TO ADD A DEPARTMENT