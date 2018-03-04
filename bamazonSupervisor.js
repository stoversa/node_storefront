var mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');

var conn = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    database: "bamazon"
});

conn.connect(function (err) {
    if (err) throw err;
    start();
});

function start() {
    inquirer.prompt({
        name: "option",
        type: "list",
        message: "Please select an action: ",
        choices: ["View Product Sales by Department", "Create New Department", "Quit"]
    })
        .then(function (answer) {
            switch (answer.option) {
                case "View Product Sales by Department":
                    viewSales();
                    break;
                case "Create New Department":
                    createDept();
                    break;
                case "Quit":
                    conn.end();
                    break;
            }
        })
};

function viewSales() {
    var query = 
    `SELECT
    department_id as 'Department ID',
    d.department_name as 'Department Name',
        IFNULL(product_sales, 0) as 'Product Sales',
        over_head_costs as 'Overhead Costs',
        IFNULL((IFNULL(product_sales, 0) - over_head_costs), 0) as 'Total Profit'
    FROM
        (SELECT SUM(subtotal) AS 'product_sales', department_name FROM(
            SELECT price * product_sales AS 'subtotal', department_name FROM bamazon.products) sub GROUP BY department_name) sub2
    RIGHT JOIN bamazon.departments d on sub2.department_name = d.department_name;
    `
    
    conn.query(query, function (err, res) {
        if (err) { throw err; };
        if (res && res.length) {
            console.log('\x1b[33m%s\x1b[0m', '\n SALES BY DEPARTMENT: \n');
            console.table(res);
            console.log('\x1b[33m%s\x1b[0m', '-------------------------------------------- \n');
        }
        start();
    })
};

function createDept() {
    console.log('\x1b[33m%s\x1b[0m', '\n Please provide some information about the new department:  \n');
    inquirer.prompt([
        {
            name: "name",
            message: "What is the new department called?",
        },
        {
            name: "overhead",
            message: "What is the department's total overhead costs?",
        }])
        .then(function (answer) {
            addNew(answer.name, answer.overhead);
        });
};

function addNew(n, o) {
    var name = n.trim();
    var overhead = Number(o);
    conn.query(
        'INSERT INTO departments (department_name, over_head_costs) VALUES (?,?)',
        [name, overhead],
        function (err) {
            if (err) throw err;
            console.log('\x1b[33m%s\x1b[0m', '\n Department ' + name + ' has now been added to the department list!\n');
            start();
        }
    );
};