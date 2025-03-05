// UserDetailsPage.jsx
import React from "react";
import { useParams } from "react-router-dom";
import { LucideUser } from "lucide-react";

const UserDetailsPage = () => {
  const { id } = useParams(); // Get user ID from the URL

  // Sample data (you would fetch this data from an API in a real app)
  const user = {
    id,
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Admin",
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center space-x-4">
        <LucideUser size={40} className="text-green-500" />
        <h1 className="text-3xl font-semibold text-green-600">{user.name}</h1>
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-medium text-gray-700">User Details</h2>
        <ul className="mt-4 space-y-2">
          <li className="text-lg">
            Email: <span className="font-semibold">{user.email}</span>
          </li>
          <li className="text-lg">
            Role: <span className="font-semibold">{user.role}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserDetailsPage;
