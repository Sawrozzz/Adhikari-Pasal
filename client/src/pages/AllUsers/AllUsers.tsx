import { useEffect } from "react";
import useAuthStore from "../../store/authStore";

const AllUsers = () => {
  const { allUsers, fetchUsers } = useAuthStore();

  useEffect(() => {
    fetchUsers(); // Fetch users when the component mounts
    console.log("api here");
    
  }, [fetchUsers]);

  return (
    <div className="overflow-x-auto px-40">
      {!allUsers || allUsers.length === 0 ? (
        <p className="text-center py-4">No users found or loading...</p>
      ) : (
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border border-gray-300">Full Name</th>
              <th className="px-4 py-2 border border-gray-300">Email</th>
              <th className="px-4 py-2 border border-gray-300">Address</th>
              <th className="px-4 py-2 border border-gray-300">Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map((user, index) => (
              <tr key={index} className="odd:bg-white even:bg-gray-50">
                <td className="px-4 py-2 border border-gray-300 uppercase">
                  {index + 1}. {user.fullName}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {user.email}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {user.address}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {user.phone}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AllUsers;
