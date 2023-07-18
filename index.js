//DEPENDENCIES
const inquirer = require ("inquirer");
const mysql = require ("mysql2");
// const cTable = require('console.table');

//CONNECT TO DATABASE
const db = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "alligator",
    database: "employees_db"
});

db.connect(function(err) {
    if(err) throw err
    console.log("Connected to employees_db");
    seedDatabase();
    startPrompts();
});

//FUNCTION TO SEED THE DATABASE WITH INITIAL DATA
function seedDatabase() {
    const seeds = [
      { id: 1, name: 'Sales' },
      { id: 2, name: 'Engineering' },
      { id: 3, name: 'Finance' },
      { id: 4, name: 'Legal' }
    ];
  
    seeds.forEach(seed => {
      db.query('SELECT * FROM department WHERE id = ?', [seed.id], function(err, results) {
        if (err) throw err;
        if (results.length === 0) {
          db.query('INSERT INTO department SET ?', seed, function(err, results) {
            if (err) throw err;
          });
        }
      });
    });
  
    console.log('Database seeded with initial data');
  }

seedDatabase();
  

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
            case "View all employees":
                viewAllEmployees();
            break;

            case "View all roles":
                viewAllRoles();
            break;

            case "View all departments":
                viewAllDepartments();
            break;

            case "Update employee":
                updateEmployee();
            break;

            case "Add employee":
                addEmployee();
            break;

            case "Add role":
                addRole();
            break;

            case "Add department":
                addDepartment();
            break;

            case "View Employees by Manager":
                viewEmployeesByManager();
            break;
        }
    })
}

//FUNCTION TO VIEW ALL EMPLOYEES
function viewAllEmployees() {
    console.log("View all employees function called!")
    db.query(
        "SELECT employees.first_name, employees.last_name, roles.title, roles.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employees INNER JOIN roles ON roles.id = employees.role_id INNER JOIN department ON department.id = roles.department_id LEFT JOIN employees e ON employees.manager_id = e.id;",
        function (err, res) {
          if (err) throw err;
          console.table(res);
          startPrompts();
        }
      );      
  }

//FUNCTION TO VIEW ALL EMPLOYEES BY ROLES
function viewAllRoles() {
    console.log("View all roles function called!")
    db.query(
        "SELECT DISTINCT roles.title AS Roles FROM employees JOIN roles ON employees.role_id = roles.id;",
        function (err, res) {
          if (err) throw err;
          console.table(res);
          startPrompts();
        }
      );
  }
//FUNCTION TO VIEW ALL DEPARTMENTS 
function viewAllDepartments() {
    console.log("View all departments function called!")
    db.query("SELECT name AS Departments FROM department;", function (err, res) {
        if (err) throw err;
        console.table(res);
        startPrompts();
      });
  }
//FUNCTION TO INCLUDE ROLES AS AN OPTION FOR THE ADD EMPLOYEE PROMPT
let roleArr = [];
function selectRole() {
  db.query("SELECT * FROM roles", function (err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      roleArr.push(res[i].title);
    }
  });
  return roleArr;
}

//FUNCTION TO SHOW ALL POSSIBLE MANAGERS FOR THE ADD EMPLOYEE PROMPT
let managersArr = [];
function selectManager() {
  db.query(
    "SELECT first_name, last_name FROM employees WHERE manager_id IS NULL",
    function (err, res) {
      if (err) throw err;
      for (var i = 0; i < res.length; i++) {
        managersArr.push(res[i].first_name);
      }
    }
  );
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
      db.query("INSERT INTO employees (first_name, last_name, manager_id, role_id) VALUES (?, ?, ?, ?)", [val.firstname, val.lastname, managerId, roleId], function(err){
          if (err) throw err
          console.table(val)
          startPrompts()
      })
  })
}

//FUNCTION TO UPDATE EMPLOYEE RECORD
function updateEmployee() {
    db.query('SELECT * FROM employees', (err, employees) => {
      if (err) console.log(err);
      employees = employees.map((employee) => {
          return {
              name: `${employee.first_name} ${employee.last_name}`,
              value: employee.id,
          };
      });
      db.query('SELECT * FROM roles', (err, roles) => {
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
                  db.query('UPDATE employees SET ? WHERE ?',
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
    db.query("SELECT roles.title AS Title, roles.salary AS Salary FROM roles",   function(err, res) {
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
              "INSERT INTO roles SET ?",
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