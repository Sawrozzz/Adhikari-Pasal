import { useEffect, useState } from "react";
import { FaTimes, FaUpload } from "react-icons/fa";
import useAuthStore from "../../store/authStore";

const Profile = () => {
  const {
    user,
    profileData,
    fetchUserProfile,
    uploadProfilePicture,
    loading,
    error,
  } = useAuthStore();
  const [profileImage, setProfileImage] = useState(
    user.profileImage ||
      "https://imgs.search.brave.com/NFQhQXcC4U0ieD6JYNE3pwmlcIR9C_JRBXVKjBU54qg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzkzLzU0/L2NmLzkzNTRjZjI4/MmYxMDNhOTBmZWIx/MGNhMzc1Mjg5ZWNh/LmpwZw"
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [localProfileData, setLocalProfileData] = useState(profileData);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    fetchUserProfile().catch(console.error);
  }, [fetchUserProfile]);

  useEffect(() => {
    setLocalProfileData(profileData);
  }, [profileData]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      setSelectedFile(file);
    }
  };

  const handleImageUpload = async () => {
    if (selectedFile) {
      setIsUploading(true);
      try {
        const updatedProfileData = await uploadProfilePicture(selectedFile);
        setLocalProfileData((prevData) => ({
          ...prevData,
          picture: updatedProfileData.picture,
        }));
        setPreviewImage(null); // Clear the preview after upload
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleRemovePreview = () => {
    setPreviewImage(null);
    setSelectedFile(null);
  };

 

  if (error) {
    return <div>Error loading profile: {error.message}</div>;
  }

  if (!localProfileData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Your Profile
      </h2>
      <div className="flex flex-col items-center">
        <img
          src={localProfileData.picture || profileImage}
          alt="Profile"
          className="w-52 h-52 rounded-full mb-4 object-cover shadow-md"
        />
        <input
          type="file"
          accept="image/*"
          className="mb-4"
          onChange={handleFileChange}
        />
        {previewImage && (
          <div className="relative mb-4">
            <img
              src={previewImage}
              alt="Preview"
              className="w-52 h-52 rounded-full object-cover shadow-md"
            />
            <button
              onClick={handleRemovePreview}
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center"
            >
              <FaTimes />
            </button>
          </div>
        )}
        <button
          className="flex items-center justify-center bg-indigo-500 text-white rounded-full px-4 py-2 mb-4 shadow-md hover:bg-indigo-600 transition duration-300"
          onClick={handleImageUpload}
          disabled={isUploading}
        >
          {isUploading ? (
            "Uploading..."
          ) : (
            <>
              <FaUpload className="mr-2" />
              Upload
            </>
          )}
        </button>
        <div className="text-center">
          <p className="text-xl font-semibold text-gray-800">
            {localProfileData.fullName}
          </p>
          <p className="text-gray-600">{localProfileData.email}</p>
          <p className="text-gray-600">{localProfileData.address}</p>
          <p className="text-gray-600">{localProfileData.phone}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
