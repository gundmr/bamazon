# Customer View
##Data is stored for bamazon in MySQL DB inside of a products table with the following columns:
* item_id (unique id for each product)
* product_name (Name of product)
* department_name
* price (cost to customer)
* stock_quantity (how much of the product is available in stores)
<image>

##bamazonCustomer.js
Using inquirer you are able to run bamazonCustomer.js which will display all items available for sale. The app prompts users with two messages:
1. What product they would like to buy
1. How many units of the product they would like to buy
<image>

Once the customer has placed the order, the application will check if your store has enough of the product to meet the customer's request. 
1. If there is enough quantity the order will be placed and prompt user for $ due.
<image>
1. If there is not enough quantity the user will prompt will a blocking message
<image>
  
The DB will be updated to reflect the new quantity, post purchase. 


# Manager View
##bamazonManager.js
Using inquirer you are able to run bamazonManager.js which will display all items available for sale. The app prompts managers with following options for requests/functions:
1. View Products for Sale: app should list every available item: the item IDs, names, prices, and quantities.
<image>
1. View Low Inventory: list all items with an inventory count lower than five
  <image>
1. Add to Inventory: display a prompt that will let the manager "add more" of any item currently in the store
<image>
1. Add New Product: allow the manager to add a completely new product to the store 
<image>


