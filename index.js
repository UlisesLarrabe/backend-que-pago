import express from "express";
import cors from "cors";
import "./database.js";
import userRouter from "./src/routes/userRouter.js";
import subsRouter from "./src/routes/subsRouter.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin:
      process.env.ENV !== "dev" ? process.env.URL_WEB : process.env.ENV_SOURCE,
    credentials: true,
  })
);
app.use(cookieParser(process.env.SECRET_SENTENCE));

app.use("/api/user", userRouter);
app.use("/api/subs", subsRouter);
app.use("*", (req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
