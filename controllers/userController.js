import { body, validationResult } from "express-validator";
import { userRepo } from "../repositories/index.js";
import { EventEmitter } from "node:events";

const myEvent = new EventEmitter();
myEvent.on("register", (params) => {
  console.log(`event log : ${JSON.stringify(params)}`);
});

const login = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }
  const { email, password } = req.body;
  // call repo
  await userRepo.login({ email, password });
  res.status(200).json({
    message: "Login user success",
    data: " detail user",
  });
};

const register = async (req, res) => {
  const { name, phoneNumber, email, password } = req.body;
  await userRepo.register({ name, phoneNumber, email, password });

  // event emitter
  myEvent.emit("register", req.body);
  // myEvent.emit("register", {email, password});

  res.status(201).json({
    message: "Register user success",
  });
};

const getDetailUser = async (req, res) => {
  res.send("GET users");
};

export default {
  login,
  register,
  getDetailUser,
};
