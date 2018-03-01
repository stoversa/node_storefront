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
    conn.query('SELECT * FROM `products`', function (err, res) {
        if (err) { throw err; };
        if (res && res.length){
            console.table(res);
        };
        inquirer.prompt([
            {
                name: "choice",
                message: "Hello! Which item would you like to purchase?",
                validate: function (value) {
                    if (isNaN(value) === false && parseInt(value) > 0) {
                        return true;
                    }
                    return false;
                }
            },
            {
                name: "howMany",
                message: "How many units of the product would you like to buy? (type q to quit)",
                validate: function (value) {
                    if (value === 'q' || isNaN(value) === false && parseInt(value) > 0) {
                        return true;
                    }
                    return false;
            }
            }]).then(function (answer) {
                if (answer.choice === 'q' || answer.howMany === 'q'){
                    conn.end();
                }
                else{
                    checkInventory(answer.choice, answer.howMany);
                }
        })
    });
};

function checkInventory(id, quantity){
    var number = parseInt(quantity);
    conn.query('SELECT stock_quantity, price, product_sales FROM `products` WHERE ?', { item_id: id }, function (err, res) {
        var price = Number(res[0].price);
        var sales = parseInt(res[0].product_sales) + number;
        if (err) throw err;
        if (res && res.length) {
            if (res[0].stock_quantity >= number) {
                conn.query(
                    "UPDATE products SET ?,? WHERE ?",
                    [
                        {
                            stock_quantity: (res[0].stock_quantity - number)
                        },
                        {
                            product_sales: sales
                        },
                        {
                            item_id: id
                        },
                    ],
                    function (err) {
                        if (err) throw err;
                        console.log('\x1b[33m%s\x1b[0m', '\n Thank you for your purchase. Your total is: $' + (price * number) + '\n');
                        start();
                    }
                );
            }
            else {
                console.log('\x1b[31m%s\x1b[0m', '\n Our apologies: There is an insufficient quantity to complete this purchase! Please try again!\n');
                start();
            }
        }
    });
};