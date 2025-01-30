import React, { useState } from "react";
import { FileDown, Filter, Printer, RefreshCcw } from "lucide-react";

// Card Components
const Card = ({ className, children, ...props }) => (
  <div
    className={`rounded-lg border bg-white shadow-sm ${className}`}
    {...props}
  >
    {children}
  </div>
);

const CardHeader = ({ className, children, ...props }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props}>
    {children}
  </div>
);

const CardTitle = ({ className, children, ...props }) => (
  <h3 className={`text-lg font-semibold ${className}`} {...props}>
    {children}
  </h3>
);

const CardContent = ({ className, children, ...props }) => (
  <div className={`p-6 pt-0 ${className}`} {...props}>
    {children}
  </div>
);

// Button Component
const Button = ({
  children,
  variant = "default",
  size = "default",
  className = "",
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";
  const variantStyles = {
    default: "bg-emerald-600 text-white hover:bg-emerald-700",
    outline:
      "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground",
  };
  const sizeStyles = {
    default: "h-10 px-4 py-2",
    sm: "h-8 px-3 text-sm",
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// Select Components
const Select = ({ children, value, onValueChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  return <div className="relative">{children}</div>;
};

const SelectTrigger = ({ children, className }) => (
  <Button
    variant="outline"
    className={`w-full justify-between ${className}`}
    onClick={() => setIsOpen(!isOpen)}
  >
    {children}
  </Button>
);

const SelectValue = ({ placeholder }) => <span>{placeholder}</span>;

const SelectContent = ({ children }) => (
  <div className="absolute mt-1 w-full rounded-md border bg-white shadow-lg">
    {children}
  </div>
);

const SelectItem = ({ value, children }) => (
  <div
    className="px-2 py-1.5 hover:bg-emerald-50 cursor-pointer"
    onClick={() => onValueChange(value)}
  >
    {children}
  </div>
);

const ReportsPage = () => {
  const [selectedReport, setSelectedReport] = useState("");

  // Sample data
  const reports = [
    {
      id: 1,
      name: "Sales Report",
      date: "2025-01-29",
      amount: "$5,234.00",
      status: "Completed",
    },
    {
      id: 2,
      name: "Inventory Report",
      date: "2025-01-28",
      amount: "$3,456.00",
      status: "Pending",
    },
    {
      id: 3,
      name: "Customer Analysis",
      date: "2025-01-27",
      amount: "$2,789.00",
      status: "Completed",
    },
    {
      id: 4,
      name: "Revenue Summary",
      date: "2025-01-26",
      amount: "$6,123.00",
      status: "Processing",
    },
  ];

  const generatePDF = () => {
    // PDF generation logic would go here
    console.log("Generating PDF...");
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-emerald-800">
          Reports Dashboard
        </h1>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="border-emerald-600 text-emerald-600 hover:bg-emerald-50"
            onClick={() => console.log("Refresh")}
          >
            <RefreshCcw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button
            className="bg-emerald-600 hover:bg-emerald-700"
            onClick={generatePDF}
          >
            <FileDown className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-emerald-50 border-emerald-200">
          <CardHeader>
            <CardTitle className="text-emerald-800">Total Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-emerald-600">24</p>
          </CardContent>
        </Card>

        <Card className="bg-emerald-50 border-emerald-200">
          <CardHeader>
            <CardTitle className="text-emerald-800">Generated Today</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-emerald-600">5</p>
          </CardContent>
        </Card>

        <Card className="bg-emerald-50 border-emerald-200">
          <CardHeader>
            <CardTitle className="text-emerald-800">Pending Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-emerald-600">3</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="bg-emerald-50 border-b border-emerald-100">
          <div className="flex justify-between items-center">
            <CardTitle className="text-emerald-800">Recent Reports</CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Button
                  variant="outline"
                  className="border-emerald-200 w-[180px] justify-between"
                >
                  <span>Filter by type</span>
                </Button>
              </div>
              <Button variant="outline" className="border-emerald-200">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
              <Button variant="outline" className="border-emerald-200">
                <Printer className="w-4 h-4 mr-2" />
                Print
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-emerald-100">
                  <th className="px-4 py-3 text-left text-emerald-800">
                    Report Name
                  </th>
                  <th className="px-4 py-3 text-left text-emerald-800">Date</th>
                  <th className="px-4 py-3 text-left text-emerald-800">
                    Amount
                  </th>
                  <th className="px-4 py-3 text-left text-emerald-800">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-emerald-800">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report) => (
                  <tr
                    key={report.id}
                    className="border-b border-emerald-50 hover:bg-emerald-50"
                  >
                    <td className="px-4 py-3">{report.name}</td>
                    <td className="px-4 py-3">{report.date}</td>
                    <td className="px-4 py-3">{report.amount}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-sm ${
                          report.status === "Completed"
                            ? "bg-emerald-100 text-emerald-800"
                            : report.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {report.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
                      >
                        <FileDown className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsPage;
