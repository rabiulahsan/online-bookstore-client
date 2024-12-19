import adventure from "../../../../public/adventure-book.png";
import fantasy from "../../../../public/fantasy-book.png";
import mystry from "../../../../public/mystery-book.png";
import romance from "../../../../public/romance-book.png";
import science_fiction from "../../../../public/science-fiction-book.png";
import thriller from "../../../../public/thriller-book.png";

const CategorySection = () => {
  return (
    <div className="">
      <p className="font-bold text-slate-600 text-3xl mb-[4%] text-center ">
        Categories of Books
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10 w-[60%] mx-auto">
        {categories.map((cat) => (
          <div
            className={`rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 px-6 py-4 text-center ${
              cat.color === "green"
                ? "bg-green-100 hover:bg-green-200"
                : cat.color === "sky"
                ? "bg-sky-100 hover:bg-sky-200"
                : cat.color === "rose"
                ? "bg-rose-100 hover:bg-rose-200"
                : cat.color === "slate"
                ? "bg-slate-100 hover:bg-slate-200"
                : cat.color === "orange"
                ? "bg-orange-100 hover:bg-orange-200"
                : cat.color === "purple"
                ? "bg-purple-100 hover:bg-purple-200"
                : ""
            }`}
            key={cat.img}
          >
            <img
              src={cat.img}
              alt={cat.name}
              className="h-16 w-16 object-contain text-center mx-auto mb-4"
            />
            <p className="font-bold text-slate-600 text-lg">{cat.name}</p>
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
