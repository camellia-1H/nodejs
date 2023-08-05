import { useSelector, useDispatch } from "react-redux";
import { User } from "../types/User";
import { RootState } from "../redux/store";

import { createAxiosJWT } from "../api/axiosInstance";
import { deleteUser } from "../api/request";

type userType = {
  allUser: User[];
};

function ListUser({ allUser }: userType) {
  const user = useSelector((state: RootState) => state.auth.login?.currentUser);
  const dispatch = useDispatch();
  const axiosJWT = createAxiosJWT(user, dispatch);
  console.log(allUser);

  const handleDel = (id: string) => {
    deleteUser(user?.accessToken, id, axiosJWT, dispatch);
  };
  return (
    <div>
      {allUser?.map((user, index) => (
        <div className="flex" key={index}>
          <h1 className="mr-5">{user.name}</h1>
          <button onClick={() => handleDel(user._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default ListUser;
