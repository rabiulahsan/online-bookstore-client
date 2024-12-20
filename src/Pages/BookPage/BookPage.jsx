import useGetAllBooks from "../../Hooks/useGetAllBooks/useGetAllBooks";

const BookPage = () => {
  const [allBooks, isLoading] = useGetAllBooks();
  console.log(allBooks);
  return <div></div>;
};

export default BookPage;
