import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AlertCircle, Loader2 } from "lucide-react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DashboardHome = () => {
  const location = useLocation();
  const [orders, setOrders] = useState([]);
  const [totalOrdersCount, setTotalOrdersCount] = useState(null);
  const [totalSales, setTotalSales] = useState(null);
  const [salesError, setSalesError] = useState(null);
  const [totalProductsCount, setTotalProductsCount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [countError, setCountError] = useState(null);
  const [productsError, setProductsError] = useState(null);

  const selectedCategory = location.pathname.split("/")[2] || "animal-feeding";

  // Fetch orders for the selected category
  const fetchOrders = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/${selectedCategory}/orders/`,
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch orders (Status: ${response.status})`);
      }
      const data = await response.json();
      setOrders(data.orders || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch total orders count across all categories
  const fetchTotalOrdersCount = async () => {
    setCountError(null);
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/fresh-oil/orders-count`,
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        throw new Error(
          `Failed to fetch total orders count (Status: ${response.status})`
        );
      }
      const data = await response.json();
      setTotalOrdersCount(data.totalCount || 0);
    } catch (err) {
      setCountError(err.message);
    }
  };

  const fetchTotalSales = async () => {
    setSalesError(null);
    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/fresh-oil/sales-total",
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch total sales (Status: ${response.status})`
        );
      }

      const data = await response.json();
      setTotalSales(data.totalSales || 0);
    } catch (err) {
      setSalesError(err.message);
    }
  };

  // Fetch total products count
  const fetchTotalProductsCount = async () => {
    setProductsError(null);
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/fresh-oil/products-count`,
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        throw new Error(
          `Failed to fetch total products count (Status: ${response.status})`
        );
      }
      const data = await response.json();

      // Use the totalProducts field directly from the API response
      const totalProducts = data.totalProducts || 0;
      setTotalProductsCount(totalProducts);
    } catch (err) {
      setProductsError(err.message);
    }
  };

  useEffect(() => {
    fetchOrders();
    fetchTotalOrdersCount();
    fetchTotalProductsCount();
    fetchTotalSales();
  }, [selectedCategory]);

  const stats = {
    totalSales: orders.reduce((acc, order) => acc + (order.total || 0), 0),
  };

  const StatCard = ({ title, value, prefix = "" }) => (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <h3 className="text-gray-600 text-sm font-medium mb-2">{title}</h3>
      <p className="text-2xl md:text-3xl font-bold text-gray-900">
        {prefix && <span className="text-gray-600">{prefix} </span>}
        {typeof value === "number" ? value.toLocaleString() : value}
      </p>
    </div>
  );

  // Chart Data
  const chartData = {
    labels: ["Total Sales", "Total Orders", "Total Products"],
    datasets: [
      {
        label: "Metrics",
        data: [stats.totalSales, totalOrdersCount, totalProductsCount],
        backgroundColor: [
          "rgba(75, 192, 192, 0.8)", // Total Sales
          "rgba(255, 159, 64, 0.8)", // Total Orders
          "rgba(54, 162, 235, 0.8)", // Total Products
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)", // Total Sales
          "rgba(255, 159, 64, 1)", // Total Orders
          "rgba(54, 162, 235, 1)", // Total Products
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Dashboard Metrics" },
    },
  };

  return (
    <div className="flex flex-col space-y-6 p-4 md:p-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard
          title="Total Orders (All Categories)"
          value={totalOrdersCount}
        />
        <StatCard title="Total Sales" value={totalSales} prefix="Tsh" />
        <StatCard title="Total Products" value={totalProductsCount} />
      </div>

      {/* Chart Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Sales, Orders, and Products
        </h3>
        <Bar data={chartData} options={chartOptions} />
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center p-8">
          <Loader2 className="animate-spin h-8 w-8 text-blue-600" />
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="flex items-center gap-2 p-4 text-red-600 bg-red-50 rounded-lg">
          <AlertCircle className="h-5 w-5" />
          <p>{error}</p>
        </div>
      )}
      {countError && (
        <div className="flex items-center gap-2 p-4 text-red-600 bg-red-50 rounded-lg">
          <AlertCircle className="h-5 w-5" />
          <p>{countError}</p>
        </div>
      )}
      {productsError && (
        <div className="flex items-center gap-2 p-4 text-red-600 bg-red-50 rounded-lg">
          <AlertCircle className="h-5 w-5" />
          <p>{productsError}</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && orders.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No orders found for this category.
        </div>
      )}
    </div>
  );
};

export default DashboardHome;
