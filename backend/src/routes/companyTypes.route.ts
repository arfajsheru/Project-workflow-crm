import { Router } from "express";
import { CompanyTypeController } from "../controllers/companyTypes.controller";

const companyTypesRouter = Router();

companyTypesRouter.post("/create", CompanyTypeController.create);
companyTypesRouter.get("/all", CompanyTypeController.getAll);
companyTypesRouter.put("/update/:id", CompanyTypeController.update);
companyTypesRouter.delete("/delete/:id", CompanyTypeController.delete);

export default companyTypesRouter;
