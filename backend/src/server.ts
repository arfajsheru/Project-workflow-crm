import "dotenv/config";
import app from "./app";

const PORT: number = Number(process.env.PORT) || 1000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
