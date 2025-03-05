// MessageDetail.jsx
import React from "react";
import { useParams } from "react-router-dom";
import { LucideMail } from "lucide-react";

const MessageDetail = () => {
  const { id } = useParams(); // Get message ID from the URL

  // Sample message data (this would be fetched from an API in a real app)
  const message = {
    id,
    subject: "Meeting Update",
    sender: "admin@example.com",
    recipient: "user@example.com",
    content: "Please be reminded of our meeting tomorrow at 10 AM.",
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center space-x-4">
        <LucideMail size={40} className="text-green-500" />
        <h1 className="text-3xl font-semibold text-green-600">
          {message.subject}
        </h1>
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-medium text-gray-700">Message Details</h2>
        <ul className="mt-4 space-y-2">
          <li className="text-lg">
            Sender: <span className="font-semibold">{message.sender}</span>
          </li>
          <li className="text-lg">
            Recipient:{" "}
            <span className="font-semibold">{message.recipient}</span>
          </li>
          <li className="text-lg">
            Content: <span className="font-semibold">{message.content}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MessageDetail;
