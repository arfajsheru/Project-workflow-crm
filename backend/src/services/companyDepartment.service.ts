import pool from "../config/db";
export interface DepartmentInput {
  company_id: number;
  department_name: string;
  created_by: number;
}

export const DepartmentService = {
  async createDepartment(payload: DepartmentInput) {
    const query = `
        INSERT INTO departments (company_id, department_name, created_by)
        VALUES ($1, $2, $3)
        RETURNING *;
    `;

    const values = [
      payload.company_id,
      payload.department_name,
      payload.created_by,
    ];

    const result = await pool.query(query, values);

    return result.rows[0];
  },
  async getDepartment(company_id: number) {
    const query = `
        SELECT d.*, u.full_name AS created_by_name
        FROM departments d
        LEFT JOIN users u ON d.created_by = u.id
        WHERE d.company_id = $1
        ORDER BY d.id ASC;
    `;

    const result = await pool.query(query, [company_id]);
    return result.rows;
  },
  async updateDepartment(id: number, department_name: string) {
    const query = `
        UPDATE departments
        SET department_name = $1
        WHERE id = $2
        RETURNING  *;
    `;

    const values = [department_name, id];

    const result = await pool.query(query, values);
    return result.rows[0];
  },

  async deleteDepartment(id: number) {
    const query = `
        DELETE FROM departments
        WHERE id = $1
        RETURNING *;
    `;

    const result = await pool.query(query, [id]);
    return result.rows[0];
  },
};
