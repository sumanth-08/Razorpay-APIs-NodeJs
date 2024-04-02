import express from "express";
import dotenv from "dotenv";
import router from "./routes.js";
import cors from "cors";
const app = express();
dotenv.config();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
router(app);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
