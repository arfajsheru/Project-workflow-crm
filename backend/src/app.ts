import express, { Application, Request, Response } from "express";
import cors from "cors";
import companyTypesRouter from "./routes/companyTypes.route";
import companyRoutes from "./routes/company.routes";
import UserRolesRoutes from "./routes/roles.route";
import DesignationRoutes from "./routes/designation.routes"
import DepartMentRoutes from "./routes/companyDepartment.route"
const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());

// Register Routes
app.use("/api/company-types", companyTypesRouter);
app.use("/api/company", companyRoutes);
app.use("/api/roles", UserRolesRoutes);
app.use("/api/designation", DesignationRoutes)
app.use("/api/department", DepartMentRoutes)

// Health check / root route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

export default app;
