import { useState } from "react";
import { FileDown, Search } from "lucide-react";
import jsPDF from "jspdf";
import "jspdf-autotable";

const ReportsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedReport, setSelectedReport] = useState("userActivity");
  const [currentPage, setCurrentPage] = useState(1);
  const reportsPerPage = 5;

  const reportData = {
    userActivity: [
      { id: 1, name: "John Doe", action: "Logged in", date: "2025-01-29" },
      {
        id: 2,
        name: "Jane Smith",
        action: "Updated profile",
        date: "2025-01-28",
      },
      { id: 3, name: "Alice Brown", action: "Logged out", date: "2025-01-27" },
      {
        id: 4,
        name: "Tommy Green",
        action: "Changed password",
        date: "2025-01-26",
      },
      { id: 5, name: "Sara Lee", action: "Logged in", date: "2025-01-25" },
      { id: 6, name: "Max Adams", action: "Updated email", date: "2025-01-24" },
      {
        id: 7,
        name: "Ella White",
        action: "Deleted account",
        date: "2025-01-23",
      },
    ],
    sales: [
      { id: 1, item: "Laptop", amount: "$1200", date: "2025-01-25" },
      { id: 2, item: "Phone", amount: "$800", date: "2025-01-24" },
      { id: 3, item: "Headphones", amount: "$200", date: "2025-01-22" },
      { id: 4, item: "Tablet", amount: "$400", date: "2025-01-21" },
      { id: 5, item: "Smartwatch", amount: "$250", date: "2025-01-20" },
      { id: 6, item: "Camera", amount: "$1500", date: "2025-01-19" },
    ],
    logs: [
      {
        id: 1,
        event: "System Rebooted",
        status: "Success",
        date: "2025-01-26",
      },
      {
        id: 2,
        event: "Database Backup",
        status: "Completed",
        date: "2025-01-23",
      },
      {
        id: 3,
        event: "User Login Failed",
        status: "Failed",
        date: "2025-01-22",
      },
      {
        id: 4,
        event: "Security Patch Installed",
        status: "Success",
        date: "2025-01-21",
      },
      {
        id: 5,
        event: "Server Shutdown",
        status: "Success",
        date: "2025-01-20",
      },
      {
        id: 6,
        event: "Password Reset",
        status: "Completed",
        date: "2025-01-19",
      },
    ],
  };

  const reports = reportData[selectedReport].filter((report) =>
    JSON.stringify(report).toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(reports.length / reportsPerPage);
  const paginatedReports = reports.slice(
    (currentPage - 1) * reportsPerPage,
    currentPage * reportsPerPage
  );

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Report Export", 14, 10);
    const tableData = paginatedReports.map((report) => Object.values(report));
    doc.autoTable({
      head: [Object.keys(paginatedReports[0])],
      body: tableData,
    });
    doc.save("report.pdf");
  };

  return (
    <div className="p-8 bg-green-50 shadow-xl rounded-xl">
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4 items-center">
          <select
            className="border p-3 rounded-lg bg-green-100 text-green-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            value={selectedReport}
            onChange={(e) => setSelectedReport(e.target.value)}
          >
            <option value="userActivity">User Activity</option>
            <option value="sales">Sales</option>
            <option value="logs">Logs</option>
          </select>
          <div className="relative">
            <input
              type="text"
              placeholder="Search report..."
              className="border p-3 pl-10 rounded-lg bg-green-100 text-green-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search
              className="absolute left-3 top-3 text-green-500"
              size={18}
            />
          </div>
        </div>
        <button
          onClick={exportToPDF}
          className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition duration-300"
        >
          <FileDown size={18} /> Export PDF
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {paginatedReports.map((report) => (
          <div
            key={report.id}
            className="p-6 border rounded-lg shadow-xl bg-green-100 text-green-800 transition-transform transform hover:scale-105"
          >
            {Object.entries(report).map(([key, value]) => (
              <p key={key} className="text-sm mb-2">
                <strong>{key}:</strong> {value}
              </p>
            ))}
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-6 py-3 border rounded-lg bg-green-200 hover:bg-green-300 disabled:opacity-50 transition duration-300"
        >
          Previous
        </button>
        <span className="text-green-800 text-lg">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-6 py-3 border rounded-lg bg-green-200 hover:bg-green-300 disabled:opacity-50 transition duration-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ReportsPage;
