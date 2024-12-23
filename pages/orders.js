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
        const response = await axios.get("http://localhost:3003/orders");
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
      await axios.post("http://localhost:3003/orders", {
        user_id: parseInt(userId),
        total_amount: parseFloat(totalAmount),
        status,
      });

      setUserId("");
      setTotalAmount("");
      setStatus("pending");
      setError(null);

      const response = await axios.get("http://localhost:3003/orders");
      setOrders(response.data);
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred while creating the order.");
    }
  };

  return (
    <div className="h-full bg-[#4B2E83] text-white flex flex-col items-center">
      <header className="w-full bg-[#4B2E83] py-4 px-8 flex justify-center shadow-md">
        <nav className="flex space-x-6">
          <a href="http://localhost:3000" className="text-white bg-[#4B2E83] hover:bg-[#7A4D99] py-2 px-4 rounded-lg">
            Users
          </a>
          <a href="http://localhost:3000/review" className="text-white bg-[#4B2E83] hover:bg-[#7A4D99] py-2 px-4 rounded-lg">
            Reviews
          </a>
          <a href="http://localhost:3000/products" className="text-white bg-[#4B2E83] hover:bg-[#7A4D99] py-2 px-4 rounded-lg">
            Products
          </a>
          <a href="" className="text-white bg-[#4B2E83] hover:bg-[#7A4D99] py-2 px-4 rounded-lg">
            Orders
          </a>
          <a href="http://localhost:3000/categories" className="text-white bg-[#4B2E83] hover:bg-[#7A4D99] py-2 px-4 rounded-lg">
            Categories
          </a>
        </nav>
      </header>

      <div className="w-full flex mt-8 space-x-8 px-8">
        <div className="w-1/3 bg-[#3A1F56] rounded-lg shadow-lg p-6">
          <p className="text-2xl font-bold mb-4">Add Order</p>
          <div className="space-y-4">
            <input
              type="number"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="Enter user ID"
              className="w-full p-3 border border-[#7A4D99] rounded-lg bg-[#3A1F56] text-white focus:outline-none focus:ring-2 focus:ring-[#C1A0D6]"
            />
            <input
              type="number"
              value={totalAmount}
              onChange={(e) => setTotalAmount(e.target.value)}
              placeholder="Enter total amount"
              className="w-full p-3 border border-[#7A4D99] rounded-lg bg-[#3A1F56] text-white focus:outline-none focus:ring-2 focus:ring-[#C1A0D6]"
            />
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full p-3 border border-[#7A4D99] rounded-lg bg-[#3A1F56] text-white focus:outline-none focus:ring-2 focus:ring-[#C1A0D6]"
            >
              <option value="pending">Pending</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <button
              onClick={handleCreateOrder}
              className="w-full bg-[#7A4D99] text-white py-3 rounded-lg hover:bg-[#9B7BBF] transition duration-300"
            >
              Create Order
            </button>
          </div>
        </div>

        <div className="w-2/3 bg-[#3A1F56] rounded-lg shadow-lg p-6">
          <p className="text-2xl font-bold mb-4">Orders</p>
          {orders.length === 0 ? (
            <p className="text-gray-300">No orders found. Create one above!</p>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {orders.map((order) => (
                <div key={order.order_id} className="bg-[#7A4D99] rounded-lg p-4">
                  <p>Order ID: {order.order_id}</p>
                  <p>User ID: {order.user_id}</p>
                  <p>Order Date: {new Date(order.order_date).toLocaleString()}</p>
                  <p>Total Amount: ${order.total_amount}</p>
                  <p>Status: {order.status}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
