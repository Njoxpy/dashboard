// src/components/NotFound.jsx
import { AlertTriangle, Home } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
        {/* Warning Icon */}
        <div className="flex justify-center mb-6">
          <AlertTriangle className="text-green-600" size={64} />
        </div>

        {/* 404 Message */}
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          404 - Page Not Found
        </h1>
        <p className="text-gray-600 mb-6">
          Oops! It seems like you've wandered off the path. The page you're
          looking for doesn't exist or has been moved.
        </p>

        {/* Back to Home Button */}
        <Link
          to="/admin"
          className="inline-flex items-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-200"
        >
          <Home className="mr-2" size={20} />
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
