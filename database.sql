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

/********************* Products Data *********************/
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Fire and Fury", "Books", 17.99, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("The Unbearable Lightness of Being", "Books", 2.99, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Little Fires Everywhere", "Books", 15.28, 0, 2000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("10 Pack: White T-Shirts", "Clothing", 49.99, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Men's Slim-Fit Chino Pants", "Clothing", 30, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Luxury Loafers", "Clothing", 500, 2);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("E-Reader", "Electronics", 79.99, 2000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Fancy TV", "Electronics", 2936.72, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Ear Buds", "Electronics", 1.99, 10000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Home Speaker Thing", "Electronics", 149.99, 100);


/********************* Departments Data *********************/
INSERT INTO departments (department_name, over_head_costs)
VALUES ("Electronics", 10000);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Clothing", 60000);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Books", 2000);