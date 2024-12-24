import { useState, useEffect } from "react";
import axios from "axios";

export default function OrdersPage() {
  const [userId, setUserId] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [status, setStatus] = useState("pending");
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:4000/orders");
        setOrders(response.data);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.error || "An error occurred while fetching orders.");
      }
    };

    fetchOrders();
  }, []);

  const handleCreateOrder = async () => {
    if (!userId || !totalAmount || !status) {
      setError("All fields are required.");
      return;
    }

    try {
      await axios.post("http://localhost:4000/orders", {
        user_id: parseInt(userId),
        total_amount: parseFloat(totalAmount),
        status,
      });

      setUserId("");
      setTotalAmount("");
      setStatus("pending");
      setError(null);

      const response = await axios.get("http://localhost:4000/orders");
      setOrders(response.data);
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred while creating the order.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-800 p-6 shadow-lg">
        <h2 className="text-yellow-500 text-3xl font-bold mb-8">Dashboard</h2>
        <nav className="flex flex-col space-y-4">
          <a href="http://localhost:3000" className="text-yellow-500 text-xl hover:text-yellow-400 transition duration-300">Users</a>
          <a href="http://localhost:3000/review" className="text-yellow-500 text-xl hover:text-yellow-400 transition duration-300">Reviews</a>
          <a href="http://localhost:3000/products" className="text-yellow-500 text-xl hover:text-yellow-400 transition duration-300">Products</a>
          <a href="" className="text-yellow-500 text-xl hover:text-yellow-400 transition duration-300">Orders</a>
          <a href="http://localhost:3000/categories" className="text-yellow-500 text-xl hover:text-yellow-400 transition duration-300">Categories</a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-8 overflow-y-auto">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Create Order Form */}
          <div className="bg-gray-800 rounded-xl w-full lg:w-1/2 p-8 shadow-2xl hover:shadow-xl transition duration-300">
            <p className="text-3xl font-semibold text-yellow-500 mb-8 text-center">Add Order</p>
            <div className="space-y-6">
              <input
                type="number"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="User ID"
                className="w-full p-5 bg-gray-700 text-white border border-gray-600 rounded-xl focus:ring-2 focus:ring-yellow-500"
              />
              <input
                type="number"
                value={totalAmount}
                onChange={(e) => setTotalAmount(e.target.value)}
                placeholder="Total Amount"
                className="w-full p-5 bg-gray-700 text-white border border-gray-600 rounded-xl focus:ring-2 focus:ring-yellow-500"
              />
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full p-5 bg-gray-700 text-white border border-gray-600 rounded-xl focus:ring-2 focus:ring-yellow-500"
              >
                <option value="pending">Pending</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <button
                onClick={handleCreateOrder}
                className="w-full bg-yellow-500 text-gray-900 py-4 rounded-xl hover:bg-yellow-600 transition duration-300"
              >
                Create Order
              </button>
            </div>
            {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}
          </div>

          {/* Orders List */}
          <div className="bg-gray-800 rounded-xl w-full lg:w-1/2 p-8 shadow-2xl hover:shadow-xl transition duration-300">
            <p className="text-3xl font-semibold text-yellow-500 mb-8 text-center">Orders</p>
            {orders.length === 0 ? (
              <p className="text-gray-400 text-center">No orders found. Create one above!</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {orders.map((order) => (
                  <div
                    key={order.order_id}
                    className="bg-gray-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition duration-300"
                  >
                    <p className="text-yellow-500 font-semibold">Order ID: {order.order_id}</p>
                    <p className="text-yellow-500">User ID: {order.user_id}</p>
                    <p className="text-yellow-500">Order Date: {new Date(order.order_date).toLocaleString()}</p>
                    <p className="text-yellow-500">Total Amount: ${order.total_amount}</p>
                    <p className="text-yellow-500">Status: {order.status}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
