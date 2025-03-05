import { Shield } from "lucide-react";

const DashboardLoading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-50 z-50">
      <div className="text-center">
        {/* Logo */}
        <div className="flex items-center justify-center mb-6">
          <Shield size={48} className="text-green-600 animate-pulse" />
        </div>

        {/* Spinner */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 border-4 border-t-4 border-gray-200 border-t-green-600 rounded-full animate-spin"></div>
        </div>

        {/* Loading Text */}
        <p className="text-gray-600 text-lg font-medium">
          Dashboard Loading...
        </p>

        {/* Skeleton Loading Effect */}
        <div className="mt-8 max-w-md mx-auto space-y-4">
          <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-4/6"></div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLoading;
