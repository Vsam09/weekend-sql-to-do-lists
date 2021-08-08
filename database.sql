CREATE TABLE "tasks" (
	id SERIAL,
	task varchar(1000),
	complete BOOLEAN DEFAULT FALSE
);
INSERT INTO "tasks"
("task", "complete")
VALUES
('Go Fishing', 'False');