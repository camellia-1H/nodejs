import { body, validationResult } from "express-validator";
import { userRepo } from "../repositories/index.js";
import { HttpStatusCode } from "../exceptions/HttpStatusCode.js";
import { EventEmitter } from "node:events";
import { stringify } from "node:querystring";

const myEvent = new EventEmitter();
myEvent.on("register", (params) => {
  console.log(`event log : ${JSON.stringify(params)}`);
});

const login = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res
      .status(HttpStatusCode.BAD_REQUEST)
      .json({ error: error.array() });
  }
  const { email, password } = req.body;

  // call repo
  try {
    await userRepo.login({ email, password });
    res.status(HttpStatusCode.OK).json({
      message: "Login user success",
      data: " detail user",
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.toString(),
    });
  }
};

const register = async (req, res) => {
  const { name, phoneNumber, email, password } = req.body;

  // event emitter
  myEvent.emit("register", req.body);
  // myEvent.emit("register", {email, password});
  try {
    let user = await userRepo.register({ name, phoneNumber, email, password });
    res.status(HttpStatusCode.INSERT_OK).json({
      message: "Register user success",
      data: user,
    });
  } catch (e) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: "khong the dang ki user",
    });
  }
};

const getDetailUser = async (req, res) => {
  res.send("GET users");
};

export default {
  login,
  register,
  getDetailUser,
};
