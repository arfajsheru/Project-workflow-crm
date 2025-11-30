import pool from "../config/db";

export interface RoleInput {
  role_name: string;
}

export const RoleService = {
  // CREATE
  async createRole(payload: RoleInput) {
    const query = `
      INSERT INTO roles (role_name)
      VALUES ($1)
      RETURNING *;
    `;

    const result = await pool.query(query, [payload.role_name]);
    return result.rows[0];
  },

  // GET ALL
  async getAllRoles() {
    const query = `
      SELECT *
      FROM roles
      ORDER BY id ASC;
    `;

    const result = await pool.query(query);
    return result.rows;
  },


  // UPDATE
  async updateRole(id: number, payload: RoleInput) {
    const query = `
      UPDATE roles
      SET role_name = $1
      WHERE id = $2
      RETURNING *;
    `;

    const result = await pool.query(query, [payload.role_name, id]);
    return result.rows[0];
  },

  // DELETE
  async deleteRole(id: number) {
    const query = `
      DELETE FROM roles
      WHERE id = $1
      RETURNING *;
    `;

    const result = await pool.query(query, [id]);
    return result.rows[0];
  },
};
