CREATE TABLE IF NOT EXISTS `companies` (
	`company_id` int AUTO_INCREMENT NOT NULL UNIQUE,
	`cnpj` varchar(18) NOT NULL UNIQUE,
	`password` varchar(250) NOT NULL,
	`name` varchar(250) NOT NULL,
	`foundation` year,
	`collaborators` int,
	`location` varchar(250),
	PRIMARY KEY (`company_id`)
);

CREATE TABLE IF NOT EXISTS `users` (
	`user_id` int AUTO_INCREMENT NOT NULL UNIQUE,
	`email` varchar(250) NOT NULL,
	`password` varchar(250) NOT NULL,
	`name` varchar(250) NOT NULL,
	PRIMARY KEY (`user_id`)
);

CREATE TABLE IF NOT EXISTS `jobs` (
	`jobs_id` int AUTO_INCREMENT NOT NULL UNIQUE,
	`title` varchar(250) NOT NULL,
	`company` varchar(250) NOT NULL,
	`location` varchar(250) NOT NULL,
	`salary` varchar(250) NOT NULL,
	`lowDesc` varchar(250) NOT NULL,
	`longDesc` varchar(250) NOT NULL,
	`jobType` varchar(250) NOT NULL,
	`benefits` varchar(250) NOT NULL,
	`workModel` varchar(250) NOT NULL,
	`candidates` int NOT NULL,
	`createdAt` date NOT NULL,
	PRIMARY KEY (`jobs_id`)
);



