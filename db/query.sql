--View Roles

SELECT role.id,title,  department.name AS departmnt,salary
FROM role
LEFT JOIN department
ON role.department_id = department.id
ORDER BY role.id;

--View Employees

SELECT employee.id,employee.first_name,employee.last_name,title,name AS department,salary, 
CONCAT(e.first_name," "e.last_name) AS manager_id
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
FROM Employees
LEFT JOIN employee e
ON employee.manager_id = e.id
WHERE employee.manager_id IS NOT NULL

SELECT employee.id,employee.first_name,employee.last_name,title,name AS department,salary
FROM employee
LEFT JOIN role
ON employee.role_id = role.id
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
ON employee.role_id = role.id
LEFT JOIN department
ON role.department_id = department.id
LEFT JOIN employee e
ON employee.manager_id = e.id
WHERE name = department_name_user_input
ORDER BY employee.role_id

