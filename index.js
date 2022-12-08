//require packages

const mysql = require('mysql2');
const inquirer = require('inquirer');

//const consoleTables = require ("console.table");

//db connect
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Hailey23!',
        database: "companyemp_db"
    },
    console.log(`Connected to companyemp database.`)

);
// connects to sql database

db.connect(function(err){
    if (err) throw err;
    console.log('connected as id ${db.threadId}');
    console.log("=====================================")
    console.log("||                                 ||")
    console.log("||        EMPLOYEE DATABASE        ||")
    console.log("||                                 ||")
    console.log("=====================================")
init();
})

function init() {
    inquirer.prompt ({
        type: 'list',
        name: 'action',
        message: 'What Would You Like To Do?',
        choices: [
            "Add A Department",
            "Add A Role",
            "Add An Employee",
            "View Department",
            "View Roles",
            "View Employees",
            "View Total Budget Utilization",
            "View Employees With The Same Manager",
            "View Employees By Department",
            "Update Employees Role",
            "Update An Employees Manager",
            "Delete A Department",
            "Delete A Role",
            "Delete An Employee",
            "Exit",
        ],

    }) 
    .then(function(answer){
        switch (answer.action){
            case "Add A Department":
                addDepartment();
                break;

                case "Add A Role":
                addRole();
                break;

                case "Add An Employee":
                addEmployee();
                break;

                case "View Departments":
                viewDepartment();
                break;

                case "View Roles":
                viewRole();
                break;

                case "View Employees":
                viewEmployee();
                break;

                case "View Total Budget Utilization":
                viewBudget();
                break;

                case "View Employees With The Same Manager":
                viewManager();
                break;

                case "View Employees By Department":
                viewEmpDep();
                break;

                case "Update Employees Role":
                updateRole();
                break;

                case "Update An Employees Manager":
                updateManager();
                break;

                case "Delete A Department":
                deleteDepartment();
                break;

                case "Delete A Role":
                deleteRole();
                break;

                case "Delete An Employee":
                deleteEmployee();
                break;

                case "Exit!":
                    db.end();

                console.log("Thanks For Using Employee Tracker!");
                break;
        }
    })}

     //View Departments

function viewDepartment () {

    const sql = `SELECT * From Department`;
    db.query (sql, (err,result) =>{
        if (err) throw err;
        console.table(result);
        init();
    });
}

//View Roles

function viewRole () {
    const sql = `SELECT role.id,title, department.name AS department,salary 
    FROM role 
    LEFT JOIN department
    ON role.department_id = department.id
    ORDER BY role.id;`;
    db.query (sql, (err,result) => {
        if (err) throw err;
        console.table(result);
        init();
    });
}

//View Employees

function viewEmployee() {
    const sql = `SELECT employee.id,employee.first_name,employee.last_name,title,name AS department,salary,
     CONCAT(e.first_name," ",e.last_name) AS manager
     FROM employee
     LEFT JOIN role
     ON employee.role_id = role.id
     LEFT JOIN department
     ON role.department_id = department.id
     LEFT JOIN employee e
     ON employee.manager_id = e.id
     ORDER BY employee.id;`;
     db.query (sql, (err,result) => {
        if (err) throw err;
        console.table(result);
            init();
     });

}
//Add Department to Database

function addDepartment () {
    inquirer.prompt({
        name: 'newDepartment',
        type: 'input',
        message: 'What Department Would You Like To Add?'
    }).then(function (answer) {
        db.query(
            `ALTER TABLE department AUTO_INCREMENT = 1; INSERT INTO department SET ?`,
            {
                name: answer.newDepartment
            }
        );
        const sql = 'SELECT * FROM department';
        db.query(sql, function(err, res) {
            if(err)throw err;
            console.log(answer.newDepartment + ' has been added!!');
            console.table("All Dapartments: ", res);
            init();
        })
    })
}

//Add Role

    function addRole () {
        db.query ( `SELECT * FROM department` , (err, result) =>{
            if(err) throw err;
            inquirer.prompt([
                {
                    name: "role",
                    type: "input",
                    message: 'What Role Would You Like To Add?',
                },
                {
                    name: 'salary',
                    type: 'input',
                    message: 'What Is Salary For The Role?',
                    validate: input => {
                        if (isNaN(input)) {
                            console.log ('Please enter number!')
                            return false;
                        }
                        else {
                            return true;
                        }
                        }
                    },
                    {
                        name: 'department',
                        type: 'list',
                        message: "What Department Does Role Belong To?",
                        choices: () =>
                        result.map((result) => result.name),
                    }
                
            ])
            .then(function (answers) {
                const DepartmentId = result.filter((result) => result.name === answers.department) [0].id;
                db.query(
                    'ALTER TABLE role AUTO_INCREMENT = 1; INSERT INTO role SET ?',
                    {
                        title: answers.role,
                        salary: answers.salary,
                        department_id: DepartmentId
                    },
                    function (err) {
                        if (err) throw err;
                        console.log(answers.role + ' Successfully Added To Roles Under' + answers.department);
                        init();
                    }
                );
            });
        }

        )
    };
    // Add Employee

    function addEmployee ()
    {
        db.query (
            `SELECT DISTINT title, id FROM role`, (err,role_result) => {
                if (err) throw err;
                db.query (
                    `SELECT DISTINCT CONCAT(e.first_name." ",e.last_name) AS mananager_name,e,id
                    FROM employee
                    LEFT JOIN employee e
                    ON employee.manager_id = e.id
                    WHERE employee.manager_id IS NOT NULL`, (err,manager_result) => 
                    {
                        if (err) throw err;
                        inquirer.prompt([
                            {
                                name: "first_name",
                                type: 'input',
                                message: "What Is Employee's First Name?",
                            },
                            {
                                name: "last_name",
                                type: 'input',
                                message: "What Is Employee's Last Name?",
                            },
                            {
                                name: "role",
                                type: 'list',
                                message: "What Is Employee's Role?",
                                choices: () =>
                                role_result.map((role_result) => role_result.title),
                            },
                            {
                                name: "manager",
                                type: 'list',
                                message: "Who Is Employee's Manager?",
                                choices: () =>
                                manager_result.map((manager_result) => manager_result.manager_name),
                            }

                        ])
                        .then(function (answers) {
                            const ManagerId = manager_result.filter((manager_result) => manager_result.manager_name === answers.manager) [0].id;
                            const RoleId = role_result.filter((role_result) => role_result.title === answers.role) [0].id;
                            db.query(
                                'ALTER TABLE employee AUTO_INCREMENT = 1; INSERT INTO employee SET ?',
                                {
                                    first_name: answers.first_name,
                                    last_name: answers.last_name,
                                    role_id: RoleId,
                                    manager_id: ManagerId
                                },
                                function (err) {
                                    if (err) throw err;
                                    console.log(answers.first_name + ' ' + answers.last_name + ' Is Successfully Added!!');
                                    init();
                                }

                            );
                        
                    }
                );
            }

        )
    }
        )
    };
//Update role

function updateRole () {
    db.query(`SELECT * FROM employee`, (err, employee_result) => {
        if (err) throw err;
        db.query(`SELECT * FROM role`, (err, role_result) => {
            if (err) throw err;
            inquirer.prompt([
                {
                    name: 'employee',
                    type: 'list',
                    message: 'Which Employee Would You Like To Update?',
                    choices: () =>
                    employee_result.map(
                        (employee_result) => employee_result.first_name + ' ' + employee_result.last_name
                    ),
                },
                {
                    name: 'role',
                    type: 'list',
                    message: 'Which Role Would You Like To Assign To Selected Employee?',
                    choices: () =>
                   role_result.map(
                        (role_result) => role_result.title
                    ),
                },
            ])
            .then((answers) => {
                const RoleId = role_result.filter((role_result) => role_result.title === answers.role)[0].id;
                const EmpId = employee_result.filter((employee_result) => employee_result.first_name + ' ' + employee_result.last_name === answers.employee)[0].id;
                db.query(
                    `UPDATE employee SET ? WHERE ?`
                    [{
                        role_id: RoleId
                    },
                    {
                        id: EmpId
                    
                }],
                function (err) {
                    if (err) throw err;
                    console.log(answers.employee + "'s Role Is Successfully Updated!");
                    init();
                }
                );

            });
        })
    })
}
//Update Employee manager
function updateManager () {
    db.query(`SELECT * FROM employee`, (err, employee_result) => {
        if (err) throw err;
    db.query(`SELECT DISTINCT CONCAT(e.first_name," ",e.last_name) AS manager_name,e.id
    FROM employee
    LEFT JOIN employee e
    ON employee.manager_id = e.id
    WHERE employee.manager_id IS NOT NULL`, (err, manager_result) => {
        if (err) throw err;
        inquirer.prompt([
            {
                name: 'employee',
                type: "list",
                message: 'Which Employee Would You Like To Update?',
                choices: () =>
                employee_result.map(
                    (employee_result) => employee_result.first_name + " " + employee_result.last_name
                ),
            },
            {
                name:"manager",
                type:'list',
                message: "Who Is Employee's New Manager?",
                choices: () =>
                manager_result.map(
                    (manager_result) => manager_result.manager_name
                ),
            },
        ])
        .then((answers) => {
            const ManagerId = manager_result.filter((manager_result) => manager_result.manager_name === answers.manager)[0].id;
            const EmpId = employee_result.filter((employee_result) => employee_result.first_name + " " + employee_result.last_name === answers.employee)[0].id;
            db.query (
                `UPDATE employee SET ? WHERE ?`,
                [{
                    manager_id: ManagerId
                },
            {
                id: EmpId
            }],
            function (err) {
                if (err) throw err;
                console.log(answers.employee + "'s Manger Is Successfully Updated!!");
                init();
            }
            );
        });
    })

})
};

function viewManager () {
    db.query (
        `SELECT DISTINCT CONCAT(e.first_name," ",e.last_name) AS manager_name
        FROM employee
        LEFT JOIN employee e 
        ON employee.manager_id = e.id
        WHERE employee.manager_id IS NOT NULL`, (err,result) => {
            if (err) throw err;
            inquirer.prompt({
                name: 'manager',
                type: 'list',
                message: "Which Manager's Team Would You Like To View?",
                choice: () =>
                result.map((result) => result.manager_name),
            })
            .then ((answer) => {
               db.query (
                    `SELECT employee.id,employee.first_name,employee.last_name,title,name AS department,salary
                    FROM employee
                    LEFT JOIN role
                    ON employee.role_id = role.id
                    LEFT JOIN department
                    ON role.department_id = department.id
                    LEFT JOIN employee e 
                    ON employee.manager_id = e.id
                    WHERE CONCAT(e.first_name," ",e.last_name) = "${answer.manager}"
                    ORDER BY employee.role_id`, (err,finResult) =>{
                        if (err) throw err;
                        console.table(answer.manager + "'s Team: ", finResult);
                        init();
                    } 
                )
            })
        }
    )
}

//View Emp By Dep

function viewEmpDep () {
    db.query (
        `SELECT DISTINCT name FROM department`, (err,result) =>{
            if (err) throw err;
            inquirer.prompt({
                name: 'department',
                type: 'list',
                message: "Which Department Would You Like To View?",
                choices: () =>
                result.map((result) => result.name),
            })
            .then ((answer) => {
                db.query (
                    `SELECT employee.id,employee.first_name,employee.last_name,title,name AS department,salary,
                    CONCAT(e.first_name," ",e.last_name) as manager
                    FROM employee
                    LEFT JOIN role
                    ON employee.role_id = role.id
                    LEFT JOIN department
                    ON role.department_id = department.id
                    LEFT JOIN employee e 
                    ON employee.manager_id = e.id
                    WHERE name = "${answer.department}"
                    ORDER BY employee.role_id`, (err,finResult) =>{
                        if (err) throw err;
                        console.table("Employees Under " + answer.department + " Department: ", finResult);
                        init();
                    }
                )
            })
        }
    )
}

//DELETE DEP


function deleteDepartment () {
    db.query('SELECT DISTINCT name FROM department', (err, result) => {
        if (err) throw err;
        inquirer.prompt({
            name: 'department',
            type: 'list',
            message: "Which Department Do You Want To Delete?",
            choices: () =>
            result.map((result) => result.name)

        })
        .then ((answer) => {
            db.query(`SET FOREIGN_KEY_CHECKS=0;
            DELETE FROM department WHERE ?`,  {name: answer.department},
            (err, result) => {
                if (err) throw err;
                console.log(
                    "Successfully deleted " + answer.department + "department."
                    
                );
                init();
            });
        })
    })
}
//DELETE ROLE

function deleteRole () {
    db.query("SELECT DISTINCT title FROM role", (err, result) => {
        if (err) throw err;
       inquirer.prompt({
        name: 'title',
        type: 'list',
        message: "Which Role Would You Like To Delete?",
        choices: () =>
        result.map((result) => result.title)
       }) 
       .then ((answer) => {
        db.query(`SET FOREIGN_KEY_CHECKS=0;
        DELETE FROM role WHERE ?`, {title: answer.title},
        (err, result) => {
            if (err) throw err;
            console.log(
                "You Have Successfully Deleted The " + answer.title + " role."
            );
            init();
        });
       })
    })
}

// delete employees

function deleteEmployee() {
    db.query("SELECT DISTINCT CONCAT(first_name, ' ',last_name) AS full_name FROM employee", (err, result) => {
        if (err) throw err;
        inquirer.prompt({
            name: "full_name",
            type: 'list',
            message: "Which Employee Would You Like To Delete?",
            choices: () =>
            result.map((result) => result.full_name)
        })
        .then ((answer) => {
            console.log(answer.full_name)
            db.query(`SET FOREIGN_KEY_CHECKS=0;
            DELETE FROM employee WHERE CONCAT(first_name, ' ',last_name) = "${answer.full_name}"`,
            (err, result) => {
                if (err) throw err;
                console.log( "Successfully Deleted Employee " + answer.full_name + ".");
                init();
            });
        })
    })
}

//Total Budget

function viewBudget () {
    db.query (`SELECT DISTINCT name from department`, (err,result) => {
        if (err) throw err;
        inquirer.prompt({
            name: 'department',
            type: 'list',
            message: "Which Department Would You Like To View?",
            choices: () => result.map((result) => result.name),
        })
        .then ((answer) => {
            db.query ( `SELECT name AS department, SUM(salary) AS utilized_Budget
            FROM employee
            LEFT JOIN role
            ON employee.role_id = role.id
            LEFT JOIN department
            ON role.department_id = department.id
            WHERE name = "${answer.department}"
            GROUP BY name`, (err,finResult) => {
                if(err) throw err;
                console.table("The Total Salary/Budget Of All Emloyees in " + answer.department + " department is:", finResult);
                init();
            })
        })
    })
}