import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/HomePage/Home/Home";
import CreateAccount from "../Pages/LoginFunction/CreateAccount/CreateAccount";
import UserLogin from "../Pages/LoginFunction/UserLogin/UserLogin";
import UserSignup from "../Pages/LoginFunction/UserLogin/UserSignup";
import AuthorSignup from "../Pages/LoginFunction/AuthorLogin/AuthorSignup";
import AuthorLogin from "../Pages/LoginFunction/AuthorLogin/AuthorLogin";
import AdminPage from "../Pages/AdminPage/AdminPage";
import BookPage from "../Pages/BookPage/BookPage";

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
        path: "/master-admin-login",
        element: <AdminPage></AdminPage>,
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
]);
