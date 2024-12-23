import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/HomePage/Home/Home";
import CreateAccount from "../Pages/LoginFunction/CreateAccount/CreateAccount";
import UserLogin from "../Pages/LoginFunction/UserLogin/UserLogin";
import UserSignup from "../Pages/LoginFunction/UserLogin/UserSignup";
import AuthorSignup from "../Pages/LoginFunction/AuthorLogin/AuthorSignup";
import AuthorLogin from "../Pages/LoginFunction/AuthorLogin/AuthorLogin";
import AdminLogin from "../Pages/LoginFunction/AdminLogin/AdminLogin";
import BookPage from "../Pages/BookPage/BookPage";
import FavouritePage from "../Pages/FavouritePage/FavouritePage";
import BookPageSingle from "../Pages/BookPageSingle/BookPageSingle";
import DashboardLayout from "../Layouts/DashboardLayout";
import AuthorDashboard from "../Pages/AuthorDashboard/AuthorDashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    // errorElement:
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/books",
        element: <BookPage></BookPage>,
      },
      {
        path: "/favourites",
        element: <FavouritePage></FavouritePage>,
      },
      {
        path: "/books/:bookId",
        element: <BookPageSingle></BookPageSingle>,
        loader: ({ params }) => {
          return fetch(
            `http://localhost:5000/api/books/getsinglebook/${params.bookId}`
          );
        },
      },
      {
        path: "/master-admin-login",
        element: <AdminLogin></AdminLogin>,
      },
      {
        path: "/create-account",
        element: <CreateAccount></CreateAccount>,
      },
      {
        path: "/user/login",
        element: <UserLogin></UserLogin>,
      },
      {
        path: "/user/signup",
        element: <UserSignup></UserSignup>,
      },
      {
        path: "/author/signup",
        element: <AuthorSignup></AuthorSignup>,
      },
      {
        path: "/author/login",
        element: <AuthorLogin></AuthorLogin>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout></DashboardLayout>,
    children: [
      {
        path: "/dashboard/author/profile",
        element: <AuthorDashboard></AuthorDashboard>,
      },
    ],
  },
]);
