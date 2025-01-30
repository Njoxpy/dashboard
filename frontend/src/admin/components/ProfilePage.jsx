import React, { useState } from "react";
import Njox from "../../assets/njox.jpg";
import { Camera, Save, Edit } from "lucide-react";

const ProfilePage = () => {
  // Sample user data with profile picture URL from Pexels
  const userData = {
    name: "Godbless Nyagawa",
    email: "nyagawa@gmail.com",
    role: "Admin",
    bio: "Experienced admin with a passion for technology.",
    profilePicture: Njox, // Pexels image URL
  };

  const [user, setUser] = useState(userData);
  const [isEditing, setIsEditing] = useState(false);
  const [newProfilePic, setNewProfilePic] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Logic to save the updated data (e.g., send it to an API)
    console.log("Profile updated", user);
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewProfilePic(URL.createObjectURL(file));
    }
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-green-700 mb-6">Profile</h2>

      <div className="flex justify-center mb-8">
        <div className="relative">
          <img
            src={newProfilePic || user.profilePicture}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-green-500 shadow-lg"
          />
          {isEditing && (
            <label className="absolute bottom-0 right-0 bg-green-500 text-white p-2 rounded-full cursor-pointer shadow-md hover:bg-green-600 transition-colors">
              <Camera size={20} />
              <input
                type="file"
                accept="image/*"
                onChange={handleProfilePicChange}
                className="hidden"
              />
            </label>
          )}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700">
          Name
        </label>
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={handleChange}
          className="w-full mt-2 p-2 border rounded-lg bg-green-50 text-green-900 focus:outline-none focus:ring-2 focus:ring-green-500"
          disabled={!isEditing}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          className="w-full mt-2 p-2 border rounded-lg bg-green-50 text-green-900 focus:outline-none focus:ring-2 focus:ring-green-500"
          disabled={!isEditing}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700">
          Role
        </label>
        <input
          type="text"
          name="role"
          value={user.role}
          onChange={handleChange}
          className="w-full mt-2 p-2 border rounded-lg bg-green-50 text-green-900 focus:outline-none focus:ring-2 focus:ring-green-500"
          disabled={!isEditing}
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700">Bio</label>
        <textarea
          name="bio"
          value={user.bio}
          onChange={handleChange}
          className="w-full mt-2 p-2 border rounded-lg bg-green-50 text-green-900 focus:outline-none focus:ring-2 focus:ring-green-500"
          disabled={!isEditing}
        />
      </div>

      <div className="flex justify-end gap-4">
        {isEditing ? (
          <button
            onClick={handleSave}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2 transition-colors"
          >
            <Save size={16} /> Save Changes
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2 transition-colors"
          >
            <Edit size={16} /> Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
