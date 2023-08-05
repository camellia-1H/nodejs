import { body, validationResult } from "express-validator";
import { userRepo } from "../repositories/index.js";
import { HttpStatusCode } from "../exceptions/HttpStatusCode.js";
import { EventEmitter } from "node:events";
import jwt from "jsonwebtoken";

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
  console.log(email);

  // call repo
  try {
    let existedUser = await userRepo.login({ email, password });
    console.log(existedUser);
    res.cookie("refreshToken", existedUser.refreshToken, {
      httpOnly: true,
      secure: false,
      path: "/",
      sameSite: "strict",
    });
    const { accessToken, refreshToken, ...others } = existedUser;
    res.status(HttpStatusCode.OK).json({
      ...others,
      accessToken,
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.toString(),
    });
  }
};

const requestRefreshToken = async (req, res) => {
  //lay refreshToken tu cookie
  const refreshToken = req.cookies.refreshToken;
  console.log("refreshToken ", refreshToken);
  if (!refreshToken) return res.status(401).json("chua dang nhap");
  else {
    return jwt.verify(
      refreshToken,
      process.env.JWT_SECRET_REFRESH_TOKEN,
      (err, user) => {
        if (err) {
          res.json(err);
        }
        /// tao token moi
        const newAccessToken = jwt.sign(
          {
            data: user,
          },
          process.env.JWT_SECRET,
          {
            // expiresIn: "6000000",
            expiresIn: "10 days",
          }
        );
        // co the tao luon refreshToken moi
        // hoac cho no dang nhap lai
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: false,
          path: "/",
          sameSite: "strict",
        });
        res.status(200).json(newAccessToken);
      }
    );
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

// const postBlog = async (req, res) => {
//   res.json("post blog");
// };

const getAllUser = async (req, res) => {
  try {
    let allUser = await userRepo.getAllUser();
    res.status(200).json({ data: allUser });
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: error,
    });
  }
};

const logOut = async (req, res) => {
  // xoa cookies khi user log out
  res.clearCookie("refreshToken");
  res.status(200).json("Log out successful");
};

const deleteUser = async (req, res) => {
  try {
    await userRepo.deleteUser(req.params.id);
    return res.status(HttpStatusCode.OK).json("delete user success");
  } catch (error) {
    return res.json("khong the xoa user, controller");
  }
};

export default {
  login,
  register,
  logOut,
  deleteUser,
  requestRefreshToken,
  getAllUser,
};
