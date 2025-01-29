import React from "react";
import {
  Users,
  DollarSign,
  ShoppingCart,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
} from "lucide-react";

const DashboardOverview = () => {
  const stats = [
    {
      title: "Total Users",
      value: "2,543",
      icon: <Users className="h-6 w-6" />,
      change: "+12.5%",
      isPositive: true,
      bgColor: "bg-blue-500",
    },
    {
      title: "Revenue",
      value: "$45,233",
      icon: <DollarSign className="h-6 w-6" />,
      change: "+8.2%",
      isPositive: true,
      bgColor: "bg-green-500",
    },
    {
      title: "Orders",
      value: "1,345",
      icon: <ShoppingCart className="h-6 w-6" />,
      change: "-3.1%",
      isPositive: false,
      bgColor: "bg-purple-500",
    },
    {
      title: "Conversion Rate",
      value: "2.4%",
      icon: <TrendingUp className="h-6 w-6" />,
      change: "+4.7%",
      isPositive: true,
      bgColor: "bg-orange-500",
    },
  ];

  const recentActivity = [
    {
      user: "Godbless Nyagawa",
      action: "Created new account",
      time: "2 minutes ago",
      type: "account",
    },
    {
      user: "Queen Mello",
      action: "Placed new order #1234",
      time: "1 hour ago",
      type: "order",
    },
    {
      user: "Isaac Mwasalemba",
      action: "Updated profile",
      time: "3 hours ago",
      type: "profile",
    },
    {
      user: "Kelvin Chui",
      action: "Submitted support ticket",
      time: "5 hours ago",
      type: "support",
    },
    {
      user: "Adama Traore",
      action: "Made a purchase",
      time: "6 hours ago",
      type: "purchase",
    },
  ];

  const topProducts = [
    { name: "Fresh Oil", sales: 234, revenue: "Tsh25,000" },
    { name: "Mchele", sales: 187, revenue: "Tsh11,000" },
    { name: "Viazi", sales: 156, revenue: "Tsh12,000" },
    { name: "Carot", sales: 124, revenue: "Tsh15,200" },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.bgColor} p-3 rounded-lg text-white`}>
                {stat.icon}
              </div>
              <span
                className={`flex items-center ${
                  stat.isPositive ? "text-green-600" : "text-red-600"
                }`}
              >
                {stat.change}
                {stat.isPositive ? (
                  <ArrowUpRight className="h-4 w-4 ml-1" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 ml-1" />
                )}
              </span>
            </div>
            <h3 className="text-gray-500 text-sm font-medium">{stat.title}</h3>
            <p className="text-2xl font-semibold mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Top Products</h2>
            <span className="text-sm text-gray-500">Last 30 days</span>
          </div>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-3 border-b last:border-0"
              >
                <div>
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-gray-500">{product.sales} sales</p>
                </div>
                <span className="font-semibold text-green-600">
                  {product.revenue}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Recent Activity</h2>
            <span className="text-sm text-gray-500">Today</span>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-3 border-b last:border-0"
              >
                <div>
                  <p className="font-medium">{activity.user}</p>
                  <p className="text-sm text-gray-500">{activity.action}</p>
                </div>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Quick Stats</h2>
          <Activity className="h-5 w-5 text-gray-500" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="text-blue-600 font-medium">Active Users</h3>
            <p className="text-2xl font-bold mt-2">1,234</p>
            <p className="text-sm text-gray-500 mt-1">Online now</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <h3 className="text-green-600 font-medium">Success Rate</h3>
            <p className="text-2xl font-bold mt-2">98.2%</p>
            <p className="text-sm text-gray-500 mt-1">Last 24 hours</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <h3 className="text-purple-600 font-medium">Response Time</h3>
            <p className="text-2xl font-bold mt-2">1.2s</p>
            <p className="text-sm text-gray-500 mt-1">Average</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
