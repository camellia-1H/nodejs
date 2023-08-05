import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { useEffect } from "react";

import { getAllUser, logOut } from "../api/request";
import { logOutFailed, logOutSuccess } from "../redux/authSlice";
import ListUser from "../components/ListUser";
import { createAxiosJWT } from "../api/axiosInstance";

function HomePage() {
  const user = useSelector((state: RootState) => state.auth.login?.currentUser);
  const email = useSelector(
    (state: RootState) => state.auth.login?.currentUser.email
  );
  const allUser = useSelector((state: RootState) => state.users.users.allUser);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const axiosJWT = createAxiosJWT(user, dispatch);

  console.log(user);

  useEffect(() => {
    if (user?.accessToken) {
      getAllUser(user?.accessToken, axiosJWT, dispatch);
    }
  }, [user, allUser.length]);

  const handleLogOut = () => {
    try {
      logOut(user?.accessToken, email);
      dispatch(logOutSuccess());
      navigate("/login");
    } catch (error) {
      dispatch(logOutFailed());
    }
  };
  return (
    <div className="w-8/12">
      <div className="mt-6 w-full flex justify-between items-center ">
        <Link to={"/"} className="bg-red-500 p-2 rounded-xl text-white">
          Home Page
        </Link>

        {user?.accessToken ? (
          <div className="w-10 flex justify-end ">
            <img
              className="block w-full rounded-full"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd1JskIyepRMHPJtI3edrls-5Mi8D6Uow4mA&usqp=CAU"
              alt=""
            />
            <span>{user?.name}</span>

            <button
              onClick={handleLogOut}
              className="bg-slate-600 rounded-xl p-2 text-white"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="justify-end">
            <Link
              to={"/login"}
              className="bg-slate-600 rounded-xl p-2 text-white"
            >
              Login
            </Link>
            <Link
              to={"/register"}
              className="bg-slate-600 rounded-xl p-2 ml-2 text-white"
            >
              Register
            </Link>
          </div>
        )}
      </div>

      {user?.accessToken && <ListUser allUser={allUser} />}
    </div>
  );
}

export default HomePage;
