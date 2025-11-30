import { Request, Response } from "express";
import { successResponse, errorResponse } from "../utils/response";
import { DesignationService } from "../services/designation.services";

export const DesignationController = {
  // CREATE
  async create(req: Request, res: Response) {
    try {
      const { designation_name } = req.body;

      if (!designation_name) {
        return errorResponse(res, "designation_name is required", 400);
      }

      const data = await DesignationService.createDesignation({
        designation_name,
      });

      return successResponse(
        res,
        "Designation created successfully",
        data,
        201
      );
    } catch (error: any) {
      return errorResponse(
        res,
        "Failed to create designation",
        500,
        error.message
      );
    }
  },

  // GET ALL
  async getAll(req: Request, res: Response) {
    try {
      const data = await DesignationService.getAllDesignations();
      return successResponse(res, "Designations fetched successfully", data);
    } catch (error: any) {
      return errorResponse(
        res,
        "Failed to fetch designations",
        500,
        error.message
      );
    }
  },

  // UPDATE
  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const { designation_name } = req.body;

      if (!id) return errorResponse(res, "Invalid designation ID", 400);
      if (!designation_name)
        return errorResponse(res, "designation_name is required", 400);

      const updated = await DesignationService.updateDesignation(id, {
        designation_name,
      });

      if (!updated) return errorResponse(res, "Designation not found", 404);

      return successResponse(res, "Designation updated successfully", updated);
    } catch (error: any) {
      return errorResponse(
        res,
        "Failed to update designation",
        500,
        error.message
      );
    }
  },

  // DELETE
  async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (!id) return errorResponse(res, "Invalid designation ID", 400);

      const deleted = await DesignationService.deleteDesignation(id);
      if (!deleted) return errorResponse(res, "Designation not found", 404);

      return successResponse(res, "Designation deleted successfully", deleted);
    } catch (error: any) {
      return errorResponse(
        res,
        "Failed to delete designation",
        500,
        error.message
      );
    }
  },
};
