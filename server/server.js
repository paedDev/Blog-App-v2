import express from "express";
import cors from "cors";
import connectDb from "./db/index.js";
connectDb();
import blogRouter from "./route/blog-route.js";
const app = express();
const PORT = 5000;
app.use(cors());

app.use(express.json());
app.use("/api/blogs", blogRouter);

app.use("/api", (req, res) => {
  res.send("Testing purposes");
});
app.listen(PORT, (req, res) => {
  console.log(`Listening to port ${PORT}`);
});
