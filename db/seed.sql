INSERT INTO department (name)
VALUES 
('IT'),
('Finance & Accounting'),
('Sales & Marketing'),
('Maintenance')
('Operations');

INSERT INTO role (title, salary, department_id)
VALUES
('Full Stack Developer', 80000, 1),
('Software Engineer', 120000, 1),
('Accountant', 10000, 2), 
('Finanical Analyst', 150000, 2),
('Marketing Coordindator', 70000, 3), 
('Sales Lead', 90000, 3),
('Project Manager', 100000, 4),
('Operations Manager', 90000, 4);
('Maintenance', 60000, 5);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
('Kevin', 'Miller', 2, null),
('Vanessa', 'Anderson', 1, 1),
('Bethany', 'Brown', 4, null),
('John', 'Jones', 3, 3),
('Lynne', 'Moore', 6, null),
('Christopher', 'Sanchez', 5, 5),
('David', 'Allen', 7, null),
('Laura', 'Green', 8, 7);