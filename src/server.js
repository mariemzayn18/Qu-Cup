import express from "express";
import bodyParser from "body-parser";
import bcrypt from "bcryptjs"
import userRouter from "./routes/User.js";
import managerRouter from "./routes/manager.js";
import adminRouter from "./routes/admin.js";
import fanRouter from "./routes/fan.js";
import cors from "cors";

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
  })
); // Use this after the variable declaration

const PORT = 8080;
app.listen(PORT, async () => {
  var b = await bcrypt.hash("n12345", 12)
  console.log(b)
  console.log("server started at port 8080");
});
app.use("", userRouter);
app.use("/manager", managerRouter);
app.use("/fan", fanRouter);
app.use("/admin", adminRouter);
