DROP DATABASE IF EXISTS `angular7crud`;

CREATE DATABASE IF NOT EXISTS `angular7crud`;

use `angular7crud`;

CREATE  TABLE  IF NOT EXISTS users( id int not null auto_increment, firstname varchar(20), lastname varchar(20), address varchar(100), city varchar(20), state varchar(20), order_total float, primary key(id));

INSERT INTO `users` (`id`, `firstname`, `lastname`, `address`, `city`, `state`, `order_total`) VALUES ('1', 'Bhavana', 'Admin', '48-501', 'hyderabad', 'telangana', '55.09');


