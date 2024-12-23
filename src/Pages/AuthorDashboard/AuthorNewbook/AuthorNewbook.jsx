import { useForm } from "react-hook-form";
import useLoggedUser from "../../../Hooks/useLoggedUser/useLoggedUser";
import useAxiosSecure from "../../../Hooks/useAxiosSecure/useAxiosSecure";
import useVerifyAuthor from "../../../Hooks/useVerifyAuthor/useVerifyAuthor";

const AuthorNewbook = () => {
  const [loggedUser] = useLoggedUser();
  const [axiosSecure] = useAxiosSecure();
  const [isAuthor] = useVerifyAuthor();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // Convert tags to an array
    const tagsArray = data.tags.split(",").map((tag) => tag.trim());
    const authorsArray = data.author.split(",").map((tag) => tag.trim());
    const categoriesArray = data.category;
    const newDiscount = Number(data.discount) + "%";
    const newRating = {
      average: 0,
      reviews_count: 0,
    };

    const newBook = {
      ...data,
      author: authorsArray,
      language: "English",
      authorId: loggedUser?._id,
      tags: tagsArray,
      category: categoriesArray,
      discount: newDiscount,
      rating: newRating,
    };

    try {
      if (isAuthor) {
        const result = await axiosSecure.post(
          `http://localhost:5000/api/books/postbook/`,
          newBook
        );
        reset();
        console.log("Book has been added successfully:", result.data.data);
      }
    } catch (error) {
      console.log("Error Adding book:", error);
    }
  };
  return (
    <div className="bg-white my-[5%] p-[5%]">
      <p className="font-bold text-xl text-slate-500 mb-5">Create a new book</p>

      <form onSubmit={handleSubmit(onSubmit)} className="my-6 px-[5%]">
        <div className="grid gap-x-8 grid-cols-1 lg:grid-cols-2">
          {/* Title */}
          <div className="form-control w-full ">
            <label className="label   block font-semibold text-gray-700">
              Title
            </label>
            <input
              type="text"
              placeholder="Book Title"
              {...register("title", { required: true, maxLength: 100 })}
              className="input-style"
            />
            {errors.title && (
              <span className="text-red-600">Title is required</span>
            )}
          </div>

          {/* Image */}
          <div className="form-control w-full">
            <label className="label block  font-semibold text-gray-700">
              Image URL
            </label>
            <input
              type="text"
              placeholder="Image URL"
              {...register("image", { required: true })}
              className="input-style"
            />
            {errors.image && (
              <span className="text-red-600">Image URL is required</span>
            )}
          </div>

          {/* Authors */}
          <div className="form-control w-full">
            <label className="label block  font-semibold text-gray-700">
              Author(s)
            </label>
            <input
              type="text"
              placeholder="Author names (comma-separated)"
              {...register("author", { required: true })}
              className="input-style"
            />
            {errors.author && (
              <span className="text-red-600">Author(s) are required</span>
            )}
          </div>

          {/* ISBN */}
          <div className="form-control w-full">
            <label className="label block  font-semibold text-gray-700">
              ISBN
            </label>
            <input
              type="text"
              placeholder="ISBN Number"
              {...register("isbn", { required: true })}
              className="input-style"
            />
            {errors.isbn && (
              <span className="text-red-600">ISBN is required</span>
            )}
          </div>

          {/* Pages */}
          <div className="form-control w-full mb-4">
            <label className="label block text-gray-700 text-sm font-bold">
              <span className="label-text font-semibold">Pages</span>
            </label>
            <input
              type="number"
              placeholder="Number of Pages"
              {...register("pages", { required: true, min: 1 })}
              className="input-style"
            />
            {errors.pages && (
              <span className="text-red-600">Pages are required</span>
            )}
          </div>

          {/* Publisher */}
          <div className="form-control w-full">
            <label className="label block  font-semibold text-gray-700">
              Publisher
            </label>
            <input
              type="text"
              placeholder="Publisher Name"
              {...register("publisher", { required: true })}
              className="input-style"
            />
            {errors.publisher && (
              <span className="text-red-600">Publisher is required</span>
            )}
          </div>

          {/* Publication Date */}
          <div className="form-control w-full mb-4">
            <label className="label block text-gray-700 text-sm font-bold">
              <span className="label-text font-semibold">Publication Date</span>
            </label>
            <input
              type="date"
              {...register("publication_date", { required: true })}
              className="input-style"
            />
            {errors.publication_date && (
              <span className="text-red-600">Publication Date is required</span>
            )}
          </div>

          {/* Edition */}
          <div className="form-control w-full">
            <label className="label block  font-semibold text-gray-700">
              Edition
            </label>
            <input
              type="text"
              placeholder="Edition (e.g., 1st, 2nd)"
              {...register("edition", { required: true })}
              className="input-style"
            />
            {errors.edition && (
              <span className="text-red-600">Edition is required</span>
            )}
          </div>

          {/* Category (Multiple Choice) */}
          <div className="form-control w-full">
            <label className="label block font-semibold text-gray-700">
              Category (Select multiple)
            </label>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((category) => (
                <label key={category} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={category}
                    {...register("category", { required: true })}
                    className="checkbox checkbox-primary"
                  />
                  <span>{category}</span>
                </label>
              ))}
            </div>
            {errors.category && (
              <span className="text-red-600">
                At least one category is required
              </span>
            )}
          </div>

          {/* Tags */}
          <div className="form-control w-full">
            <label className="label block  font-semibold text-gray-700">
              Tags
            </label>
            <input
              type="text"
              placeholder="Tags (comma-separated)"
              {...register("tags", { required: true })}
              className="input-style"
            />
            {errors.tags && (
              <span className="text-red-600">Tags are required</span>
            )}
          </div>

          {/* Price */}
          <div className="form-control w-full">
            <label className="label block  font-semibold text-gray-700">
              Price
            </label>
            <input
              type="number"
              placeholder="Price"
              {...register("price", { required: true, min: 0 })}
              className="input-style"
            />
            {errors.price && (
              <span className="text-red-600">Price is required</span>
            )}
          </div>

          {/* Discount */}
          <div className="form-control w-full">
            <label className="label block  font-semibold text-gray-700">
              Discount
            </label>
            <input
              type="number"
              placeholder="Discount (%)"
              {...register("discount", { required: true, min: 0, max: 100 })}
              className="input-style"
            />
            {errors.discount && (
              <span className="text-red-600">
                Discount should be between 0 and 100
              </span>
            )}
          </div>

          {/* Description */}
          <div className="form-control w-full">
            <label className="label block  font-semibold text-gray-700">
              Description
            </label>
            <textarea
              placeholder="Short description of the book"
              {...register("description", { required: true })}
              className="textarea textarea-bordered input-style"
            ></textarea>
            {errors.description && (
              <span className="text-red-600">Description is required</span>
            )}
          </div>
        </div>
        <button
          type="submit"
          className="bg-slate-600 text-white px-6 py-3 mt-6 rounded font-semibold hover:bg-slate-700"
        >
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AuthorNewbook;

const categories = [
  "Adventure",
  "Mystery",
  "Thriller",
  "Romance",
  "Science Fiction",
  "Fantasy",
];
