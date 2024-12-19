//todo change the books
//todo add gsap on books

import { Link } from "react-router-dom";

const DiscountSection = () => {
  return (
    <div className="flex justify-between items-center bg-slate-100 py-[5%] w-[70%] mx-auto">
      {/* Books Section */}
      <div className="flex justify-center items-center bg-slate-100  relative gap-x-10 py-8">
        {/* First Book */}
        <img
          src="https://i.pinimg.com/564x/f7/c8/12/f7c812c9b0296cd9f119e33a06d9a256.jpg"
          alt=""
          className="w-48 h-[300px] transform rotate-[-10deg] shadow-[-8px_8px_10px_rgba(0,0,0,0.5)]"
        />
        {/* Second Book */}
        <img
          src="https://marketplace.canva.com/EAFf0E5urqk/1/0/1003w/canva-blue-and-green-surreal-fiction-book-cover-53S3IzrNxvY.jpg"
          alt=""
          className="w-48 h-[300px] transform rotate-[10deg] -translate-x-8 shadow-[-8px_8px_10px_rgba(0,0,0,0.5)]"
        />
      </div>

      {/* Text Section */}
      <div className="max-w-md text-center">
        <h2 className="text-3xl font-bold text-slate-600 mb-4">
          Up To 50% Discount
        </h2>
        <p className="text-gray-600 mb-6">
          Take advantage of the discount days we have for you, buy books from
          your favorite writers. The more you buy, the more discounts we have
          for you.
        </p>
        <Link to="/discount">
          <button className="bg-rose-500 text-white py-2 px-6 rounded-sm font-semibold hover:bg-rose-600">
            Buy Now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default DiscountSection;
