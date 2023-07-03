import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useEffect } from "react";
import { getAllUser } from "../api/request";

function HomePage() {
  // const location = useLocation();
  // const user = location?.state?.user;
  const user = useSelector((state: RootState) => state.auth.login.currentUser);
  const userList = useSelector(
    (state: RootState) => state.users.users?.allUser
  );

  console.log(user);
  const navigate = useNavigate();

  useEffect(() => {
    // getAllUser(user.accessToken);
  }, []);

  return (
    <div className="w-8/12">
      <div className="mt-6 w-full flex justify-between ">
        <Link to={"/"} className="bg-red-500 p-2 rounded-xl text-white">
          Home Page
        </Link>
        <div className="flex justify-between items-center">
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
          {/* {user && <div>Hello {user}</div>} */}
        </div>
      </div>
      {/* <div>
        {userList.map((user, index) => {
          <div key={index}>{user?.name}</div>;
        })}
      </div> */}
    </div>
  );
}

export default HomePage;
