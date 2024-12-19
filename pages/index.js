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
        const response = await axios.get("http://localhost:3003/users");
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
      await axios.post("http://localhost:3003/users", {
        username: name,
        email,
        password,
      });

      setName("");
      setEmail("");
      setPassword("");
      setError(null);

      const response = await axios.get("http://localhost:3003/users");
      setPosts(response.data);
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred while creating the post.");
    }
  };

  return (
    <div className="h-full bg-[#4B2E83]  text-white flex flex-col items-center">

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
          <a href="http://localhost:3000/orders" className="text-white bg-[#4B2E83] hover:bg-[#7A4D99] py-2 px-4 rounded-lg">
            Orders
          </a>
          <a href="http://localhost:3000/categories" className="text-white bg-[#4B2E83] hover:bg-[#7A4D99] py-2 px-4 rounded-lg">
            Categories
          </a>
        </nav>
</header>


      <div className="w-full flex mt-8 space-x-8 px-8">

        <div className="w-1/3 bg-[#3A1F56] rounded-lg shadow-lg p-6">
          <p className="text-2xl font-bold mb-4">Add User</p>
          <div className="space-y-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter username"
              className="w-full p-3 border border-[#7A4D99] rounded-lg bg-[#3A1F56] text-white focus:outline-none focus:ring-2 focus:ring-[#C1A0D6]"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              className="w-full p-3 border border-[#7A4D99] rounded-lg bg-[#3A1F56] text-white focus:outline-none focus:ring-2 focus:ring-[#C1A0D6]"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full p-3 border border-[#7A4D99] rounded-lg bg-[#3A1F56] text-white focus:outline-none focus:ring-2 focus:ring-[#C1A0D6]"
            />
            <button
              onClick={handleCreatePost}
              className="w-full bg-[#7A4D99] text-white py-3 rounded-lg hover:bg-[#9B7BBF] transition duration-300"
              >
              Create User
            </button>
          </div>
          {error && <p className="text-red-400 text-sm mt-4">{error}</p>}
        </div>


        <div className="w-2/3 bg-[#3A1F56] rounded-lg shadow-lg p-6">
          <p className="text-2xl font-bold mb-4">Users</p>
          {posts.length === 0 ? (
            <p className="text-gray-300">No users found. Create one above!</p>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="bg-[#7A4D99]  rounded-lg p-4"
                >
                  <p>
                   Username:{post.username}
                  </p>
                  <p>
                    Email:{post.email}
                  </p>
                  <p>
                   Password:{post.password}
                  </p>
                  <p className="text-gray-400 text-sm">
                    Created At: {post.created_at}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
