import { useState, useEffect } from "react";
import axios from "axios";

export default function ReviewsPage() {
  const [userId, setUserId] = useState("");
  const [productId, setProductId] = useState("");
  const [rating, setRating] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get("http://localhost:4000/reviews");
        setReviews(response.data);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.error || "An error occurred while fetching reviews.");
      }
    };

    fetchReviews();
  }, []);

  const handleCreateReview = async () => {
    if (!userId || !productId || !rating) {
      setError("User ID, Product ID, and Rating are required.");
      return;
    }

    if (rating < 1 || rating > 5) {
      setError("Rating must be between 1 and 5.");
      return;
    }

    try {
      await axios.post("http://localhost:4000/reviews", {
        user_id: userId,
        product_id: productId,
        rating,
        review_text: reviewText,
      });

      setUserId("");
      setProductId("");
      setRating("");
      setReviewText("");
      setError(null);

      const response = await axios.get("http://localhost:4000/reviews");
      setReviews(response.data);
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred while creating the review.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-800 p-6 shadow-lg">
        <h2 className="text-yellow-500 text-3xl font-bold mb-8">Dashboard</h2>
        <nav className="flex flex-col space-y-4">
          <a href="http://localhost:3000" className="text-yellow-500 text-xl hover:text-yellow-400 transition duration-300">Users</a>
          <a href="" className="text-yellow-500 text-xl hover:text-yellow-400 transition duration-300">Reviews</a>
          <a href="http://localhost:3000/products" className="text-yellow-500 text-xl hover:text-yellow-400 transition duration-300">Products</a>
          <a href="http://localhost:3000/orders" className="text-yellow-500 text-xl hover:text-yellow-400 transition duration-300">Orders</a>
          <a href="http://localhost:3000/categories" className="text-yellow-500 text-xl hover:text-yellow-400 transition duration-300">Categories</a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-8 overflow-y-auto">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Create Review Form */}
          <div className="bg-gray-800 rounded-xl w-full lg:w-1/2 p-8 shadow-2xl hover:shadow-xl transition duration-300">
            <p className="text-3xl font-semibold text-yellow-500 mb-8 text-center">Add Review</p>
            <div className="space-y-6">
              <input
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="User ID"
                className="w-full p-5 bg-gray-700 text-white border border-gray-600 rounded-xl focus:ring-2 focus:ring-yellow-500"
              />
              <input
                type="text"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                placeholder="Product ID"
                className="w-full p-5 bg-gray-700 text-white border border-gray-600 rounded-xl focus:ring-2 focus:ring-yellow-500"
              />
              <input
                type="number"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                placeholder="Rating (1-5)"
                className="w-full p-5 bg-gray-700 text-white border border-gray-600 rounded-xl focus:ring-2 focus:ring-yellow-500"
              />
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Review Text"
                className="w-full p-5 bg-gray-700 text-white border border-gray-600 rounded-xl focus:ring-2 focus:ring-yellow-500"
              />
              <button
                onClick={handleCreateReview}
                className="w-full bg-yellow-500 text-gray-900 py-4 rounded-xl hover:bg-yellow-600 transition duration-300"
              >
                Create Review
              </button>
            </div>
            {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}
          </div>

          {/* Reviews List */}
          <div className="bg-gray-800 rounded-xl w-full lg:w-1/2 p-8 shadow-2xl hover:shadow-xl transition duration-300">
            <p className="text-3xl font-semibold text-yellow-500 mb-8 text-center">Reviews</p>
            {reviews.length === 0 ? (
              <p className="text-gray-400 text-center">No reviews found. Create one above!</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {reviews.map((review) => (
                  <div
                    key={review.review_id}
                    className="bg-gray-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition duration-300"
                  >
                    <p className="text-yellow-500 font-semibold">User ID: {review.user_id}</p>
                    <p className="text-yellow-500">Product ID: {review.product_id}</p>
                    <p className="text-yellow-500">Rating: {review.rating}</p>
                    <p className="text-gray-400">Review: {review.review_text}</p>
                    <p className="text-gray-400 text-sm mt-2">Created At: {review.created_at}</p>
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
