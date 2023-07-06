import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import HomePage from "./HomePage";
import { loginUser } from "../api/request";
import { loginFailed, loginSuccess } from "../redux/authSlice";

function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isShow, setShow] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await loginUser(email, password);
      dispatch(loginSuccess(data));
      setShow(false);
      navigate("/");
    } catch (error) {
      dispatch(loginFailed());
      setShow(true);
    }
  };
  const navRegister = () => {
    navigate("/register");
  };

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <HomePage />
      <div className="w-6/12 h-2/6 p-6 mt-9 rounded bg-slate-100 shadow-lg shadow-amber-600-500/50">
        <form action="" className="flex flex-col items-center" onSubmit={login}>
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
          {isShow ? (
            <p className="text-red-900">Sai tên tài khoản hoặc mật khẩu</p>
          ) : (
            <p></p>
          )}
          <button className="p-2 px-5 mt-6 rounded bg-red-700 text-white hover:bg-red-800">
            Login
          </button>
          <div className="flex mt-3">
            <p>Bạn chưa có tài khoản ?</p>
            <button
              onClick={navRegister}
              className="text-red-400 ml-2 hover:underline decoration-red-800"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
