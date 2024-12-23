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
import AuthorDashboard from "../Pages/AuthorDashboard/AuthorDashboard/AuthorDashboard";
import AuthorMybook from "../Pages/AuthorDashboard/AuthorMybook/AuthorMybook";
import AuthorNewbook from "../Pages/AuthorDashboard/AuthorNewbook/AuthorNewbook";
import DashboardProfilePage from "../Pages/AdminDashboard/DashboardProfilePage/DashboardProfilePage";
import AdminAllAuthor from "../Pages/AdminDashboard/AdminAllAuthor/AdminAllAuthor";
import CartPage from "../Pages/CartPage/CartPage";
import CartProvider from "../Providers/CartProvider";

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
        element: (
          <CartProvider>
            <BookPage></BookPage>,
          </CartProvider>
        ),
      },
      {
        path: "/favourites",
        element: <FavouritePage></FavouritePage>,
      },
      {
        path: "/books/:bookId",
        element: (
          <CartProvider>
            <BookPageSingle></BookPageSingle>
          </CartProvider>
        ),

        loader: ({ params }) => {
          return fetch(
            `http://localhost:5000/api/books/getsinglebook/${params.bookId}`
          );
        },
      },
      {
        path: "/cart",
        element: (
          <CartProvider>
            <CartPage></CartPage>
          </CartProvider>
        ),
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
      {
        path: "/dashboard/author/mybook",
        element: <AuthorMybook></AuthorMybook>,
      },
      {
        path: "/dashboard/author/newbook",
        element: <AuthorNewbook></AuthorNewbook>,
      },
      {
        path: "/dashboard/admin/profile",
        element: <DashboardProfilePage></DashboardProfilePage>,
      },
      {
        path: "/dashboard/admin/allauthors",
        element: <AdminAllAuthor></AdminAllAuthor>,
      },
      {
        path: "/dashboard/admin/allbooks",
        element: <AuthorNewbook></AuthorNewbook>,
      },
      {
        path: "/dashboard/admin/allusers",
        element: <AuthorNewbook></AuthorNewbook>,
      },
    ],
  },
]);
