import React from "react";

const RevenueDashboard = () => {
  // Hardcoded data
  const revenueData = {
    totalRevenue: 125000,
    monthlyRevenue: 25000,
    yearlyRevenue: 300000,
    totalGrowth: 5.2,
    monthlyGrowth: 2.8,
    yearlyGrowth: 10.5,
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Revenue Overview
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Revenue Card */}
        <div className="bg-[#f0fdf4] p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-[#166534]">
            Total Revenue
          </h3>
          <p className="text-2xl font-bold text-[#22c55e]">
            ${revenueData.totalRevenue.toLocaleString()}
          </p>
          <p className="text-sm text-[#16a34a]">
            +{revenueData.totalGrowth}% from last month
          </p>
        </div>

        {/* Monthly Revenue Card */}
        <div className="bg-[#f0fdf4] p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-[#166534]">
            Monthly Revenue
          </h3>
          <p className="text-2xl font-bold text-[#22c55e]">
            ${revenueData.monthlyRevenue.toLocaleString()}
          </p>
          <p className="text-sm text-[#16a34a]">
            +{revenueData.monthlyGrowth}% from last month
          </p>
        </div>

        {/* Yearly Revenue Card */}
        <div className="bg-[#f0fdf4] p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-[#166534]">
            Yearly Revenue
          </h3>
          <p className="text-2xl font-bold text-[#22c55e]">
            ${revenueData.yearlyRevenue.toLocaleString()}
          </p>
          <p className="text-sm text-[#16a34a]">
            +{revenueData.yearlyGrowth}% from last year
          </p>
        </div>
      </div>

      {/* Revenue Chart Placeholder */}
      <div className="mt-8">
        <div className="bg-[#f0fdf4] p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-[#166534]">
            Revenue Chart
          </h3>
          <div className="mt-4 h-64 bg-[#dcfce7] rounded-lg flex items-center justify-center">
            <span className="text-[#16a34a]">Chart Placeholder</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueDashboard;
