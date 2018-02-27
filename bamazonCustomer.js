/*
Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.
If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.
However, if your store does have enough of the product, you should fulfill the customer's order.
This means updating the SQL database to reflect the remaining quantity.
Once the update goes through, show the customer the total cost of their purchase.
*/

var mysql = require("mysql");
var inquirer = require("inquirer");

var conn = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    database: "bamazon"
});

conn.connect(function (err) {
    if (err) throw err;
    console.log("connected as ID: " + conn.threadId);
    start();
});

function start() {
    conn.query('SELECT * FROM `products`', function (err, res) {
        if (err) { throw err; }
        inquirer.prompt([
            {
                type: "rawlist",
                name: "choice",
                message: "Hello! Which item would you like to purchase?",
                choices: function () {
                    var choiceArray = [];
                    for (var i = 0; i < res.length; i++) {
                        choiceArray.push("ID: " + res[i].item_id + " | Name: " + res[i].product_name + " | Price: " + res[i].price);
                    }
                    return choiceArray;
                }
            }
        ]).then(function (answer) {
            console.log(answer.choice);
            inquirer.prompt([{
                type: "input",
                name: "howMany",
                message: "How many units of the product would you like to buy?"
            }
        ]).then(function (answer)
            {
                console.log(answer.howMany);
            })
        });
    });
    conn.end();
};