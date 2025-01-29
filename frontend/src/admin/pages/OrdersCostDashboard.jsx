import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { FileDown, Search } from "lucide-react";
import jsPDF from "jspdf";
import "jspdf-autotable";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const OrdersCostDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  // Example orders data (replace with dynamic data as needed)
  const ordersData = [
    { id: 1, orderId: "ORD001", cost: 1200, date: "2025-01-29" },
    { id: 2, orderId: "ORD002", cost: 800, date: "2025-01-28" },
    { id: 3, orderId: "ORD003", cost: 600, date: "2025-01-27" },
    { id: 4, orderId: "ORD004", cost: 1500, date: "2025-01-26" },
    { id: 5, orderId: "ORD005", cost: 2200, date: "2025-01-25" },
    // Add more orders as needed
  ];

  const filteredOrders = ordersData.filter((order) =>
    JSON.stringify(order).toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage
  );

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Orders Cost Report", 14, 10);
    const tableData = paginatedOrders.map((order) => Object.values(order));
    doc.autoTable({
      head: [Object.keys(paginatedOrders[0])],
      body: tableData,
    });
    doc.save("orders-cost-report.pdf");
  };

  // Chart data
  const chartData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"], // example months
    datasets: [
      {
        label: "Order Cost ($)",
        data: [1200, 1500, 1600, 1800, 1700, 1900, 2100], // example order costs for each month
        fill: false,
        borderColor: "#22c55e",
        tension: 0.1,
        pointBackgroundColor: "#22c55e",
        pointBorderColor: "#22c55e",
        pointHoverBackgroundColor: "#22c55e",
      },
    ],
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Orders Cost Overview
      </h2>

      {/* Filters and Export */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search orders..."
              className="border p-2 pl-8 rounded-lg bg-green-100 text-green-800"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search
              className="absolute left-2 top-2.5 text-green-500"
              size={16}
            />
          </div>
        </div>
        <button
          onClick={exportToPDF}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          <FileDown size={16} /> Export PDF
        </button>
      </div>

      {/* Orders Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-[#f0fdf4] p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-[#166534]">Total Cost</h3>
          <p className="text-2xl font-bold text-[#22c55e]">
            $
            {ordersData
              .reduce((acc, order) => acc + order.cost, 0)
              .toLocaleString()}
          </p>
        </div>

        <div className="bg-[#f0fdf4] p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-[#166534]">Monthly Cost</h3>
          <p className="text-2xl font-bold text-[#22c55e]">
            $
            {ordersData
              .slice(0, 1)
              .reduce((acc, order) => acc + order.cost, 0)
              .toLocaleString()}
          </p>
        </div>

        <div className="bg-[#f0fdf4] p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-[#166534]">Yearly Cost</h3>
          <p className="text-2xl font-bold text-[#22c55e]">
            $
            {ordersData
              .reduce((acc, order) => acc + order.cost, 0)
              .toLocaleString()}
          </p>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="mt-8">
        <div className="bg-[#f0fdf4] p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-[#166534]">
            Orders Cost Chart
          </h3>
          <div className="mt-4 h-64">
            <Line data={chartData} />
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 border rounded-lg bg-green-200 hover:bg-green-300 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-green-800">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-4 py-2 border rounded-lg bg-green-200 hover:bg-green-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Orders List */}
      <div className="mt-6">
        {paginatedOrders.map((order) => (
          <div
            key={order.id}
            className="bg-[#f0fdf4] p-4 rounded-lg mb-4 shadow-lg"
          >
            <p className="text-lg font-semibold text-[#166534]">
              Order ID: {order.orderId}
            </p>
            <p className="text-sm">Cost: ${order.cost.toLocaleString()}</p>
            <p className="text-sm text-gray-600">Date: {order.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersCostDashboard;
