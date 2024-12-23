import { useState, useEffect } from "react";
import axios from "axios";

export default function CategoriesPage() {
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:3003/categories");
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
      await axios.post("http://localhost:3003/categories", {
        category_name: categoryName,
      });

      setCategoryName("");
      setError(null);

      const response = await axios.get("http://localhost:3003/categories");
      setCategories(response.data);
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred while creating the category.");
    }
  };

  return (
    <div className="h-screen bg-[#4B2E83] text-white flex flex-col items-center">
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
          <a href="" className="text-white bg-[#4B2E83] hover:bg-[#7A4D99] py-2 px-4 rounded-lg">
            Categories
          </a>
        </nav>
      </header>

      <div className="w-full flex mt-8 space-x-8 px-8">
        <div className="w-1/3 bg-[#3A1F56] rounded-lg shadow-lg p-6">
          <p className="text-2xl font-bold mb-4">Add Category</p>
          <div className="space-y-4">
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Enter category name"
              className="w-full p-3 border border-[#7A4D99] rounded-lg bg-[#3A1F56] text-white focus:outline-none focus:ring-2 focus:ring-[#C1A0D6]"
            />
            <button
              onClick={handleCreateCategory}
              className="w-full bg-[#7A4D99] text-white py-3 rounded-lg hover:bg-[#9B7BBF] transition duration-300"
            >
              Create Category
            </button>
          </div>
        </div>

        <div className="w-2/3 bg-[#3A1F56] rounded-lg shadow-lg p-6">
          <p className="text-2xl font-bold mb-4">Categories</p>
          {categories.length === 0 ? (
            <p className="text-gray-300">No categories found. Create one above!</p>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {categories.map((category) => (
                <div key={category.category_id} className="bg-[#7A4D99] rounded-lg p-4">
                  <p>Category Name: {category.category_name}</p>
                  <p className="text-gray-400 text-sm">Created At: {category.created_at}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
