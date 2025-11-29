import pool from "../config/db";

export interface CompanyInput {
  company_name: string;
  company_type_id: number;
  industry: string;
  address: string;
  email: string;
  phone: string;
}

export const CompanyService = {
  // CREATE
  async createCompany(data: CompanyInput) {
    const query = `
      INSERT INTO companies
      (company_name, company_type_id, industry, address, email, phone)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;

    const values = [
      data.company_name,
      data.company_type_id,
      data.industry,
      data.address,
      data.email,
      data.phone,
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  },

  // GET ALL
  async getAllCompany() {
    const query = `
      SELECT c.*, ct.type_name AS company_type
      FROM companies c
      LEFT JOIN company_types ct 
      ON c.company_type_id = ct.id
      ORDER BY c.id ASC;
    `;

    const result = await pool.query(query);
    return result.rows;
  },

  // GET BY ID
  async getCompanyById(id: number) {
    const query = `
      SELECT c.*, ct.type_name AS company_type
      FROM companies c
      LEFT JOIN company_types ct 
      ON c.company_type_id = ct.id
      WHERE c.id = $1;
    `;

    const result = await pool.query(query, [id]);
    return result.rows[0];
  },

  // UPDATE
  async updateCompany(id: number, data: CompanyInput) {
    const query = `
      UPDATE companies
      SET 
        company_name = $1,
        company_type_id = $2,
        industry = $3,
        address = $4,
        email = $5,
        phone = $6,
        updated_at = NOW()
      WHERE id = $7
      RETURNING *;
    `;

    const values = [
      data.company_name,
      data.company_type_id,
      data.industry,
      data.address,
      data.email,
      data.phone,
      id,
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  },

  // DELETE
  async deleteCompany(id: number) {
    const query = `
      DELETE FROM companies
      WHERE id = $1
      RETURNING *;
    `;

    const result = await pool.query(query, [id]);
    return result.rows[0];
  },
};
