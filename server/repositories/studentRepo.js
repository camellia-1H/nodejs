import { Student } from "../models/index.js";

const getAllStudents = async ({ page, size, searchString }) => {
  console.log("get all student  repo");
};

const insertStudent = async ({
  name,
  email,
  languages,
  gender,
  phoneNumber,
  password,
  address,
}) => {
  try {
    const student = await Student.create({
      name,
      email,
      languages,
      gender,
      phoneNumber,
      password,
      address,
    });
    return student;
  } catch (error) {
    if (!!error.errors) {
      throw new Error("loi validate khi insert student");
    }
  }
};

export default { getAllStudents, insertStudent };
