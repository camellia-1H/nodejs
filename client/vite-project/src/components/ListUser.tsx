import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

function ListUser() {
  const allUser = useSelector((state: RootState) => state.users.users.allUser);
  return (
    <div>
      {allUser.map((user, index) => (
        <h1 key={index}>{user.name}</h1>
      ))}
    </div>
  );
}

export default ListUser;
