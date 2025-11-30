import { Router } from "express";
import { DepartmentController } from "../controllers/department.controller";

const router = Router();

router.post("/create", DepartmentController.createDeaprtment);
router.get("/all/:company_id", DepartmentController.getCompanyDepartments);
router.put("/update/:id", DepartmentController.updateDepartment);
router.delete("/delete/:id", DepartmentController.deleteDepartment);

export default router;
