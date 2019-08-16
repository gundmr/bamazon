var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "adhawaiiu",
    database: "bamazon_db"
});

//connection
connection.connect(function (err) {
    if (err) throw err;
    runManager();
});


function runManager() {
    inquirer
        .prompt({
            name: "action",
            type: "rawlist",
            message: "What would you like to do?",
            choices: [
                "View Products for Sale",
                "View Low Inventory",
                "Add Inventory",
                "Add New Product"
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "View Products for Sale":
                    forSaleSearch();
                    break;

                case "View Low Inventory":
                    viewLow();
                    break;

                case "Add Inventory":
                    addInventory();
                    break;

                case "Add New Product":
                    addNew();
                    break;

            }
        });
}


//====== display all inventory for sale =========
function forSaleSearch() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].product_name + " | " + "$"+ res[i].price + " | " + res[i].stock_quantitiy);
        }

        runManager();
    });
}

//====== find products with inventory lower than 5 =========
function viewLow() {
    connection.query("SELECT * FROM products WHERE stock_quantitiy<=?", [5], function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].product_name + " | " + "$"+ res[i].price + " | " + res[i].stock_quantitiy);
        }
        runManager();
    });
}




//======increase inventory of existing product=========
function addInventory() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;

    // prompt for info about the product:
    inquirer
        .prompt([
            {
                name: "choice",
                type: "rawlist",
                choices: function () {
                    var choiceArray = [];
                    for (var i = 0; i < res.length; i++) {
                        choiceArray.push(res[i].product_name);
                    }
                    return choiceArray;
                },
                message: "What product would you like to add inventory?"
            },
            {
                name: "add_quantitiy",
                type: "input",
                message: "What amount are you adding?"
            }
        ])
        .then(function (answer) {
            // get the information of the selected(chosen) item
            var chosenItem;
            var numNewQuantity = parseInt(answer.add_quantitiy);
            
            for (var i = 0; i < res.length; i++) {
                if (res[i].product_name === answer.choice) {
                    chosenItem = res[i];
                connection.query(
                    "UPDATE products SET ? WHERE ?",
                    [
                        {
                            stock_quantitiy: [chosenItem.stock_quantitiy + numNewQuantity],
                        },
                        {
                            product_name: chosenItem.product_name,
                        },
                    ],
                    function (error) {

                        if (error) throw err;
                        console.log("Inventory has been updated for: " + chosenItem.product_name);
                        console.log("New Invetory Count: " + (numNewQuantity + chosenItem.stock_quantitiy));
                        runManager();
                    }
                );

                }
            }
        });
    });
}



//========add new product==============
function addNew() {
    // prompt for info about the product:
    inquirer
        .prompt([
            {
                name: "product",
                type: "input",
                message: "What is the product you would like to submit?"
            },
            {
                name: "department_name",
                type: "input",
                message: "What department would you like to place your product in?"
            },
            {
                name: "price",
                type: "input",
                message: "What is the price of your product?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            },
            {
                name: "stock_quantitiy",
                type: "input",
                message: "What is your inventory count?"
            }
        ])
        .then(function (answer) {
            // when finished prompting, insert a new item into the db with that info
            connection.query(
                "INSERT INTO products SET ?",
                {
                    product_name: answer.product,
                    department_name: answer.department_name,
                    price: answer.price || 0,
                    stock_quantitiy: answer.stock_quantitiy || 0
                },
                function (err) {
                    if (err) throw err;
                    console.log("Your product was successfully added!");
                    // re-prompt the manager tasks
                    runManager();
                }
            );
        });
}