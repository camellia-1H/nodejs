import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { usersRouter, studentsRouter } from "./routes/index.js";
import connect from "./database/database.js";
import checkToken from "./authentication/auth.js";

dotenv.config();
const app = express();
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(cookieParser());
// làm lấy ra được dữ liệu thì json()
app.use(express.json());

app.use(checkToken);
// encode để check postman thì được
app.use(
  express.urlencoded({
    extended: false,
  })
);
const port = process.env.PORT ?? 8080;

// routers

// nếu có middleware thì dùng use
app.use("/users", usersRouter);
app.use("/students", studentsRouter);

app.get("/", (req, res) => {
  res.send("response from root router");
});

app.listen(port, async () => {
  await connect();
  console.log(`listening on port: ${port}`);
});
