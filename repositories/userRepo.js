const login = async ({ email, password }) => {
  console.log("login user repository");
};

const register = async ({ name, phoneNumber, email, password }) => {
  // validate đã ở controller
  console.log("register user repository");
};

export default {
  login,
  register,
};
