DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products (
  item_id INT AUTO_INCREMENT NOT NULL, -- item_id unique id for each product
  product_name VARCHAR(100) NOT NULL, -- product_name Name of product
  department_name VARCHAR(100) NOT NULL, -- department_name
  price DECIMAL(14,2) NOT NULL, -- price cost to customer
  stock_quantity INT default 0, -- how much of the product is available in stores
  product_sales INT default 0, -- records how many purchases have been made
  PRIMARY KEY (item_id)
);

CREATE TABLE departments (
department_id INT AUTO_INCREMENT NOT NULL,
department_name VARCHAR(100),
over_head_costs DECIMAL(14,2), -- A dummy number you set for each department
PRIMARY KEY (department_id)
);