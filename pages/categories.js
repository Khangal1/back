import { useState, useEffect } from "react";
import axios from "axios";

export default function CategoriesPage() {
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:4000/categories");
        setCategories(response.data);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.error || "An error occurred while fetching categories.");
      }
    };

    fetchCategories();
  }, []);

  const handleCreateCategory = async () => {
    if (!categoryName) {
      setError("Category name is required.");
      return;
    }

    try {
      await axios.post("http://localhost:4000/createCategories", {
        name: categoryName,
      });

      setCategoryName("");
      setError(null);

      const response = await axios.get("http://localhost:4000/categories");
      setCategories(response.data);
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred while creating the category.");
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
          <a href="http://localhost:3000/orders" className="text-yellow-500 text-xl hover:text-yellow-400 transition duration-300">Orders</a>
          <a href="#" className="text-yellow-500 text-xl hover:text-yellow-400 transition duration-300">Categories</a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-8 overflow-y-auto">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Create Category Form */}
          <div className="bg-gray-800 rounded-xl w-full lg:w-1/2 p-8 shadow-2xl hover:shadow-xl transition duration-300">
            <p className="text-3xl font-semibold text-yellow-500 mb-8 text-center">Add Category</p>
            <div className="space-y-6">
              <input
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="Enter category name"
                className="w-full p-5 bg-gray-700 text-white border border-gray-600 rounded-xl focus:ring-2 focus:ring-yellow-500"
              />
              <button
                onClick={handleCreateCategory}
                className="w-full bg-yellow-500 text-gray-900 py-4 rounded-xl hover:bg-yellow-600 transition duration-300"
              >
                Create Category
              </button>
            </div>
            {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}
          </div>

          {/* Categories List */}
          <div className="bg-gray-800 rounded-xl w-full lg:w-1/2 p-8 shadow-2xl hover:shadow-xl transition duration-300">
            <p className="text-3xl font-semibold text-yellow-500 mb-8 text-center">Categories</p>
            {categories.length === 0 ? (
              <p className="text-gray-400 text-center">No categories found. Create one above!</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="bg-gray-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition duration-300"
                  >
                    <p className="text-yellow-500 font-semibold">Category Name: {category.name}</p>
                    <p className="text-gray-400 text-sm">Created At: {new Date(category.created_at).toLocaleString()}</p>
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
