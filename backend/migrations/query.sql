ALTER TABLE departments
ADD COLUMN created_by INT REFERENCES users(id);