import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import HomePage from "./HomePage";
import { registerUser } from "../api/request";
import { registerFailed, registerSuccess } from "../redux/authSlice";

function Register() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [isShow, setShow] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const register = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await registerUser(name, email, password, phoneNumber);
    if (result) {
      dispatch(registerSuccess());
      navigate("/login");
    } else {
      dispatch(registerFailed());
      setShow(true);
    }
  };
  const navLogin = () => {
    navigate("/login");
  };

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <HomePage />
      <div className="w-6/12 h-2/6 p-6 mt-9 rounded bg-slate-100 shadow-lg shadow-amber-600-500/50">
        <form
          action=""
          className="flex flex-col items-center"
          onSubmit={register}
        >
          <input
            type="text"
            value={name}
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            className="w-8/12 p-1 rounded-2xl my-3 shadow-lg shadow-amber-600-500/50 focus:outline-none"
          />
          <input
            type="text"
            value={email}
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-8/12 p-1 rounded-2xl my-3 shadow-lg shadow-amber-600-500/50 focus:outline-none"
          />
          <input
            type="password"
            value={password}
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-8/12 p-1 rounded-2xl my-3 shadow-lg shadow-amber-600-500/50 focus:outline-none"
          />
          <input
            type="text"
            value={phoneNumber}
            placeholder="Phone Number"
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-8/12 p-1 rounded-2xl my-3 shadow-lg shadow-amber-600-500/50 focus:outline-none"
          />
          {isShow ? (
            <p className="text-red-900">Tên tài khoản đã tồn tại</p>
          ) : (
            <p></p>
          )}
          <button className="p-2 px-5 mt-6 rounded bg-red-700 text-white hover:bg-red-800">
            Register
          </button>
          <div className="flex mt-3">
            <p>Bạn đã có tài khoản ?</p>
            <button
              onClick={navLogin}
              className="text-red-400 ml-2 hover:underline decoration-red-800"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
