import "dotenv/config"; 
import express from "express";
import cors from "cors";
import analyticsRoutes from './routes/analyticsRoutes.js'

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/analytics", analyticsRoutes)

app.get("/", (req, res) => {
  res.send("DevInsight API running 🚀");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});