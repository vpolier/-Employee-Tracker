const inquirer = require('inquirer');
const mysql = require('mysql2');
const table = require("console.table")

const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'T&ADanaiOLier22',
      database: 'employee_cms_hw'
    }
  );

  db.connect(function(err) {
    if(err) console.error(err)
  })

inquirer
  .prompt([
    {
      type: 'list',
      message: 'What would you like to do?',
      name: 'choice',
      choices: [
        'View All departments',
        'View All roles',
        'Add department',
      ]
    },
  ])
  .then((response) => {
    // check what user selected handle the choice
    switch(response.choice) {
        case 'View All departments': {
            // connect 
            getAllDepartment()
            break;
        }
        case 'Add department': {
            //
            addDepartment()
            break;
        }
       // case ''
    }
  }
  );

function getAllDepartment() {
    // go to database and get all departments - mysql
    db.query(`SELECT * FROM departments`, (err, result) => {
        if (err) {
          console.log(err);
        }
        console.table(result);
      });

function addDepartment()
      inquirer.prompt([
        {
            type: 'input',
            message: 'What is department name?',
            name: 'name'
        }
      ])
      .then(response => {
        db.query(`INSERT INTO departments ('name') VALUES (?);`, [response.name], (err, result) => {
            if (err) {
              console.log(err);
            }
            console.log("Added department");
          });
      })
}