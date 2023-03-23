//import inquirer
const inquirer = require('inquirer');
//import mysql2
const mysql = require('mysql2');
//import console.table
const cTable = require('console.table');

require('dotenv').config()

//connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  // MySQL username,
  user: 'root',
  // MySQL password
  password: 'T&ADanaiOLier22',
  database: 'employee_cms_hw'
});

connection.connect(err => {
  if(err) throw err;
  console.log('connected as id' + connection.threadId);
  afterConnection();
});

// function after connection is established and welcome image shows 
afterConnection = () => {
  console.log("***********************************")
  console.log("*                                 *")
  console.log("*        EMPLOYEE MANAGER         *")
  console.log("*                                 *")
  console.log("***********************************")
  promptUser();
};

//inquirer prompt for first action
const promptUser = () =>
  inquirer.prompt([
    {
      type: 'list',
      name: 'choices',
      message: 'What would you like to do?',
      choices: ['View All departments',
                'View All roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Update an employee manager',
                'View employees by department',
                'Delete a department',
                'Delete a role',
                'Delete an employee',
                'View department budgets',
                'No Action']
  },
])

  .then((response) => {
    const { choices } = response;
    // check what user selected handle the choice
    if (choices === "View all departments") {
      showDepartments();
    }

    if (choices === "View all roles") {
      showRoles();
    }

    if (choices === "View all employees") {
      showEmployees();
    }

    if (choices === "Add a department") {
      addDepartment();
    }

    if (choices === "Add a role") {
      addRole();
    }

    if (choices === "Add an employee") {
      addEmployee();
    }

    if (choices === "Update an employee role") {
      updateEmployee();
    }

    if (choices === "Update an employee manager") {
      updateManager();
    }

    if (choices === "view employee by department") {
      employeeDepartment();
    }

    if (choices === "Delete a department") {
      deliteDepartment();
    }

    if (choices === "Delite a role") {
      deleteRole();
    }

    if (choices === "Delete an employee") {
      deleteEnployee();
    }


    if (choices === "view department budgets") {
      viewBudget();
    }

    if (choices === "No Action") {
      connection.end();
    };
  });
};

//function to show all departments go to database and get all departments - mysql
showDepartments = () => {
  console.log(Showing all department...\n');
  const sql = 'SELECT department.id AS id, department.name AS department From department';
  
  connection.promise().query(sql, (err, rows) => {
    if (err) throw err;
    console.table(rows);
    promptUser();
  });
});

//function to show all roles
showRoles = () => {
  console.log('Showing all roles...\n');

  const sql = `SELECT role.id, role.title, department.name AS department
  FROM role
  INNER JOIN department ON role.department_id = department.id`;

  onnection.promise().query(sql, (err, rows) => {
    if (err) throw err;
    console.table(rows);
    promptUser();
  });
};

// function to show all employees 
showEmployees = () => {
  console.log('Showing all employees...\n'); 
  const sql = `SELECT employee.id, 
                      employee.first_name, 
                      employee.last_name, 
                      role.title, 
                      department.name AS department,
                      role.salary, 
                      CONCAT (manager.first_name, " ", manager.last_name) AS manager
               FROM employee
                      LEFT JOIN role ON employee.role_id = role.id
                      LEFT JOIN department ON role.department_id = department.id
                      LEFT JOIN employee manager ON employee.manager_id = manager.id`;

  connection.promise().query(sql, (err, rows) => {
    if (err) throw err; 
    console.table(rows);
    promptUser();
  });
};

// function to add a department 
addDepartment = () => {
  inquirer.prompt([
    {
      type: 'input', 
      name: 'addDept',
      message: "What department do you want to add?",
      validate: addDept => {
        if (addDept) {
            return true;
        } else {
            console.log('Please enter a department');
            return false;
        }
      }
    }
  ])
    .then(answer => {
      const sql = `INSERT INTO department (name)
                  VALUES (?)`;
      connection.query(sql, answer.addDept, (err, result) => {
        if (err) throw err;
        console.log('Added ' + answer.addDept + " to departments!"); 

        showDepartments();
    });
  });
};
// function to add a role 
addRole = () => {
  inquirer.prompt([
    {
      type: 'input', 
      name: 'role',
      message: "What role do you want to add?",
      validate: addRole => {
        if (addRole) {
            return true;
        } else {
            console.log('Please enter a role');
            return false;
        }
      }
    },
    {
      type: 'input', 
      name: 'salary',
      message: "What is the salary of this role?",
      validate: addSalary => {
        if (isNAN(addSalary)) {
            return true;
        } else {
            console.log('Please enter a salary');
            return false;
        }
      }
    }
  ])
    .then(answer => {
      const params = [answer.role, answer.salary];

      // grab dept from department table
      const roleSql = `SELECT name, id FROM department`; 

      connection.promise().query(roleSql, (err, data) => {
        if (err) throw err; 
    
        const dept = data.map(({ name, id }) => ({ name: name, value: id }));

        inquirer.prompt([
        {
          type: 'list', 
          name: 'dept',
          message: "What department is this role in?",
          choices: dept
        }
        ])
          .then(deptChoice => {
            const dept = deptChoice.dept;
            params.push(dept);

            const sql = `INSERT INTO role (title, salary, department_id)
                        VALUES (?, ?, ?)`;

            connection.query(sql, params, (err, result) => {
              if (err) throw err;
              console.log('Added' + answer.role + " to roles!"); 

              showRoles();
       });
     });
   });
 });
};

// function to add an employee 
addEmployee = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'fistName',
      message: "What is the employee's first name?",
      validate: addFirst => {
        if (addFirst) {
            return true;
        } else {
            console.log('Please enter a first name');
            return false;
        }
      }
    },
    {
      type: 'input',
      name: 'lastName',
      message: "What is the employee's last name?",
      validate: addLast => {
        if (addLast) {
            return true;
        } else {
            console.log('Please enter a last name');
            return false;
        }
      }
    }
  ])
    .then(answer => {
    const params = [answer.fistName, answer.lastName]