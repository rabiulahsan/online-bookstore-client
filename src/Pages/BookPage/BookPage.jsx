import { useState } from "react";
import StaggerAnimation from "../../Components/StaggerAnimation/StaggerAnimation";
import useGetAllBooks from "../../Hooks/useGetAllBooks/useGetAllBooks";

//todo skeleton animation added for the loading books

const BookPage = () => {
  const [allBooks, isLoading] = useGetAllBooks();
  console.log(allBooks);

  const [sort, setSort] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [discount, setDiscount] = useState("");

  const categories = [
    "Adventure",
    "Mystery",
    "Thriller",
    "Romance",
    "Science Fiction",
    "Fantasy",
  ];

  const discounts = ["10-25%", "25%+"];

  const toggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };
  return (
    <div className="bg-slate-100 px-[5%]">
      {/* book page header section  */}
      <div className="flex items-center justify-center py-[2%] gap-x-[4%]">
        <span className="flex-grow h-[3px] bg-gradient-to-r from-rose-600 to-transparent"></span>
        <span className="font-bold text-3xl mx-4 bg-gradient-to-r from-rose-600 via-pink-500 to-slate-600 bg-clip-text text-transparent">
          <StaggerAnimation
            text={"Browse Through Our Books"}
          ></StaggerAnimation>
        </span>
        <span className="flex-grow h-[3px] bg-gradient-to-r from-rose-600 to-transparent"></span>
      </div>

      {/* all books */}

      <div className=" flex items-center gap-x-4 px-[5%]">
        {/* left side  */}

        <div className="p-[4%] w-[30%]   border-r border-slate-300">
          <div className="mb-4">
            <label className="block text-slate-500 font-bold text-lg mb-2">
              Sort by:
            </label>
            <div className="px-5">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="border border-slate-300 w-full  bg-transparent rounded-sm px-5 py-3 text-slate-600 font-semibold"
              >
                <option value="">Select</option>
                <option value="lowToHigh">Price: Low to High</option>
                <option value="highToLow">Price: High to Low</option>
              </select>
            </div>
          </div>

          <div className="mb-4 ">
            <label className="block text-slate-500 font-bold text-lg mb-2">
              Filter by:
            </label>

            {/* Category Filter */}
            <div className="mb-4 px-4">
              <p className="font-semibold text-slate-600 mb-2">Category</p>
              {categories.map((category) => (
                <label key={category} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => toggleCategory(category)}
                    className="w-4 h-4 text-rose-600 border-gray-300 rounded focus:ring-rose-500"
                  />
                  <span className="ml-2 text-slate-600">{category}</span>
                </label>
              ))}
            </div>

            {/* Discount Filter */}
            <div className="px-5">
              <p className="font-semibold text-gray-600 mb-2">Discount</p>
              {discounts.map((d) => (
                <label key={d} className="flex items-center mb-2">
                  <input
                    type="radio"
                    name="discount"
                    value={d}
                    checked={discount === d}
                    onChange={() => setDiscount(d)}
                    className="w-5 h-5 p-1 "
                  />
                  <span className="ml-2 text-gray-700">{d}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* right side  */}
        <div className="w-[70%] border border-slate-500">he</div>
      </div>
    </div>
  );
};

export default BookPage;
