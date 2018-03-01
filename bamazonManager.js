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
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Quit"]
        })
        .then(function (answer) {
            switch (answer.option) {
                case "View Products for Sale":
                    viewProducts();
                    break;
                case "View Low Inventory":
                    lowInventory();
                    break;
                case "Add to Inventory":
                    increaseNumber();
                    break;
                case "Add New Product":
                    newProduct();
                    break;
                case "Quit":
                    conn.end();
                    break;
            }
        })
    };

function viewProducts(){
    conn.query('SELECT * FROM `products`', function (err, res) {
        if (err) { throw err; };
        if (res && res.length) {
            console.log('\x1b[33m%s\x1b[0m', '\n CURRENT INVENTORY: \n');
            console.table(res);
            console.log('\x1b[33m%s\x1b[0m', '-------------------------------------------- \n');
        }
    start();
    })
};

function lowInventory() { 
//If a manager selects View Low Inventory, then it should list all items with an inventory count lower than five.
    conn.query('SELECT * FROM `products` where `stock_quantity` < 5', function (err, res) {
        if (err) { throw err; };
        if (res && res.length) {
            console.log('\x1b[33m%s\x1b[0m', '\n LOW INVENTORY: \n');
            console.table(res);
            console.log('\x1b[33m%s\x1b[0m', '-------------------------------------------- \n');
        }
        start();
    })
};

function increaseNumber() { 
//If a manager selects Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in the store.
    inquirer.prompt([
        {
            name: "choice",
            message: "Hello! Which item's inventory would you like to increase?",
            validate: function (value) {
                if (isNaN(value) === false && parseInt(value) > 0) {
                    return true;
                }
                return false;
            }
        },
        {
            name: "howMany",
            message: "How many units of the product would you like to increase? (type q to quit)",
            validate: function (value) {
                if (value === 'q' || isNaN(value) === false && parseInt(value) > 0) {
                    return true;
                }
                return false;
            }
        }]).then(function (answer) {
            if (answer.choice === 'q' || answer.howMany === 'q') {
                conn.end();
            }
            else {
                updateInventory(answer.choice, answer.howMany);
            }
        })
};

function updateInventory(id, quantity) {
    var number = parseInt(quantity);
    conn.query('SELECT stock_quantity FROM `products` WHERE ?', { item_id: id }, function (err, res) {
        if (err) throw err;
        if (res && res.length) {
            var newInventory = parseInt(res[0].stock_quantity) + number;
                conn.query(
                    "UPDATE products SET ? WHERE ?",
                    [
                        {
                            stock_quantity: newInventory
                        },
                        {
                            item_id: id
                        },
                    ],
                    function (err) {
                        if (err) throw err;
                        console.log('\x1b[33m%s\x1b[0m', '\n Item ID #' + id + ' inventory is now updated. The new amount is: ' + newInventory + '\n');
                        start(); 
                    }
                );
        }
    });
};

function newProduct() { 
//If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.
    console.log('\x1b[33m%s\x1b[0m', '\n This feature is in progress. Please try again later! :) \n');
    start();
};