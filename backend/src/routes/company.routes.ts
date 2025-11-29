import { Router } from "express";
import { CompanyController } from "../controllers/company.controller";

const router = Router();

router.post("/create", CompanyController.create);
router.get("/all", CompanyController.getAll);
router.get("/details/:id", CompanyController.getOne);
router.put("/update/:id", CompanyController.update);
router.delete("/delete/:id", CompanyController.delete);


export default router;
