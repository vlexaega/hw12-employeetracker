INSERT INTO department (name)
VALUE ("Sales");
INSERT INTO department (name)
VALUE ("Engineering");
INSERT INTO department (name)
VALUE ("Finance");
INSERT INTO department (name)
VALUE ("Legal");


INSERT INTO role (title, salary, department_id)
VALUE ("Software Engineer", 120000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ("Legal Head", 250000, 4);
INSERT INTO role (title, salary, department_id)
VALUE ("Accountant", 125000, 3);
INSERT INTO role (title, salary, department_id)
VALUE ("Client Sales Lead", 100000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ("Sales Team Member", 80000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ("Lead Software Developer", 160000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ("Legal Team Member", 190000, 4);


INSERT INTO employees (first_name, last_name, manager_id, role_id)
VALUE ("John", "Snow", null, 1);
INSERT INTO employees (first_name, last_name, manager_id, role_id)
VALUE ("Linnea", "Youth", null, 2);
INSERT INTO employees (first_name, last_name, manager_id, role_id)
VALUE ("Jiminy", "Cricket", null,3 );
INSERT INTO employees (first_name, last_name, manager_id, role_id)
VALUE ("Indiana", "Jonesa", 1, 4);
INSERT INTO employees (first_name, last_name, manager_id, role_id)
VALUE ("Coco", "Nuttah", 4, 5);
INSERT INTO employees (first_name, last_name, manager_id, role_id)
VALUE ("Selena", "Dyon", 1, 6);
INSERT INTO employees (first_name, last_name, manager_id, role_id)
VALUE ("Taylor", "Slow", 2, 7);