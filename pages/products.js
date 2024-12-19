import { useState, useEffect } from "react";
import axios from "axios";

export default function ProductsPage() {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3003/products");
        setProducts(response.data);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.error || "An error occurred while fetching products.");
      }
    };

    fetchProducts();
  }, []);

  const handleCreateProduct = async () => {
    if (!productName || !price || !stock) {
      setError("All fields are required.");
      return;
    }

    try {
      await axios.post("http://localhost:3003/products", {
        product_name: productName,
        price: parseFloat(price),
        stock: parseInt(stock),
      });

      setProductName("");
      setPrice("");
      setStock("");
      setError(null);

      const response = await axios.get("http://localhost:3003/products");
      setProducts(response.data);
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred while creating the product.");
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
          <a href="" className="text-white bg-[#4B2E83] hover:bg-[#7A4D99] py-2 px-4 rounded-lg">
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
          <p className="text-2xl font-bold mb-4">Add Product</p>
          <div className="space-y-4">
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Enter product name"
              className="w-full p-3 border border-[#7A4D99] rounded-lg bg-[#3A1F56] text-white focus:outline-none focus:ring-2 focus:ring-[#C1A0D6]"
            />
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price"
              className="w-full p-3 border border-[#7A4D99] rounded-lg bg-[#3A1F56] text-white focus:outline-none focus:ring-2 focus:ring-[#C1A0D6]"
            />
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              placeholder="Enter stock quantity"
              className="w-full p-3 border border-[#7A4D99] rounded-lg bg-[#3A1F56] text-white focus:outline-none focus:ring-2 focus:ring-[#C1A0D6]"
            />
            <button
              onClick={handleCreateProduct}
              className="w-full bg-[#7A4D99] text-white py-3 rounded-lg hover:bg-[#9B7BBF] transition duration-300"
            >
              Create Product
            </button>
          </div>
        </div>

        <div className="w-2/3 bg-[#3A1F56] rounded-lg shadow-lg p-6">
          <p className="text-2xl font-bold mb-4">Products</p>
          {products.length === 0 ? (
            <p className="text-gray-300">No products found. Create one above!</p>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {products.map((product) => (
                <div key={product.product_id} className="bg-[#7A4D99] rounded-lg p-4">
                  <p>Product Name: {product.product_name}</p>
                  <p>Price: ${product.price}</p>
                  <p>Stock: {product.stock}</p>
                  <p className="text-gray-400 text-sm">Created At: {product.created_at}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
