import { User } from "../models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const login = async ({ email, password }) => {
  let existedUser = await User.findOne({ email }).exec();
  if (existedUser) {
    const isMatch = await bcrypt.compare(password, existedUser.password);
    if (isMatch) {
      // create token
      let token = jwt.sign(
        {
          data: existedUser,
        },
        process.env.JWT_SECRET,
        {
          // expiresIn: "6000000",
          expiresIn: "10 days",
        }
      );

      // clone và add thêm token để làm việc
      return {
        ...existedUser.toObject(),
        // password : 'not show'
        token,
      };
    } else {
      throw new Error("sai email hoac password");
    }
  } else {
    throw new Error("sai email hoac password");
  }
};

const register = async ({ name, phoneNumber, email, password }) => {
  // validate đã ở controller
  try {
    let existedUser = await User.findOne({ email }).exec();
    if (!!existedUser) {
      throw new Error("user da duoc dang ki");
    }

    // ma hoa mat khau
    const hasPassword = await bcrypt.hash(
      password,
      parseInt(process.env.SALT_ROUNDS)
    );

    //INSERT DB
    const newUser = await User.create({
      name,
      email,
      password: hasPassword,
      phoneNumber,
    });
    console.log(newUser);
    return newUser;
  } catch (e) {
    // check model validation
    throw new Error("Khong the dang ki user");
  }
};

export default {
  login,
  register,
};
