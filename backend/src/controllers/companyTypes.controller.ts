import { Request, Response } from "express";
import {
  CompanyTypeInput,
  CompanyTypeServices,
} from "../services/companyTypes.services";
import { successResponse, errorResponse } from "../utils/response";

export const CompanyTypeController = {
  async create(req: Request, res: Response) {
    try {
      const { type_name } = req.body;

      if (!type_name) {
        return errorResponse(res, "Type name is reuired", 400);
      }

      const data = await CompanyTypeServices.createType({ type_name });
      return successResponse(res, "Company type created successfully", data);
    } catch (error) {
      return errorResponse(
        res,
        "Failed to create company type",
        500,
        error.message
      );
    }
  },

  async getAll(req: Request, res: Response) {
    try {
      const data = await CompanyTypeServices.getAllTypes();
      return successResponse(res, "Company types fetchecd successfully", data);
    } catch (error) {
      return errorResponse(
        res,
        "Failed to fetch company types",
        500,
        error.message
      );
    }
  },

  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const { type_name } = req.body;

      if (!type_name) {
        return errorResponse(res, "Type name is required", 400);
      }

      const data = await CompanyTypeServices.updateType(id, { type_name });

      if (!data) {
        return errorResponse(res, "Company type not found", 404);
      }

      return successResponse(res, "Company type updated successfully", data);
    } catch (error) {
      return errorResponse(
        res,
        "Failed to update company type",
        500,
        error.message
      );
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      if (!id) {
        return errorResponse(res, "Invalid company type ID", 400);
      }

      const data = await CompanyTypeServices.deleteType(id);

      if (!data) {
        return errorResponse(res, "Company type not found", 404);
      }

      return successResponse(res, "Company type deleted successfully", data);
    } catch (error) {
      return errorResponse(
        res,
        "Failed to delete company type",
        500,
        error.message
      );
    }
  },
};
