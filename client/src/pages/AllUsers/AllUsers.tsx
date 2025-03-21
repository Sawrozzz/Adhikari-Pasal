import { useEffect } from "react";
import useAuthStore from "../../store/authStore";

const AllUsers = () => {
  const { allUsers, fetchUsers } = useAuthStore();

  const defaultImage = "https://imgs.search.brave.com/NFQhQXcC4U0ieD6JYNE3pwmlcIR9C_JRBXVKjBU54qg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzkzLzU0/L2NmLzkzNTRjZjI4/MmYxMDNhOTBmZWIx/MGNhMzc1Mjg5ZWNh/LmpwZw";

  useEffect(() => {
    fetchUsers(); // Fetch users when the component mounts
  }, [fetchUsers]);

  return (
    <div className="container mx-auto px-4 py-5">
      <h1 className="text-4xl font-bold text-center mb-12 text-indigo-600">
        All Users
      </h1>
      <div className="overflow-x-auto  rounded-lg bg-white p-6">
        {!allUsers || allUsers.length === 0 ? (
          <p className="text-center py-4 text-gray-600">
            No users found or loading...
          </p>
        ) : (
          <>
            {allUsers.map((user, index) => (
              <div
                key={index}
                className="flex w-auto items-center cursor-pointer space-x-8 mb-6 p-4 bg-gray-50 rounded-lg  hover:bg-gray-100 transition duration-200"
              >
                <img
                  src={user.picture || defaultImage}
                  alt={user.name}
                  className="w-16 h-16 rounded-full border-2 cursor-pointer"
                />
                <div>
                  <p className="text-gray-900 font-semibold text-lg">
                    {user.fullName}
                  </p>
                  <p className="text-gray-500 text-sm">{user.email}</p>
                  <p className="text-gray-500 text-sm">{user.phone}</p>
                  <p className="text-gray-500 text-sm">{user.address}</p>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default AllUsers;
