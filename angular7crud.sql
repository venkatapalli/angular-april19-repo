DROP DATABASE IF EXISTS `angular7crud`;

CREATE DATABASE IF NOT EXISTS `angular7crud`;

use `angular7crud`;

CREATE  TABLE  IF NOT EXISTS users( id int not null auto_increment, firstname varchar(20), lastname varchar(20), address varchar(100), city varchar(20), state varchar(20), order_total float, primary key(id));

-- order table
CREATE  TABLE  IF NOT EXISTS orders( order_id int(11) not null auto_increment, product_name varchar(50), order_total float,customer_id int(11) not null, primary key(order_id));


INSERT INTO `users` (`id`, `firstname`, `lastname`, `address`, `city`, `state`, `order_total`) VALUES ('1', 'Bhavana', 'Admin', '48-501', 'hyderabad', 'telangana', '55.09');

--REGISTER ADD COLUMNS
ALTER TABLE `users` ADD `username` VARCHAR(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL, ADD `password` VARCHAR(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL;

--USER ROLES 
ALTER TABLE `users` ADD `role_id` int(11) NULL DEFAULT NULL

--ROLES TABLE CREATE
CREATE  TABLE  IF NOT EXISTS roles( role_id int(11) not null auto_increment, role_name varchar(20),customer_id int(11) DEFAULT null, primary key(role_id));
INSERT INTO `roles` (`role_id`, `role_name`, `customer_id`) VALUES ('1', 'Super Admin', '1'), ('2', 'Customer', '2');

--insert users for roles
INSERT INTO `users` (`id`, `firstname`, `lastname`, `address`, `city`, `state`, `order_total`, `username`, `password`, `role_id`) VALUES ('1', 'Super', 'Admin', '8-2-120/76', 'Hyderabad', 'Telangana', '123.56', 'superadmin', 'abc123', '1'), ('2', 'Customer', 'User', '5-7-135/9', 'xyzabc', 'Andhra Pradesh', '999.87', 'customuser', 'abc123', '2');