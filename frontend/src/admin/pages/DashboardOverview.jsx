import {
  Users,
  DollarSign,
  ShoppingCart,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const revenueData = [
  { name: "Jan", value: 4000 },
  { name: "Feb", value: 3000 },
  { name: "Mar", value: 5000 },
  { name: "Apr", value: 4500 },
  { name: "May", value: 6000 },
  { name: "Jun", value: 5500 },
];

const userActivityData = [
  { name: "Mon", active: 120, new: 20 },
  { name: "Tue", active: 132, new: 25 },
  { name: "Wed", active: 145, new: 30 },
  { name: "Thu", active: 140, new: 22 },
  { name: "Fri", active: 160, new: 28 },
  { name: "Sat", active: 150, new: 24 },
  { name: "Sun", active: 138, new: 18 },
];

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

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Revenue Overview</h2>
            <div className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-gray-500" />
              <span className="text-sm text-gray-500">Last 6 months</span>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* User Activity Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">User Activity</h2>
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-gray-500" />
              <span className="text-sm text-gray-500">Weekly overview</span>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={userActivityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="active" fill="#3b82f6" name="Active Users" />
                <Bar dataKey="new" fill="#10b981" name="New Users" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {[
            {
              user: "John Doe",
              action: "Created new account",
              time: "2 minutes ago",
            },
            {
              user: "Sarah Smith",
              action: "Placed new order #1234",
              time: "1 hour ago",
            },
            {
              user: "Mike Johnson",
              action: "Updated profile",
              time: "3 hours ago",
            },
            {
              user: "Emily Brown",
              action: "Submitted support ticket",
              time: "5 hours ago",
            },
          ].map((activity, index) => (
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
  );
};

export default DashboardOverview;
