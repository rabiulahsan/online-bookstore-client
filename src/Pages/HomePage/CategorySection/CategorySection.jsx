import { Link } from "react-router-dom";
import adventure from "../../../../public/adventure-book.png";
import fantasy from "../../../../public/fantasy-book.png";
import mystry from "../../../../public/mystery-book.png";
import romance from "../../../../public/romance-book.png";
import science_fiction from "../../../../public/science-fiction-book.png";
import thriller from "../../../../public/thriller-book.png";

const CategorySection = () => {
  return (
    <div className="">
      <div className="flex items-center justify-center my-[4%] gap-x-[8%]">
        <span className="font-bold text-3xl mx-4 bg-gradient-to-r from-rose-600 via-pink-500 to-slate-600 bg-clip-text text-transparent">
          Categories of Books
        </span>
        <span className="flex-grow h-[3px] bg-gradient-to-r from-rose-600 to-transparent"></span>
      </div>

      <div className="flex justify-between items-center w-[100%] mx-auto">
        {categories.map((cat) => (
          <div className="flex-1 mx-2" key={cat.img}>
            <Link to="/books" className="block">
              <div
                className={`group flex flex-col items-center justify-center rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-7 text-center ${
                  cat.color === "green"
                    ? "bg-green-100 hover:bg-green-200"
                    : cat.color === "sky"
                    ? "bg-sky-100 hover:bg-sky-200"
                    : cat.color === "rose"
                    ? "bg-rose-100 hover:bg-rose-200"
                    : cat.color === "slate"
                    ? "bg-slate-200 hover:bg-slate-300"
                    : cat.color === "orange"
                    ? "bg-orange-100 hover:bg-orange-200"
                    : cat.color === "purple"
                    ? "bg-purple-100 hover:bg-purple-200"
                    : ""
                }`}
              >
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="h-16 w-16 object-contain mb-3 transform group-hover:-translate-y-4 transition-transform duration-300"
                />
                <p className="font-bold text-slate-600 text-lg">{cat.name}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;

const categories = [
  {
    img: adventure,
    name: "Adventure",
    color: "green",
  },
  {
    img: fantasy,
    name: "Fantasy",
    color: "sky",
  },
  {
    img: romance,
    name: "Romance",
    color: "rose",
  },
  {
    img: thriller,
    name: "Thriller",
    color: "slate",
  },
  {
    img: mystry,
    name: "Mystery",
    color: "orange",
  },
  {
    img: science_fiction,
    name: "Science Fiction",
    color: "purple",
  },
];
