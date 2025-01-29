import React from "react";

const Settings = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <h1 className="text-3xl font-bold text-green-600 mb-6">Settings</h1>
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {/* Username Field */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-green-300"
            id="username"
            type="text"
            placeholder="Username"
          />
        </div>

        {/* Email Field */}
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-green-300"
            id="email"
            type="email"
            placeholder="Email"
          />
        </div>

        {/* Save Button */}
        <div className="flex items-center justify-between">
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
