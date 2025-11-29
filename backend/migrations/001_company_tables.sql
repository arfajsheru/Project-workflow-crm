CREATE TABLE IF NOT EXISTS company_types (
    id SERIAL PRIMARY KEY,
    type_name VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS companies (
    id SERIAL PRIMARY KEY,
    company_name VARCHAR(150) NOT NULL,
    company_type_id INT REFERENCES company_types(id),
    industry VARCHAR(100),
    address TEXT,
    email VARCHAR(120),
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
