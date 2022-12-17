--View Roles

SELECT role.id,title,  department.name AS department,salary
FROM role
LEFT JOIN department
ON role.department_id = department.id
ORDER BY role.id;

--View Employees

SELECT employee.id,employee.first_name,employee.last_name,title,name AS department,salary, 
CONCAT(e.first_name," "e.last_name) AS manager
FROM employee
LEFT JOIN role 
ON employee.role_id = role.role_id
LEFT JOIN department
ON role.department_id = department.id
LEFT JOIN employee e
ON employee.manager_id = e.id
ORDER BY employee.role_id;

--View employees by manager




SELECT DISTINCT CONCAT(e.first_name," ",e.last_name) AS manager_name
FROM employee
LEFT JOIN employee e
ON employee.manager_id = e.id
WHERE employee.manager_id IS NOT NULL

SELECT employee.id,employee.first_name,employee.last_name,title,name AS department,salary
FROM employee
LEFT JOIN role
ON employee.role_id = role_id
LEFT JOIN department
ON role.department_id = department.id
LEFT JOIN employee e
ON employee.manager_id = e.id
WHERE CONCAT(e.first_name," ",e.last_name) = manager_name_use_input
ORDER BY employee.role_id

--View employees by department

SELECT DISTINCT name FROM department
SELECT employee.id,employee.first_name,employee.last_name,title,name AS department,salary,
CONCAT(e.first_name,' ',e.last_name) as manager
FROM employee
LEFT JOIN role
ON employee.role_id = role_id
LEFT JOIN department
ON role.department_id = department.id
LEFT JOIN employee e
ON employee.manager_id = e.id
WHERE name = department_name_user_input
ORDER BY employee.role_id

--View budget
SELECT DISTINCT name from department
SELECT name AS department, SUM(salary) AS utilized_budget
FROM employee
LEFT JOIN role
ON employee.role_id = role_id
LEFT JOIN department
ON role.department_id = department.id
WHERE name = department_name_input
GROUP BY name

--ALTER TABLE department AUTO_INCREMENT = 1

ALTER TABLE department AUTO_INCREMENT = 1

INSERT INTO department SET name = user_input
SELECT * FROM department

--delete department

SELECT DISTINCT name FROM department
SET FOREIGN_KEY_CHECKS=0
DELETE FROM department WHERE name = user_input

SELECT DISTINCT * FROM department

ALTER TABLE role AUTO_INCREMENT = 1
INSERT INTO role AUTO_INCREMENT = 1
INSERT INTO role SET
title = user_input_role
salary = user_input_salary
department_id = user_choose_departmentID

--delete role

SELECT DISTINCT title FROM role
SET FOREIGN_KEY_CHECKS=0
DELETE FROM role WHERE title = user_choose_roleTitle

SELECT DISTINCT title, id FROM role
SELECT DISTINCT CONCAT(e.first_name,' ',e.last_name) AS manager_name,e.id
FROM employee
LEFT JOIN employee e
ON employee.manager_id = e.id
WHERE employee.manager_id IS NOT NULL


INSERT INTO employee SET
first_name = user_input_first_name,
last_name = user_input_last_name,
role_id = roleId(user_choose_role_id),
manager_id = managerID(user_choose_manager_id)

--delete employee

SELECT DISTINCT CONCAT(first_name,' ',last_name) AS full_name FROM employee
DELETE FROM employee WHERE CONCAT(first_name,' ',last_name) = user_choose_name
