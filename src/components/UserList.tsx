import { UserListProps } from "../utils/types";

  const UserList: React.FC<UserListProps> = ({ users, radius }) => (
    
    <>
      {users.length === 0 ? (
        <div className="py-6 px-4">
          <h3 className="text-center">No users nearby</h3>
        </div>
      ) : (
        <div className="py-6">
          <h3 className="underline mb-4 text-xl font-semibold text-center px-4">
            Users within the range of {radius / 1000} km ({users.length} users)
          </h3>
          <ul className="flex gap-4 justify-center flex-wrap">
            {users.map((user, index) => (
              <li
                key={user.id}
                className="border-2 w-full xl:w-auto text-center border-gray-300 p-2 rounded-md bg-white shadow-sm hover:bg-gray-100 transition duration-200"
              >
                <span className="font-semibold">
                  {index + 1}. {user.name}
                </span>
                <p className="text-sm text-gray-600">
                  Coordinates: {user.lat}, {user.lon}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
  
  export default UserList;
  