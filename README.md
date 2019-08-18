# Customer View
## Data is stored for bamazon in MySQL DB inside of a products table with the following columns:
* item_id (unique id for each product)
* product_name (Name of product)
* department_name
* price (cost to customer)
* stock_quantity (how much of the product is available in stores)
![mySQL image](https://raw.githubusercontent.com/gundmr/liri-node-app/master/concert.png)

## bamazon.js
Using inquirer you are able to run bamazonCustomer.js which will display all items available for sale. The app prompts users with two messages:
* What product they would like to buy
* How many units of the product they would like to buy
![bamazon.js question image](https://raw.githubusercontent.com/gundmr/liri-node-app/master/concert.png)

Once the customer has placed the order, the application will check if your store has enough of the product to meet the customer's request. 
* If there is enough quantity the order will be placed and prompt user for $ due.
![bamazon.js purchase image](https://raw.githubusercontent.com/gundmr/liri-node-app/master/concert.png)
* If there is not enough quantity the user will prompt will a blocking message
![bamazon.js no-purchase image](https://raw.githubusercontent.com/gundmr/liri-node-app/master/concert.png)
  
The DB will be updated to reflect the new quantity, post purchase. 


# Manager View
## bamazonManager.js
Using inquirer you are able to run bamazonManager.js which will display all items available for sale. The app prompts managers with following options for requests/functions:
* View Products for Sale: app should list every available item: the item IDs, names, prices, and quantities
  ![bamazonManager.js available image](https://raw.githubusercontent.com/gundmr/liri-node-app/master/concert.png)
* View Low Inventory: list all items with an inventory count lower than five
  ![bamazonManager.js low image](https://raw.githubusercontent.com/gundmr/liri-node-app/master/concert.png)
* Add to Inventory: display a prompt that will let the manager "add more" of any item currently in the store
  ![bamazonManager.js low image](https://raw.githubusercontent.com/gundmr/liri-node-app/master/concert.png)
* Add New Product: allow the manager to add a completely new product to the store 
  ![bamazonManager.js new image](https://raw.githubusercontent.com/gundmr/liri-node-app/master/concert.png)


