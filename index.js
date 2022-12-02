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
