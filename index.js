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
function viewAllEmployees(){
    db.query("SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id LEFT JOIN employee e on employee.manager_id = e.id;", 
    function(err, res) {
        if (err) throw err
        console.table(res)
        startPrompts()
  })
}

//FUNCTION TO VIEW ALL EMPLOYEES BY ROLES
function viewAllRoles(){
    db.query("SELECT DISTINCT role.title AS Roles FROM employee JOIN role ON employee.role_id = role.id;", 
    function(err, res) {
        if (err) throw err
        console.table(res)
        startPrompts()
    })
}
//FUNCTION TO VIEW ALL DEPARTMENTS 
function viewAllDepartments(){
    db.query("SELECT name AS Departments FROM department;", 
    function(err, res) {
        if (err) throw err
        console.table(res)
        startPrompts()
    })
}
//FUNCTION TO INCLUDE ROLES AS AN OPTION FOR THE ADD EMPLOYEE PROMPT
let roleArr = [];
function selectRole(){
    db.query("SELECT * FROM role", function(err, res) {
        if (err) throw err
        for (var i = 0; i < res.length; i++) {
          roleArr.push(res[i].title);
        }
      })
      return roleArr;
}

//FUNCTION TO SHOW ALL POSSIBLE MANAGERS FOR THE ADD EMPLOYEE PROMPT
let managersArr = [];
function selectManager(){
    db.query("SELECT first_name, last_name FROM employee WHERE manager_id IS NULL", function(err, res) {
        if (err) throw err
        for (var i = 0; i < res.length; i++) {
          managersArr.push(res[i].first_name);
        }
    
      })
      return managersArr;
}

//FUNCTION TO ADD EMPLOYEE
function addEmployee(){
    inquirer.prompt([
        {
          name: "firstname",
          type: "input",
          message: "Enter employees first name: "
        },
        {
          name: "lastname",
          type: "input",
          message: "Enter employees last name: "
        },
        {
          name: "role",
          type: "list",
          message: "Enter employees role: ",
          choices: selectRole()
        },
        {
            name: "choice",
            type: "rawlist",
            message: "Enter employees manager name:",
            choices: selectManager()
        }
    ]).then(function (val) {
      var roleId = selectRole().indexOf(val.role) + 1
      var managerId = selectManager().indexOf(val.choice) + 1
      db.query("INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUES (?, ?, ?, ?)", [val.firstname, val.lastname, managerId, roleId], function(err){
          if (err) throw err
          console.table(val)
          startPrompts()
      })
  })
}

//FUNCTION TO UPDATE EMPLOYEE RECORD
function updateEmployee() {
    db.query('SELECT * FROM employee', (err, employees) => {
      if (err) console.log(err);
      employees = employees.map((employee) => {
          return {
              name: `${employee.first_name} ${employee.last_name}`,
              value: employee.id,
          };
      });
      db.query('SELECT * FROM role', (err, roles) => {
          if (err) console.log(err);
          roles = roles.map((role) => {
              return {
                  name: role.title,
                  value: role.id,
              }
          });
          inquirer
              .prompt([
                  {
                      type: 'list',
                      name: 'selectEmployee',
                      message: 'Select employee to update...',
                      choices: employees,
                  },
                  {
                      type: 'list',
                      name: 'selectNewRole',
                      message: 'Select new employee role...',
                      choices: roles,
                  },
              ])
              .then((data) => {
                  db.query('UPDATE employee SET ? WHERE ?',
                      [
                          {
                              role_id: data.selectNewRole,
                          },
                          {
                              id: data.selectEmployee,
                          },
                      ],
                      function (err) {
                          if (err) throw err;
                      }
                  );
                  console.log('Employee role updated');
                  startPrompts();
              });
  
      });
  });
  };

//FUNCTION TO ADD ROLE
function addRole() { 
    db.query("SELECT role.title AS Title, role.salary AS Salary FROM role",   function(err, res) {
      inquirer.prompt([
          {
            name: "Title",
            type: "input",
            message: "Enter Role:"
          },
          {
            name: "Salary",
            type: "input",
            message: "Enter Salary:"
  
          } 
      ]).then(function(res) {
          db.query(
              "INSERT INTO role SET ?",
              {
                title: res.Title,
                salary: res.Salary,
              },
              function(err) {
                  if (err) throw err
                  console.table(res);
                  startPrompts();
              }
          )
  
      });
    });
    }
//FUNCTION TO ADD A DEPARTMENT
function addDepartment() { 

    inquirer.prompt([
        {
          name: "name",
          type: "input",
          message: "Enter dept to add:"
        }
    ]).then(function(res) {
        var query = db.query(
            "INSERT INTO department SET ? ",
            {
              name: res.name
            
            },
            function(err) {
                if (err) throw err
                console.table(res);
                startPrompts();
            }
        )
    })
  }