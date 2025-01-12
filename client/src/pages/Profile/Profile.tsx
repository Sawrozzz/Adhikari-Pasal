
import { useEffect } from "react";
import useAuthStore from "../../store/authStore";


const Profile = () => {
 const { user, userProfile } = useAuthStore();

 useEffect(()=>{
 userProfile();
 },[userProfile])

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Your Profile</h2>
      <div className="flex flex-col items-center">
        <img
          src="https://imgs.search.brave.com/NFQhQXcC4U0ieD6JYNE3pwmlcIR9C_JRBXVKjBU54qg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzkzLzU0/L2NmLzkzNTRjZjI4/MmYxMDNhOTBmZWIx/MGNhMzc1Mjg5ZWNh/LmpwZw"
          alt="Profile"
          className="w-52 h-36 rounded mb-4"
        />
        <div className="text-center">
          <p className="text-lg font-semibold">{user.fullName}</p>
          <p className="text-gray-600">{user.email}</p>
          <p className="text-gray-600">{user.address}</p>
          <p className="text-gray-600">{user.phone}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
