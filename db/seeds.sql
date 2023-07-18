INSERT INTO department (id, name)
VALUES (1, "Sales");
INSERT INTO department (id, name)
VALUES (2, "Engineering");
INSERT INTO department (id, name)
VALUES (3, "Finance");
INSERT INTO department (id, name)
VALUES (4, "Legal");

INSERT INTO roles (id, title, salary, department_id)
VALUES (1, "Software Engineer", 120000, 2);
INSERT INTO roles (id, title, salary, department_id)
VALUES (2, "Legal Head", 250000, 4);
INSERT INTO roles (id, title, salary, department_id)
VALUES (3, "Accountant", 125000, 3);
INSERT INTO roles (id, title, salary, department_id)
VALUES (4, "Client Sales Lead", 100000, 1);
INSERT INTO roles (id, title, salary, department_id)
VALUES (5, "Sales Team Member", 80000, 1);
INSERT INTO roles (id, title, salary, department_id)
VALUES (6, "Lead Software Developer", 160000, 2);
INSERT INTO roles (id, title, salary, department_id)
VALUES (7, "Legal Team Member", 190000, 4);

INSERT INTO employees (id, first_name, last_name, role_id)
VALUES (1, "John", "Snow", 1);
INSERT INTO employees (id, first_name, last_name, role_id)
VALUES (2, "Linnea", "Youth", 2);
INSERT INTO employees (id, first_name, last_name, role_id)
VALUES (3, "Jiminy", "Cricket", 3);
INSERT INTO employees (id, first_name, last_name, role_id)
VALUES (4, "Indiana", "Jonesa", 4);
INSERT INTO employees (id, first_name, last_name, role_id)
VALUES (5, "Coco", "Nuttah", 5);
INSERT INTO employees (id, first_name, last_name, role_id)
VALUES (6, "Selena", "Dyon", 6);
INSERT INTO employees (id, first_name, last_name, role_id)
VALUES (7, "Taylor", "Slow", 7);
