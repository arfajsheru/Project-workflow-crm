import { Router } from "express";
import { DesignationController } from "../controllers/designation.controller";

const router = Router();

router.post("/create", DesignationController.create);
router.get("/all", DesignationController.getAll);
router.put("/update/:id", DesignationController.update);
router.delete("/delete/:id", DesignationController.delete);

export default router;
