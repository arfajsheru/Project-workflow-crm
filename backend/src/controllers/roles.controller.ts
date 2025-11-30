import { Request, Response } from "express";
import { successResponse, errorResponse } from "../utils/response";
import { RoleService } from "../services/roles.services";

export const RoleController = {
  // CREATE
  async create(req: Request, res: Response) {
    try {
      const { role_name } = req.body;

      if (!role_name) {
        return errorResponse(res, "role_name is required", 400);
      }

      const data = await RoleService.createRole({ role_name });
      return successResponse(res, "Role created successfully", data, 201);
    } catch (error: any) {
      return errorResponse(res, "Failed to create role", 500, error.message);
    }
  },

  // GET ALL
  async getAll(req: Request, res: Response) {
    try {
      const data = await RoleService.getAllRoles();
      return successResponse(res, "Roles fetched successfully", data);
    } catch (error: any) {
      return errorResponse(res, "Failed to fetch roles", 500, error.message);
    }
  },

  // UPDATE
  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const { role_name } = req.body;

      if (!id) return errorResponse(res, "Invalid role ID", 400);
      if (!role_name) return errorResponse(res, "role_name is required", 400);

      const updated = await RoleService.updateRole(id, { role_name });

      if (!updated) return errorResponse(res, "Role not found", 404);

      return successResponse(res, "Role updated successfully", updated);
    } catch (error: any) {
      return errorResponse(res, "Failed to update role", 500, error.message);
    }
  },

  // DELETE
  async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (!id) return errorResponse(res, "Invalid role ID", 400);

      const deleted = await RoleService.deleteRole(id);
      if (!deleted) return errorResponse(res, "Role not found", 404);

      return successResponse(res, "Role deleted successfully", deleted);
    } catch (error: any) {
      return errorResponse(res, "Failed to delete role", 500, error.message);
    }
  },
};
