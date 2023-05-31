import express from "express";
import * as dotenv from "dotenv";
import { usersRouter, studentsRouter } from "./routes/index.js";
import connect from "./database/database.js";
import checkToken from "./authentication/auth.js";

dotenv.config();
const app = express();

app.use(checkToken);
// app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
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
