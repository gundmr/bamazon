-- create database bamazon_db;

use bamazon_db;

CREATE TABLE departments(
	department_id integer auto_increment,
	department_name varchar(50),
	over_head_costs integer,
	primary key(department_id)
	);

select * from departments;


use bamazon_db;

-- ADD DEPARTMENT INFO -- 
insert into departments (department_name, over_head_costs)
values 
("clothing", 60000),
("shoes", 100000),
("food", 25000),
("movie", 40000);

select * from departments;