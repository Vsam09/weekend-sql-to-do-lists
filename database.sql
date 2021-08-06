CREATE TABLE "task" (
	id SERIAL,
	task varchar(1000),
	date date
);
INSERT INTO "task"
("task", "date")
VALUES
('Go Fishing', '05-31-2022');