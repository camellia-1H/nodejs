import { User } from "../models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const login = async ({ email, password }) => {
  let existedUser = await User.findOne({ email }).exec();
  if (existedUser) {
    const isMatch = await bcrypt.compare(password, existedUser.password);
    if (isMatch) {
      // create token
      const accessToken = jwt.sign(
        {
          data: existedUser,
        },
        process.env.JWT_SECRET,
        {
          // expiresIn: "6000000",
          expiresIn: "10 days",
        }
      );
      const refreshToken = jwt.sign(
        { data: existedUser },
        process.env.JWT_SECRET_REFRESH_TOKEN,
        {
          expiresIn: "100d",
        }
      );

      // clone và add thêm token để làm việc
      return {
        ...existedUser.toObject(),
        // password : 'not show'
        accessToken,
        refreshToken,
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

const getAllUser = async () => {
  try {
    const allUser = await User.find({}).exec();
    return allUser;
  } catch {
    throw new Error("khong co list user");
  }
};
// const postBlog = async ({ title, content, image, email }) => {
//   try {
//     const post = await User.
//   } catch (error) {

//   }
// };

export default {
  login,
  register,
  getAllUser,
};
