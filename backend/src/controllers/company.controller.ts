import { Request, Response } from "express";
import { errorResponse, successResponse } from "../utils/response";
import { CompanyService } from "../services/company.services";

export const CompanyController = {
  // CREATE
  async create(req: Request, res: Response) {
    try {
      const { company_name, company_type_id, industry, email, phone, address } =
        req.body;

      if (
        !company_name ||
        !company_type_id ||
        !industry ||
        !email ||
        !phone ||
        !address
      ) {
        return errorResponse(res, "All fields are required", 400);
      }

      const data = await CompanyService.createCompany({
        company_name,
        company_type_id,
        industry,
        email,
        phone,
        address,
      });

      return successResponse(res, "Company created successfully", data, 201);
    } catch (error: any) {
      return errorResponse(
        res,
        "Failed to create company",
        500,
        error.message
      );
    }
  },

  // GET ALL
  async getAll(req: Request, res: Response) {
    try {
      const data = await CompanyService.getAllCompany();
      return successResponse(res, "Companies fetched successfully", data, 200);
    } catch (error: any) {
      return errorResponse(res, "Failed to fetch companies", 500, error.message);
    }
  },

  // GET ONE
  async getOne(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (!id) {
        return errorResponse(res, "Invalid Company ID", 400);
      }

      const data = await CompanyService.getCompanyById(id);
      if (!data) {
        return errorResponse(res, "Company not found", 404);
      }

      return successResponse(res, "Company fetched successfully", data);
    } catch (error: any) {
      return errorResponse(
        res,
        "Failed to fetch company",
        500,
        error.message
      );
    }
  },

  // UPDATE
  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const { company_name, company_type_id, industry, email, address, phone } =
        req.body;

      if (!id) {
        return errorResponse(res, "Invalid Company ID", 400);
      }

      if (
        !company_name ||
        !company_type_id ||
        !industry ||
        !email ||
        !phone ||
        !address
      ) {
        return errorResponse(res, "All fields are required", 400);
      }

      const updated = await CompanyService.updateCompany(id, {
        company_name,
        company_type_id,
        industry,
        email,
        phone,
        address,
      });

      if (!updated) return errorResponse(res, "Company not found", 404);

      return successResponse(res, "Company updated successfully", updated);
    } catch (error: any) {
      return errorResponse(
        res,
        "Failed to update company",
        500,
        error.message
      );
    }
  },

  // DELETE
  async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (!id) return errorResponse(res, "Invalid company ID", 400);

      const deleted = await CompanyService.deleteCompany(id);

      if (!deleted) return errorResponse(res, "Company not found", 404);

      return successResponse(res, "Company deleted successfully", deleted);
    } catch (error: any) {
      return errorResponse(
        res,
        "Failed to delete company",
        500,
        error.message
      );
    }
  },
};
