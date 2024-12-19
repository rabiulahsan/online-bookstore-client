const FeaturedSection = () => {
  return (
    <div className="py-[5%]">
      <div className="flex items-center justify-center my-[4%] gap-x-[8%]">
        <span className="flex-grow h-[3px] bg-gradient-to-r from-transparent to-rose-600"></span>
        <span className="font-bold text-3xl mx-4 bg-gradient-to-r from-rose-600 via-pink-500 to-slate-600 bg-clip-text text-transparent">
          Featured Books
        </span>
      </div>
    </div>
  );
};

export default FeaturedSection;
