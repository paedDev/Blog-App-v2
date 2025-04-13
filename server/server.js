import express from "express";
import cors from "cors";
import connectDb from "./db/index.js";
connectDb();
const app = express();
const PORT = 5000;
app.use(cors());

app.use(express.json());

app.listen(PORT, (req, res) => {
  console.log(`Listening to port ${PORT}`);
});
