const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="">
        <img src="/error.png" alt="" className="w-[400px] mx-auto" />
        <p className="text-center font-bold text-4xl my-4 bg-gradient-to-r from-rose-600 via-pink-500 to-slate-600 bg-clip-text text-transparent">
          There is nothing on this page
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;
