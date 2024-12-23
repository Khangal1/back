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
        const response = await axios.get("http://localhost:3003/reviews");
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
      await axios.post("http://localhost:3003/reviews", {
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

      const response = await axios.get("http://localhost:3003/reviews");
      setReviews(response.data);
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred while creating the review.");
    }
  };

  return (
    <div className="h-full bg-[#4B2E83] text-white flex flex-col items-center">
      <header className="w-full bg-[#4B2E83] py-4 px-8 flex justify-center shadow-md">
        <nav className="flex space-x-6">
          <a href="http://localhost:3000" className="text-white bg-[#4B2E83] hover:bg-[#7A4D99] py-2 px-4 rounded-lg">
            Users
          </a>
          <a href="" className="text-white bg-[#4B2E83] hover:bg-[#7A4D99] py-2 px-4 rounded-lg">
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
          <p className="text-2xl font-bold mb-4">Add Review</p>
          <div className="space-y-4">
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="Enter user ID"
              className="w-full p-3 border border-[#7A4D99] rounded-lg bg-[#3A1F56] text-white focus:outline-none focus:ring-2 focus:ring-[#C1A0D6]"
            />
            <input
              type="text"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              placeholder="Enter product ID"
              className="w-full p-3 border border-[#7A4D99] rounded-lg bg-[#3A1F56] text-white focus:outline-none focus:ring-2 focus:ring-[#C1A0D6]"
            />
            <input
              type="number"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              placeholder="Enter rating (1-5)"
              className="w-full p-3 border border-[#7A4D99] rounded-lg bg-[#3A1F56] text-white focus:outline-none focus:ring-2 focus:ring-[#C1A0D6]"
            />
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Enter review text"
              className="w-full p-3 border border-[#7A4D99] rounded-lg bg-[#3A1F56] text-white focus:outline-none focus:ring-2 focus:ring-[#C1A0D6]"
            />
            <button
              onClick={handleCreateReview}
              className="w-full bg-[#7A4D99] text-white py-3 rounded-lg hover:bg-[#9B7BBF] transition duration-300"
            >
              Create Review
            </button>
          </div>
        </div>


        <div className="w-2/3 bg-[#3A1F56] rounded-lg shadow-lg p-6">
          <p className="text-2xl font-bold mb-4">Reviews</p>
          {reviews.length === 0 ? (
            <p className="text-gray-300">No reviews found. Create one above!</p>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {reviews.map((review) => (
                <div key={review.review_id} className="bg-[#7A4D99] rounded-lg p-4">
                  <p>
                    User ID:{review.user_id}
                  </p>
                  <p>
                    Product ID:{review.product_id}
                  </p>
                  <p>
                    Rating: {review.rating}
                  </p>
                  <p>
                    Review Text:{review.review_text}
                  </p>
                  <p className="text-gray-400 text-sm">
                    Created At: {review.created_at}
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
