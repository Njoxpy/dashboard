import { useState } from "react";

// Sample audit log data
const auditLogs = [
  {
    id: 1,
    action: "User created",
    user: "admin@example.com",
    timestamp: "2025-01-29 09:00 AM",
  },
  {
    id: 2,
    action: "User updated",
    user: "user1@example.com",
    timestamp: "2025-01-28 04:30 PM",
  },
  {
    id: 3,
    action: "User deleted",
    user: "test@example.com",
    timestamp: "2025-01-27 11:15 AM",
  },
  {
    id: 4,
    action: "Password changed",
    user: "admin@example.com",
    timestamp: "2025-01-26 08:45 AM",
  },
  {
    id: 5,
    action: "Role updated",
    user: "moderator@example.com",
    timestamp: "2025-01-25 02:10 PM",
  },
  {
    id: 6,
    action: "User created",
    user: "newuser@example.com",
    timestamp: "2025-01-24 05:30 PM",
  },
  {
    id: 7,
    action: "User suspended",
    user: "spamuser@example.com",
    timestamp: "2025-01-23 01:00 PM",
  },
  {
    id: 8,
    action: "User activated",
    user: "inactive@example.com",
    timestamp: "2025-01-22 09:20 AM",
  },
  {
    id: 9,
    action: "Email updated",
    user: "user2@example.com",
    timestamp: "2025-01-21 07:50 PM",
  },
  {
    id: 10,
    action: "User deleted",
    user: "olduser@example.com",
    timestamp: "2025-01-20 03:25 PM",
  },
  {
    id: 11,
    action: "User created",
    user: "john@example.com",
    timestamp: "2025-01-19 06:40 AM",
  },
  {
    id: 12,
    action: "User updated",
    user: "admin@example.com",
    timestamp: "2025-01-18 10:15 PM",
  },
  {
    id: 13,
    action: "User suspended",
    user: "banned@example.com",
    timestamp: "2025-01-17 12:30 PM",
  },
  {
    id: 14,
    action: "User activated",
    user: "restored@example.com",
    timestamp: "2025-01-16 04:00 PM",
  },
  {
    id: 15,
    action: "Password reset",
    user: "user3@example.com",
    timestamp: "2025-01-15 08:10 AM",
  },
  {
    id: 16,
    action: "Role updated",
    user: "staff@example.com",
    timestamp: "2025-01-14 05:45 PM",
  },
  {
    id: 17,
    action: "User deleted",
    user: "tester@example.com",
    timestamp: "2025-01-13 02:20 AM",
  },
  {
    id: 18,
    action: "User created",
    user: "developer@example.com",
    timestamp: "2025-01-12 11:55 AM",
  },
  {
    id: 19,
    action: "User updated",
    user: "admin@example.com",
    timestamp: "2025-01-11 09:35 PM",
  },
  {
    id: 20,
    action: "Email updated",
    user: "user4@example.com",
    timestamp: "2025-01-10 07:25 AM",
  },
];

const AuditLogs = () => {
  const logsPerPage = 5; // Number of logs per page
  const [currentPage, setCurrentPage] = useState(1);

  // Get the logs for the current page
  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentLogs = auditLogs.slice(indexOfFirstLog, indexOfLastLog);

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total pages
  const totalPages = Math.ceil(auditLogs.length / logsPerPage);

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <h1 className="text-3xl font-bold text-green-600 mb-6">Audit Logs</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Timestamp
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentLogs.map((log) => (
              <tr key={log.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                  {log.action}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {log.user}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {log.timestamp}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="mt-4 flex justify-center space-x-4">
          <button
            className="px-4 py-2 text-white bg-green-600 hover:bg-green-700 rounded-lg"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="flex items-center text-sm text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="px-4 py-2 text-white bg-green-600 hover:bg-green-700 rounded-lg"
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuditLogs;
