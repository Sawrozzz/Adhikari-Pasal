import { useEffect } from "react";
import useAuthStore from "../../store/authStore";

const AllUsers = () => {
  const { allUsers, fetchUsers, delete: deleteUser } = useAuthStore();

  const defaultImage =
    "https://imgs.search.brave.com/NFQhQXcC4U0ieD6JYNE3pwmlcIR9C_JRBXVKjBU54qg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzkzLzU0/L2NmLzkzNTRjZjI4/MmYxMDNhOTBmZWIx/MGNhMzc1Mjg5ZWNh/LmpwZw";

  const handleDeleteUser = async (email) => {
    await deleteUser(email);
  };

  useEffect(() => {
    fetchUsers(); // Fetch users when the component mounts
  }, [allUsers]);

  return (
    <div className="container mx-auto px-4 py-5">
      <h1 className="text-4xl font-bold text-center mb-12 text-indigo-600">
        All Users
      </h1>
      <div className="overflow-x-auto rounded-lg bg-white p-6">
        {!allUsers || allUsers.length === 0 ? (
          <p className="text-center py-4 text-gray-600">
            No users found or loading...
          </p>
        ) : (
          <>
            {allUsers.map((user, index) => (
              
              <div
                key={index}
                className="flex w-auto items-center cursor-pointer space-x-8 mb-6  p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition duration-200"
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 cursor-pointer  fill-slate-400 hover:fill-red-600 inline-block"
                  viewBox="0 0 24 24"
                  onClick={() => handleDeleteUser(user.email)}
                >
                  <path
                    d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
                    data-original="#000000"
                  ></path>
                  <path
                    d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
                    data-original="#000000"
                  ></path>
                </svg>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default AllUsers;
