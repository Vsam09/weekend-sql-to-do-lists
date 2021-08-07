CREATE TABLE "tasks" (
	id SERIAL,
	task varchar(1000),
	date date
);
INSERT INTO "tasks"
("task", "date")
VALUES
('Go Fishing', '05-31-2022');