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
connection.connect(function(err) {
  if (err) throw err;
  purchaseItems();
});



function purchaseItems() {
  // query the database for all items available to be sold
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    // prompt the user for which they'd like to purchase

    inquirer
      .prompt([
        {
          name: "choice",
          type: "rawlist",
          choices: function() {
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].product_name);
            }
            return choiceArray;
          },
          message: "What item would you like to purchase?"
        },
        {
          name: "quantitiy", 
          type: "input",
          message: "How many would you like to purchase?"
        }
      ])
      .then(function(answer) {
        // get the information of the chosen item
        var chosenItem;
        for (var i = 0; i < results.length; i++) {
          // console.log(results[i].product_name)
          console.log("answer:",answer)
          if (results[i].product_name == answer.choice) {
            chosenItem = results[i];
            console.log("chosen inside ", chosenItem)
            console.log("here")
            //console.log(chosenItem);
          }
        }

        // determine if stock quantitiy is great than or = to desired quantity
        if (chosenItem.stock_quantitiy >= parseInt(answer.quantitiy)) {
    
          //if desired quantity was below available stock - update db, start over
          connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              {
                stock_quantitiy: [chosenItem.stock_quantitiy - answer.quantitiy],
              },
              {
                product_name: chosenItem.product_name,
              },
            ],
            function(error) {
              console.log(chosenItem);
              if (error) throw err;
              console.log("Order Has Been Placed for: " + answer.quantitiy + " " + chosenItem.product_name);
              console.log("Your Purchase Total is: $" + answer.quantitiy * chosenItem.price);
              //start();
            }
          );
        }
        else {
          //deisred quantity was above available stock and start over
          console.log("Sorry, there is not enough stock to complete your order.");
          //start();
        }
      });
  });
}



