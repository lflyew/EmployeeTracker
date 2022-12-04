//require packages

const mysql = require('mysql2');
const inquirer = require('inquirer');

const consoleTable = require ('console.table');

//db connect
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: "companyemp_db"
    },
    console.log('Connected to companyemp database.')

);
// connects to sql database

db.connect(function(err){
    if(err) throw err;
    console.log('connected as id ${db.threadId}');
    console.log("=====================================")
    console.log("||                                 ||")
    console.log("||        EMPLOYEE DATABASE        ||")
    console.log("||                                 ||")
    console.log("=====================================")
init();
});

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

    }) .then(function(answer){
        switch (answer.action){
            case "Add A Department":
                addDepartment();
                break;

                case "Add A Department":
                addDepartment();
                break;

                case "Add A Role":
                addRole();
                break;

                case "Add An Employee":
                addEmployee();
                break;

                case "View Department":
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
                    db.end

                console.log("Thanks For Using Employee Tracker!")

     //View Departments

function viewDepartment () {

    const sql = `Select * From Department`;
    db.query (sql, (err,result) =>{
        if(err) throw err;
        console.table(result);
        init();
    });
}

//View Roles

function viewRole () {
    const sql = `Select role.id,title, department.name AS department,salary 
    FROM role 
    LEFT JOIN department
    ON role.department_id = department.id
    ORDERE BY role.id;`;
    db.query (sql, (err,result) => {
        if (err) throw err;
        console.table(result);
        init();
    });
}

//View Employees

function viewEmployee() {
    const sql = `Select employee.id,employee.first_name,employee.last_name,title,name AS department,salary,
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
        if(err) throw err;
        console.table(result);
            init();
     });

}


                
        }
    })
}

