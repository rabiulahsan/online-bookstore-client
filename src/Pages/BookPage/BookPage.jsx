import { useEffect, useState } from "react";
import StaggerAnimation from "../../Components/StaggerAnimation/StaggerAnimation";
import useGetAllBooks from "../../Hooks/useGetAllBooks/useGetAllBooks";

import BookPageCard from "./BookPageCard";

//todo skeleton animation added for the loading books

const BookPage = () => {
  const [allBooks, isLoading] = useGetAllBooks();
  //   console.log(allBooks);
  const [categoriesBook, setCategoriesBook] = useState([]);

  const [sort, setSort] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [discount, setDiscount] = useState("");

  // Fetch books when categories
  useEffect(() => {
    const fetchCategorizedBooks = async () => {
      if (selectedCategories.length === 0) {
        setCategoriesBook(allBooks || []); // Reset to all books or empty array if no books are loaded
        return;
      }

      try {
        const categoriesQuery = selectedCategories.join(",");
        console.log(categoriesQuery);
        const response = await fetch(
          `http://localhost:5000/api/books/category?categories=${categoriesQuery}`
        );

        // Await the response JSON
        const data = await response.json();
        console.log(data); // Log the data to ensure it's structured correctly
        setCategoriesBook(data.data); // Update books with fetched data
      } catch (error) {
        console.error("Error fetching categorized books:", error);
      }
    };

    fetchCategorizedBooks();
  }, [selectedCategories, allBooks]); // Refetch when selectedCategories changes

  //   console.log(categoriesBook);

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
      <div className="flex items-center justify-center py-[2%] gap-x-[2%]">
        <span className="flex-grow h-[3px] bg-gradient-to-r from-transparent to-rose-500"></span>
        <span className="font-bold text-3xl mx-4 bg-gradient-to-r from-rose-600 via-pink-500 to-slate-600 bg-clip-text text-transparent">
          <StaggerAnimation
            text={"Browse Through Our Books"}
          ></StaggerAnimation>
        </span>
        <span className="flex-grow h-[3px] bg-gradient-to-r from-rose-600 to-transparent"></span>
      </div>

      {/* all books */}

      <div className=" flex  gap-x-4 px-[5%]">
        {/* left side  */}

        <div className="p-[4%] w-[30%]   border-r border-slate-300">
          <div className="mb-4">
            <label className="block text-slate-500 font-bold text-lg mb-2">
              Sort by :
            </label>
            <div className="px-5">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="border border-slate-200 w-full  bg-transparent rounded-sm px-5 py-3 text-slate-600 font-semibold"
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
                    className="w-4 h-4"
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
        <div className="w-[70%] border border-slate-500">
          {isLoading ? (
            <p>Loading....</p>
          ) : (
            <div className="grid gap-x-9 gap-y-7 grid-cols-1 lg:grid-cols-3 px-[8%] my-[4%] ">
              {categoriesBook.map((book) => (
                <BookPageCard key={book?._id} book={book}></BookPageCard>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookPage;

const categories = [
  "Adventure",
  "Mystery",
  "Thriller",
  "Romance",
  "Science Fiction",
  "Fantasy",
];
