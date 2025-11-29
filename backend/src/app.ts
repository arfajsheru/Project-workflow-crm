import express, { Application, Request, Response } from "express";
import cors from "cors";
import companyTypesRouter from "./routes/companyTypes.route";
import companyRoutes from "./routes/company.routes";
const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());

// Register Routes
app.use("/api/company-types", companyTypesRouter);
app.use("/api/company", companyRoutes);

// Health check / root route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

export default app;
