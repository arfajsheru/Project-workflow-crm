CREATE TABLE IF NOT EXISTS departments (
    id SERIAL PRIMARY KEY,
    company_id INT NOT NULL REFERENCES companies(id),
    department_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    created_by INT REFERENCES users(id)

);

CREATE TABLE IF NOT EXISTS teams (
    id SERIAL PRIMARY KEY,
    company_id INT NOT NULL REFERENCES companies(id),
    department_id INT NOT NULL REFERENCES departments(id),
    team_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);
