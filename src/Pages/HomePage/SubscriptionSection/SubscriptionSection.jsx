const SubscriptionSection = () => {
  return (
    <div className=" bg-slate-100 p-[5%] flex justify-center items-center w-1/2 mx-auto text-center">
      <div className="">
        <img src="/letter.png" alt="" className="w-[100px] mx-auto" />
        <p className="font-bold text-4xl my-4 bg-gradient-to-r from-rose-600 via-pink-500 to-slate-600 bg-clip-text text-transparent">
          Subscribe Us!
        </p>

        <p className="text-gray-600 leading-7 text-sm">
          Join our subscription to stay updated with the latest news, exclusive
          offers, and personalized insights. Enjoy premium access to curated
          content and special deals delivered straight to your inbox. Your
          journey to smarter choices begins here!
        </p>
        <form className="flex gap-x-4 mt-6 w-full max-w-md mx-auto mb-[5%]">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 border-2 border-gray-300 rounded-sm px-4 py-2 bg-slate-200 focus:outline-none "
            required
          />
          <button
            type="submit"
            className="bg-rose-500 text-white font-semibold px-6 py-2 rounded-sm hover:bg-rose-600 transition-all"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubscriptionSection;
