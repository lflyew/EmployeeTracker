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
        }
    })
}

