import { useState } from "react";

// Sample message data
const sampleMessages = [
  {
    id: 1,
    name: "John Doe",
    email: "johndoe@example.com",
    subject: "Issue with account",
    message: "I am unable to log in to my account. Please help!",
    timestamp: "2025-01-29 10:30 AM",
    read: false,
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "janesmith@example.com",
    subject: "Payment issue",
    message: "I was charged twice for the same subscription.",
    timestamp: "2025-01-28 04:15 PM",
    read: true,
  },
  {
    id: 3,
    name: "Sarah Lee",
    email: "sarahlee@example.com",
    subject: "Refund request",
    message: "Can I get a refund for the extra charge?",
    timestamp: "2025-01-27 12:00 PM",
    read: false,
  },
  {
    id: 4,
    name: "Tom Brown",
    email: "tombrown@example.com",
    subject: "Account blocked",
    message: "My account has been blocked. Please help me restore it.",
    timestamp: "2025-01-26 03:40 PM",
    read: true,
  },
  {
    id: 5,
    name: "Emma White",
    email: "emmawhite@example.com",
    subject: "Login issues",
    message: "I am facing issues while logging in to my account.",
    timestamp: "2025-01-25 06:30 AM",
    read: false,
  },
  {
    id: 6,
    name: "Michael Mwinyi",
    email: "michaelmwinyi@example.com",
    subject: "Swala la malipo",
    message: "Nimeshtukiwa kwa malipo mara mbili kwa ajili ya usajili moja.",
    timestamp: "2025-03-05 09:00 AM",
    read: false,
  },
  {
    id: 7,
    name: "Amina Hassan",
    email: "aminahassan@example.com",
    subject: "Kizuizi cha akaunti",
    message: "Akaunti yangu imezuiwa. Tafadhali nisaidie kuirejesha.",
    timestamp: "2025-03-04 02:00 PM",
    read: false,
  },
  {
    id: 8,
    name: "Juma Ali",
    email: "jumaali@example.com",
    subject: "Tatizo la kuingia",
    message: "Nina matatizo ya kuingia kwenye akaunti yangu.",
    timestamp: "2025-03-03 11:45 AM",
    read: true,
  },
  {
    id: 9,
    name: "Zawadi Ibrahim",
    email: "zawadiibrahim@example.com",
    subject: "Ombi la kurejesha pesa",
    message: "Je, naweza kupata kurejeshewa pesa kwa malipo ya ziada?",
    timestamp: "2025-03-02 05:30 PM",
    read: false,
  },
  {
    id: 10,
    name: "Fatima Kazi",
    email: "fatimakazi@example.com",
    subject: "Tatizo la akaunti",
    message: "Sijui kwa nini siwezi kuingia kwenye akaunti yangu.",
    timestamp: "2025-03-01 10:00 AM",
    read: true,
  },
];

const AdminMessages = () => {
  const [messages, setMessages] = useState(sampleMessages);
  const [currentPage, setCurrentPage] = useState(1);
  const [messagesPerPage] = useState(10); // Number of messages per page

  // Calculate the index of the first and last message for the current page
  const indexOfLastMessage = currentPage * messagesPerPage;
  const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
  const currentMessages = messages.slice(
    indexOfFirstMessage,
    indexOfLastMessage
  );

  // Calculate the total number of pages
  const totalPages = Math.ceil(messages.length / messagesPerPage);

  // Mark message as read/unread
  const toggleReadStatus = (id) => {
    setMessages((prevMessages) =>
      prevMessages.map((message) =>
        message.id === id ? { ...message, read: !message.read } : message
      )
    );
  };

  // Delete message
  const deleteMessage = (id) => {
    setMessages((prevMessages) =>
      prevMessages.filter((message) => message.id !== id)
    );
  };

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-4xl font-extrabold text-green-600 mb-6">
        Admin Messages
      </h1>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Subject
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Message
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-300">
            {currentMessages.map((message) => (
              <tr key={message.id}>
                <td className="px-6 py-4 text-sm font-medium text-gray-800">
                  {message.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {message.subject}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {message.message}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  <span
                    className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                      message.read
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {message.read ? "Read" : "Unread"}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  <button
                    className="text-green-500 hover:text-green-700"
                    onClick={() => toggleReadStatus(message.id)}
                  >
                    {message.read ? "Mark as Unread" : "Mark as Read"}
                  </button>
                  <span className="mx-2">|</span>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => deleteMessage(message.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination */}
        <div className="mt-4 flex justify-center">
          <button
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </button>
          <span className="px-4 py-2 text-sm font-semibold text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminMessages;
