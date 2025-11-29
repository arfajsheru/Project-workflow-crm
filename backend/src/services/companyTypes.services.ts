import pool from "../config/db";

export interface CompanyTypeInput {
  type_name: string;
}

export const CompanyTypeServices = {
  // Create a new company type
  async createType(payload: CompanyTypeInput) {
    const query = `
            INSERT INTO company_types (type_name)
            VALUES ($1)
            RETURNING *;
        `;

    const values = [payload.type_name];

    const result = await pool.query(query, values);
    return result.rows[0];
  },

  // Get all company types
  async getAllTypes() {
    const query = `
        SELECT id, type_name FROM company_types ORDER BY id ASC`;

    const result = await pool.query(query);
    return result.rows;
  },

  // ---------------- UPDATE ----------------
  async updateType(id: number, payload: CompanyTypeInput) {
    const query = `
      UPDATE company_types
      SET type_name = $1
      WHERE id = $2
      RETURNING *;
    `;
    const values = [payload.type_name, id];

    const result = await pool.query(query, values);
    return result.rows[0];
  },

  // ---------------- DELETE ----------------
  async deleteType(id: number) {
    const query = `
      DELETE FROM company_types
      WHERE id = $1
      RETURNING *;
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  },
};
