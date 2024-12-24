import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:4000/users");
        setPosts(response.data);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.error || "An error occurred while fetching posts.");
      }
    };

    fetchPosts();
  }, []);

  const handleCreatePost = async () => {
    try {
      await axios.post("http://localhost:4000/users", {
        username: name,
        email,
        password,
      });

      setName("");
      setEmail("");
      setPassword("");
      setError(null);

      const response = await axios.get("http://localhost:4000/users");
      setPosts(response.data);
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred while creating the post.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">

      {/* Sidebar */}
      <div className="w-1/4 bg-gray-800 p-6 shadow-lg">
        <h2 className="text-yellow-500 text-3xl font-bold mb-8">Dashboard</h2>
        <nav className="flex justify-between flex-col">
          <a href="http://localhost:3000" className="text-yellow-500 text-xl hover:text-yellow-400 transition duration-300">Users</a>
          <a href="http://localhost:3000/review" className="text-yellow-500 text-xl hover:text-yellow-400 transition duration-300">Reviews</a>
          <a href="http://localhost:3000/products" className="text-yellow-500 text-xl hover:text-yellow-400 transition duration-300">Products</a>
          <a href="http://localhost:3000/orders" className="text-yellow-500 text-xl hover:text-yellow-400 transition duration-300">Orders</a>
          <a href="http://localhost:3000/categories" className="text-yellow-500 text-xl hover:text-yellow-400 transition duration-300">Categories</a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-8 overflow-y-auto">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Create User Form */}
          <div className="bg-gray-800 rounded-xl w-full lg:w-1/2 p-8 shadow-2xl hover:shadow-xl transition duration-300">
            <p className="text-3xl font-semibold text-yellow-500 mb-8 text-center">Create New User</p>
            <div className="space-y-6">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Username"
                className="w-full p-5 bg-gray-700 text-white border border-gray-600 rounded-xl focus:ring-2 focus:ring-yellow-500"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full p-5 bg-gray-700 text-white border border-gray-600 rounded-xl focus:ring-2 focus:ring-yellow-500"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full p-5 bg-gray-700 text-white border border-gray-600 rounded-xl focus:ring-2 focus:ring-yellow-500"
              />
              <button
                onClick={handleCreatePost}
                className="w-full bg-yellow-500 text-gray-900 py-4 rounded-xl hover:bg-yellow-600 transition duration-300"
              >
                Create User
              </button>
            </div>
            {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}
          </div>

          {/* Users List */}
          <div className="bg-gray-800 rounded-xl w-full lg:w-1/2 p-8 shadow-2xl hover:shadow-xl transition duration-300">
            <p className="text-3xl font-semibold text-yellow-500 mb-8 text-center">Users</p>
            {posts.length === 0 ? (
              <p className="text-gray-400 text-center">No users found. Create one above!</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className="bg-gray-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition duration-300"
                  >
                    <p className="text-yellow-500 font-semibold">Username: {post.username}</p>
                    <p className="text-yellow-500">Email: {post.email}</p>
                    <p className="text-yellow-500">Password: {post.password}</p>
                    <p className="text-gray-400 text-sm mt-2">Created At: {post.created_at}</p>
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
