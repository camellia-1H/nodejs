import { HttpStatusCode } from "../exceptions/HttpStatusCode.js";
import jwt from "jsonwebtoken";

export default function checkToken(req, res, next) {
  // req bypass login, register
  if (
    req.url.toLowerCase().trim() == "/users/login".toLowerCase().trim() ||
    req.url.toLowerCase().trim() == "/users/register".toLowerCase().trim()
  ) {
    next();
    return;
  }

  // req khac
  // phải kiểm tra token
  const token = req.headers?.token?.split(" ")[1];
  console.log(token);
  //check token còn hạn khong
  try {
    const jwtObj = jwt.verify(token, process.env.JWT_SECRET);
    const isExpired = Date.now() >= jwtObj.exp * 1000;
    console.log(jwtObj);
    if (isExpired) {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        message: "Token het han roi",
      });
      res.end();
    } else {
      next();
    }
  } catch (e) {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      message: e.message + "  looxi",
    });
  }
}
