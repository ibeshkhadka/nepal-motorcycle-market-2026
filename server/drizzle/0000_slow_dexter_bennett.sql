CREATE TABLE `favorites` (
	`user_id` text NOT NULL,
	`model_key` text NOT NULL,
	PRIMARY KEY(`user_id`, `model_key`)
);
