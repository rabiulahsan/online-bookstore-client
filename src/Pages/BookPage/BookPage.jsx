import { useEffect, useState } from "react";
import StaggerAnimation from "../../Components/StaggerAnimation/StaggerAnimation";
import useGetAllBooks from "../../Hooks/useGetAllBooks/useGetAllBooks";
import { MdOutlineCancel } from "react-icons/md";
import BookPageCard from "./BookPageCard";
import useGetCart from "../../Hooks/useGetCart/useGetCart";
import useGetFav from "../../Hooks/useGetFav/useGetFav";
import useVerifyUser from "../../Hooks/useVerifyUser/useVerifyUser";

//todo skeleton animation added for the loading books

const BookPage = () => {
  const [allBooks, isAllBookLoading] = useGetAllBooks(); // Assuming useGetAllBooks is a custom hook
  const [categoriesBook, setCategoriesBook] = useState([]);
  const [sort, setSort] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [discount, setDiscount] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [isUser] = useVerifyUser();
  const [, , cartDataId] = useGetCart();
  const [, , favArray] = useGetFav();

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
            return bookDiscount > 0; // Return only books with a discount greater than 0
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

  // Function to handle search input
  const handleSearch = (e) => {
    setSearchInput(e.target.value); // Update the search input
  };

  //logic for category filter
  const toggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  //logic for clear button
  const handleClear = () => {
    setSelectedCategories([]);
    setSearchInput("");
    setDiscount("");
    setSort("");
    setCategoriesBook(allBooks); // Reset to all books
  };

  //logic for category cancel
  const handleCategoryCancel = (category) => {
    setSelectedCategories(selectedCategories.filter((c) => c !== category));
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
      <div className=" flex items-center justify-center gap-x-5  w-[75%] mx-auto mb-4">
        <div className="w-1/2">
          {/* Search Icon and Input */}

          <input
            type="text"
            placeholder="Search your book..."
            value={searchInput}
            onChange={handleSearch}
            className="w-full outline-none bg-transparent text-slate-700 border-2 border-slate-200 rounded-sm  shadow-sm py-2 px-4 "
            // onKeyDown={handleSearch}
          />
        </div>
        <div className="">
          <button
            onClick={handleClear}
            className="font-semibold text-white bg-rose-500 hover:bg-rose-600 px-5 py-2 rounded-sm"
          >
            Clear All
          </button>
        </div>
      </div>
      <div className=" flex  gap-x-4 px-[3%] py-[2%]">
        {/* left side  */}

        <div className="px-[4%] w-[25%]   border-r border-slate-300 ">
          <div className="flex items-center justify-center gap-x-2 px-4 py-2 mb-5 border border-slate-200 bg-transparent shadow-md rounded-sm text-slate-600 backdrop-blur-md">
            <p className="">Total Books:</p>
            <p className="text-lg font-bold text-slate-600">
              {categoriesBook?.length}
            </p>
          </div>
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

            {/* Discount Filter */}
            <div className="px-5 py-4">
              <label className="flex items-center mb-2">
                <input
                  type="checkbox"
                  checked={discount} // Bind to the discount state
                  onChange={() => setDiscount(!discount)} // Toggle discount state
                  className="w-5 h-5 p-1"
                />
                <span className="ml-2 text-slate-600 font-semibold">
                  Discount Books
                </span>
              </label>
            </div>

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
          </div>
        </div>

        {/* right side  */}
        <div className="w-[75%] ">
          <div className="flex items-center gap-x-3 flex-wrap w-[90%] mx-auto mb-[6%]">
            {selectedCategories.length > 0 &&
              selectedCategories.map((category, i) => (
                <p
                  key={i}
                  onClick={() => handleCategoryCancel(category)}
                  className="flex items-center gap-x-2 px-4 py-2 rounded-sm bg-slate-200 text-slate-700 font-semibold cursor-pointer hover:bg-slate-300"
                >
                  <span className="flex items-center leading-none">
                    {category}
                  </span>
                  <span className="flex items-center justify-center">
                    <MdOutlineCancel className="text-lg" />
                  </span>
                </p>
              ))}
          </div>
          {isAllBookLoading ? (
            <p>Loading....</p>
          ) : (
            <div className="grid  gap-y-12 gap-x-4 grid-cols-1 lg:grid-cols-3 px-[5%] my-[4%] ">
              {categoriesBook.map((book) => (
                <BookPageCard
                  key={book?._id}
                  book={book}
                  cartDataId={cartDataId}
                  favArray={favArray}
                  isUser={isUser}
                ></BookPageCard>
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
