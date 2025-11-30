import pool from "../config/db";

export interface DesignationInput {
  designation_name: string;
}

export const DesignationService = {
  // CREATE
  async createDesignation(payload: DesignationInput) {
    const query = `
      INSERT INTO designations (designation_name)
      VALUES ($1)
      RETURNING *;
    `;

    const result = await pool.query(query, [payload.designation_name]);
    return result.rows[0];
  },

  // GET ALL
  async getAllDesignations() {
    const query = `
      SELECT *
      FROM designations
      ORDER BY id ASC;
    `;

    const result = await pool.query(query);
    return result.rows;
  },

  // UPDATE
  async updateDesignation(id: number, payload: DesignationInput) {
    const query = `
      UPDATE designations
      SET designation_name = $1
      WHERE id = $2
      RETURNING *;
    `;

    const result = await pool.query(query, [payload.designation_name, id]);
    return result.rows[0];
  },

  // DELETE
  async deleteDesignation(id: number) {
    const query = `
      DELETE FROM designations
      WHERE id = $1
      RETURNING *;
    `;

    const result = await pool.query(query, [id]);
    return result.rows[0];
  },
};
