import { Router } from "express";
import { RoleController } from "../controllers/roles.controller.js";

const router = Router();

router.post("/create", RoleController.create);
router.get("/all", RoleController.getAll);
router.put("/update/:id", RoleController.update);
router.delete("/delete/:id", RoleController.delete);

export default router;
