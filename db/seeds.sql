INSERT INTO department (name)
VALUES ("Sales"),
       ("Engineering"),
       ("Finance"),
       ("Legal"),
       ("Executive");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 100000, 1),
       ("Salesperson", 80000, 1),
       ("Lead Engineer", 150000, 2),
       ("Software Engineer", 120000, 2),
       ("Account Manager", 160000, 3),
       ("Accountant", 125000, 3),
       ("Legal Team Lead" 200000, 4),
       ("Lawyer", 160000, 4),
       ("CEO", 400000, 5),
       ("Executive Assistant", 250000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Spider", "Man", 1, 23),
       ("Iron", "Man", 2, 3),
       ("Captain", "America", 3, 23),
       ("Doctor", "Strange", 4, 7),
       ("Black", "Panther", 5, 23),
       ("Captain", "Marvel", 6, 2),
       ("Dare", "Devil", 7, 23),
       ("Bucky", "Barnes", 8, 1),
       ("Jean", "Grey", 9, 23),
       ("Spider", "Man", 10, 5);