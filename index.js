const mysql = require('mysql2');
const inquirer = require('inquirer');

const consoleTable = require ('console.table');


const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: "company_db"
    },
    console.log('Connected to database.')

);
