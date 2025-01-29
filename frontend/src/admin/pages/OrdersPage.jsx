import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getToken } from "../../../services/token";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("animal-feeding");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const itemsPerPage = 5;
  const token = getToken();

  // Fetch orders from the API
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          `http://localhost:5000/API/v1/${selectedCategory}/orders/`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await response.json();
        setOrders(data); // Assuming the API returns an array of orders
      } catch (error) {
        setError("Error fetching orders: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [selectedCategory]); // Re-fetch when the selected category changes

  // Change orders based on selected category
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setPage(1); // Reset to first page when category changes
  };

  // Handle search filtering
  const filteredOrders = orders.filter(
    (order) =>
      order.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.orderId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle pagination logic
  const paginatedOrders = filteredOrders.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  // Pagination Controls
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  const handlePagination = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="p-5 bg-gray-100">
      <h1 className="text-3xl font-semibold mb-5">Order Management</h1>

      {/* Category Filter */}
      <div className="mb-5">
        <select
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="animal-feeding">Animal Feeding</option>
          <option value="fresh-oil">Fresh Oil</option>
          <option value="godown">Godown</option>
          <option value="hardware">Hardware</option>
          <option value="printing">Printing</option>
          <option value="stationery">Stationery</option>
        </select>
      </div>

      {/* Search Bar */}
      <div className="mb-5">
        <input
          type="text"
          className="p-2 border rounded w-full"
          placeholder="Search by Product Name or Order ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Loading and Error Messages */}
      {loading && <p className="text-blue-600">Loading orders...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {/* Orders Table */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <table className="min-w-full table-auto">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-3 px-4">Order ID</th>
              <th className="py-3 px-4">Product Name</th>
              <th className="py-3 px-4">Quantity</th>
              <th className="py-3 px-4">Total Price</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedOrders.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-3">
                  No orders found
                </td>
              </tr>
            ) : (
              paginatedOrders.map((order) => (
                <tr key={order._id} className="border-t">
                  <td className="py-3 px-4">{order.orderId}</td>
                  <td className="py-3 px-4">{order.productName}</td>
                  <td className="py-3 px-4">{order.quantity}</td>
                  <td className="py-3 px-4">
                    Tsh {order.total.toLocaleString()}
                  </td>
                  <td className="py-3 px-4">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4">
                    <Link
                      to={`/admin/orders/${order._id}`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-5 flex justify-between items-center">
        <button
          onClick={() => handlePagination(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Previous
        </button>
        <span className="text-lg">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => handlePagination(page + 1)}
          disabled={page === totalPages}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default OrdersPage;
