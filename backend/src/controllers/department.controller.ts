import { errorResponse, successResponse } from "../utils/response";
import { DepartmentService } from "../services/companyDepartment.service";
import { Request, Response } from "express";

export const DepartmentController = {
  async createDeaprtment(req: Request, res: Response) {
    try {
      const { company_id, department_name, created_by } = req.body;

      if (!company_id || !department_name || !created_by) {
        return errorResponse(res, "All fields are requried", 400);
      }

      const data = await DepartmentService.createDepartment({
        company_id,
        department_name,
        created_by,
      });

      return successResponse(
        res,
        "Department created successfully.",
        data,
        201
      );
    } catch (error) {
      return errorResponse(
        res,
        "Failde to create deaprtmente",
        500,
        error.message
      );
    }
  },

  async getCompanyDepartments(req: Request, res: Response) {
    try {
      const company_id = Number(req.params.company_id);
      if (!company_id) {
        return errorResponse(res, "Invalid Company id", 400);
      }

      const data = await DepartmentService.getDepartment(company_id);
      return successResponse(
        res,
        "Company Departments fetch successfull.",
        data,
        200
      );
    } catch (error) {
      return errorResponse(
        res,
        "Failde to fetch companies departments",
        500,
        error.message
      );
    }
  },

  async updateDepartment(req: Request, res: Response) {
    try {
      const department_id = Number(req.params.id);
      const { department_name } = req.body;

      if (!department_id)
        return errorResponse(res, "Invalid department id", 400);
      if (!department_name) {
        return errorResponse(res, "Department name is required", 400);
      }

      const updated = await DepartmentService.updateDepartment(
        department_id,
        department_name
      );
      return successResponse(
        res,
        "Department name update successfully.",
        updated,
        200
      );
    } catch (error) {
      return errorResponse(
        res,
        "Failde to update deapartment name",
        500,
        error
      );
    }
  },

  async deleteDepartment(req: Request, res: Response) {
    try {
      const department_id = Number(req.params.id);

      if (!department_id)
        return errorResponse(res, "Invalid department id", 400);

      const deleted =  await DepartmentService.deleteDepartment(department_id);
      return successResponse(
        res,
        "Delete department successsfully.",
        deleted,
        200
      );
    } catch (error) {
      return errorResponse(res, "Falied to delete department", 500, error);
    }
  },
};
