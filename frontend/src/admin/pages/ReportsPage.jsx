import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ReportsPage = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    "Animal Feeding",
    "Fresh Oil",
    "Godown",
    "Hardware",
    "Printing",
    "Stationery",
  ];

  const handleGenerateReport = async () => {
    if (!startDate || !endDate || !selectedCategory) {
      toast.error("Please select all fields", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/${selectedCategory
          .toLowerCase()
          .replace(
            " ",
            "-"
          )}/reports?startDate=${startDate}&endDate=${endDate}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/pdf",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to generate report");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${selectedCategory
        .toLowerCase()
        .replace(" ", "_")}_report.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      toast.success("Report generated successfully!", {
        position: "top-center",
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Report generation error:", error);
      toast.error(
        error.message ||
          "Failed to generate report. Please check your network.",
        {
          position: "top-center",
          autoClose: 3000,
        }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 min-h-screen">
      <ToastContainer />
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden p-8">
        <h2 className="text-4xl font-extrabold text-center text-green-700 mb-10">
          Generate Report
        </h2>

        {/* Category Selection */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-green-700 mb-4">
            Select Category
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`p-4 rounded-lg transition-all transform hover:scale-105 ${
                  selectedCategory === category
                    ? "bg-green-600 text-white shadow-lg"
                    : "bg-green-100 text-green-700 hover:bg-green-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Date Range Inputs */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-green-700 mb-4">
            Select Date Range
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-green-700 mb-2">
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full p-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-green-700 mb-2">
                End Date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full p-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
        </div>

        {/* Generate Report Button */}
        <button
          onClick={handleGenerateReport}
          disabled={loading || !selectedCategory}
          className={`w-full p-4 rounded-lg text-lg font-semibold transition-all ${
            selectedCategory && !loading
              ? "bg-green-600 text-white hover:bg-green-700 hover:shadow-lg"
              : "bg-green-300 cursor-not-allowed"
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin h-5 w-5 mr-3 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Generating...
            </span>
          ) : (
            "Generate Report"
          )}
        </button>
      </div>
    </div>
  );
};

export default ReportsPage;
