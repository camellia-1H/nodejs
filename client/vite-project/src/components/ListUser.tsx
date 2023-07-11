import { User } from "../types/User";
type userType = {
  allUser: User[];
};

function ListUser({ allUser }: userType) {
  return (
    <div>
      {allUser.map((user, index) => (
        <h1 key={index}>{user.name}</h1>
      ))}
    </div>
  );
}

export default ListUser;
