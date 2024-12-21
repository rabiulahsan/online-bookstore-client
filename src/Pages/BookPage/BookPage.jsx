import { useEffect, useState } from "react";
import StaggerAnimation from "../../Components/StaggerAnimation/StaggerAnimation";
import useGetAllBooks from "../../Hooks/useGetAllBooks/useGetAllBooks";

import BookPageCard from "./BookPageCard";

//todo skeleton animation added for the loading books

const BookPage = () => {
  const [allBooks, isLoading] = useGetAllBooks(); // Assuming useGetAllBooks is a custom hook
  const [categoriesBook, setCategoriesBook] = useState([]);
  const [sort, setSort] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [discount, setDiscount] = useState("");
  const [searchInput, setSearchInput] = useState("");

  // Function to fetch and filter books
  useEffect(() => {
    const fetchAndFilterBooks = async () => {
      try {
        let books = allBooks || []; // Default to all books

        // Filter by selected categories
        if (selectedCategories.length > 0) {
          const categoriesQuery = selectedCategories.join(",");
          const response = await fetch(
            `http://localhost:5000/api/books/category?categories=${categoriesQuery}`
          );
          const data = await response.json();
          books = data.data; // Update books based on categories
        }

        // Filter by discount
        if (discount) {
          books = books.filter((book) => {
            const bookDiscount = parseInt(book.discount.replace("%", ""), 10);
            if (discount === "b") {
              return bookDiscount >= 25;
            } else if (discount === "a") {
              return bookDiscount >= 10 && bookDiscount < 25;
            }
            return true; // Default case
          });
        }

        // Sort by price
        if (sort === "lowToHigh") {
          books = books.sort((a, b) => a.price - b.price);
        } else if (sort === "highToLow") {
          books = books.sort((a, b) => b.price - a.price);
        }

        // Filter by search input
        if (searchInput.trim() !== "") {
          books = books.filter((book) =>
            book.title.toLowerCase().includes(searchInput.toLowerCase())
          );
        }

        setCategoriesBook(books); // Update the filtered and sorted list
      } catch (error) {
        console.error("Error fetching, filtering, or sorting books:", error);
      }
    };

    fetchAndFilterBooks();
  }, [allBooks, selectedCategories, discount, sort, searchInput]); // Trigger when any dependency changes

  const handleSearch = (e) => {
    setSearchInput(e.target.value); // Update the search input
  };

  const toggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleClear = () => {
    setSelectedCategories([]);
    setSearchInput("");
    setDiscount("");
    setSort("");
    setCategoriesBook(allBooks); // Reset to all books
  };

  return (
    <div className="bg-slate-100 px-[4%]">
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

      {/* search bar  */}
      <div className="">
        <div className="">
          {/* Search Icon and Input */}

          <input
            type="text"
            placeholder="Search your doctor..."
            value={searchInput}
            onChange={handleSearch}
            className="w-[400px] outline-none text-slate-700 border border-slate-300 rounded-sm  shadow-sm py-[10px] px-4 "
            // onKeyDown={handleSearch}
          />

          {/* Search Button */}
          {/* <button
            onClick={handleSearch}
            className=" text-white font-semibold px-6 py-[10px] ml-5 bg-green-600 hover:bg-green-700 transition rounded-sm"
          >
            Search
          </button> */}
        </div>
        <div className="">
          <button
            onClick={handleClear}
            className="font-semibold text-white bg-slate-600 hover:bg-slate-700 px-5 py-3 rounded-sm"
          >
            Clear All
          </button>
        </div>
      </div>
      <div className=" flex  gap-x-4 px-[3%] py-[2%]">
        {/* left side  */}

        <div className="p-[4%] w-[25%]   border-r border-slate-300 ">
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
                <option value="">Default</option>
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
                <label key={d.value} className="flex items-center mb-2">
                  <input
                    type="radio"
                    name="discount"
                    value={d.value}
                    checked={discount === d.value}
                    onChange={() => setDiscount(d.value)}
                    className="w-5 h-5 p-1 "
                  />
                  <span className="ml-2 text-slate-600 font-semibold">
                    {d.show}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* right side  */}
        <div className="w-[75%] ">
          {isLoading ? (
            <p>Loading....</p>
          ) : (
            <div className="grid  gap-y-12 grid-cols-1 lg:grid-cols-3 px-[5%] my-[4%] ">
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

const discounts = [
  { show: "25% +", value: "b" },
  { show: "10% - 25%", value: "a" },
];
