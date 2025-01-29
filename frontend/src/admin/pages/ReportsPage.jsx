import { useState } from "react";
import { FileDown, Search, Filter } from "lucide-react";
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
    ],
    sales: [
      { id: 1, item: "Laptop", amount: "$1200", date: "2025-01-25" },
      { id: 2, item: "Phone", amount: "$800", date: "2025-01-24" },
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
    <div className="p-6 bg-green-50 shadow-md rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2">
          <select
            className="border p-2 rounded-lg bg-green-100 text-green-800"
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {paginatedReports.map((report) => (
          <div
            key={report.id}
            className="p-4 border rounded-lg shadow-md bg-green-100 text-green-800"
          >
            {Object.entries(report).map(([key, value]) => (
              <p key={key} className="text-sm">
                <strong>{key}:</strong> {value}
              </p>
            ))}
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-4">
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
    </div>
  );
};

export default ReportsPage;
