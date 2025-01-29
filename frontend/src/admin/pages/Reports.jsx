// src/pages/admin/Reports.jsx
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Reports = () => {
    const data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
            {
                label: "Sales Over Time",
                data: [30, 70, 100, 85, 120, 150],
                borderColor: "rgb(75, 192, 192)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                fill: true,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
        },
    };

    return (
        <div>
            <div className="mb-2">
                <button
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Generate Report
                </button>
            </div>
            <h1 className="text-2xl font-semibold mb-6">Reports</h1>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold">Sales Report</h3>
                <Line data={data} options={options} />
            </div>

        </div>
    );
};

export default Reports;
