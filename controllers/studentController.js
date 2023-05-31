import { body, validationResult } from "express-validator";
import { studentRepo } from "../repositories/index.js";
import { HttpStatusCode } from "../exceptions/HttpStatusCode.js";

// const myEvent = new EventEmitter();
// myEvent.on("register", (params) => {
//   console.log(`event log : ${JSON.stringify(params)}`);
// });

// const login = async (req, res) => {
//   const error = validationResult(req);
//   if (!error.isEmpty()) {
//     return res
//       .status(HttpStatusCode.BAD_REQUEST)
//       .json({ error: error.array() });
//   }
//   const { email, password } = req.body;

//   // call repo
//   try {
//     let existedUser = await userRepo.login({ email, password });
//     res.status(HttpStatusCode.OK).json({
//       message: "Login user success",
//       data: existedUser,
//     });
//   } catch (exception) {
//     res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
//       message: exception.toString(),
//     });
//   }
// };

// const register = async (req, res) => {
//   const { name, phoneNumber, email, password } = req.body;

//   // event emitter
//   myEvent.emit("register", req.body);
//   // myEvent.emit("register", {email, password});
//   try {
//     let user = await userRepo.register({ name, phoneNumber, email, password });
//     res.status(HttpStatusCode.INSERT_OK).json({
//       message: "Register user success",
//       data: user,
//     });
//   } catch (e) {
//     res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
//       message: "khong the dang ki user",
//     });
//   }
// };

const insertStudent = async (req, res) => {
  try {
    const student = await studentRepo.insertStudent(req.body);
    console.log(student);
    res.status(HttpStatusCode.INSERT_OK).json({
      message: "Oke insert",
      data: student,
    });
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: "Cannot insert student: " + error,
    });
  }
};

export default {
  insertStudent,
};
