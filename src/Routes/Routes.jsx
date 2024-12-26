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
import AdminAllUser from "../Pages/AdminDashboard/AdminAllUser/AdminAllUser";
import AdminAllBooks from "../Pages/AdminDashboard/AdminAllBooks/AdminAllBooks";
import AuthorBookUpdate from "../Pages/AuthorDashboard/AuthorBookUpdate/AuthorBookUpdate";
import ErrorPage from "../Components/ErrorPage/ErrorPage";
import UserPrivate from "../Components/PrivateRoutes/UserPrivate";
import AuthorPrivate from "../Components/PrivateRoutes/AuthorPrivate";
import AdminPrivate from "../Components/PrivateRoutes/AdminPrivate";
import PrivateLogin from "../Components/PrivateRoutes/PrivateLogin";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
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
            `https://online-bookstore-server.vercel.app/api/books/getsinglebook/${params.bookId}`
          );
        },
      },
      {
        path: "/cart",
        element: (
          <UserPrivate>
            <CartPage></CartPage>,
          </UserPrivate>
        ),
      },
      {
        path: "/master-admin-login",
        element: (
          <PrivateLogin>
            <AdminLogin></AdminLogin>,
          </PrivateLogin>
        ),
      },
      {
        path: "/create-account",
        element: (
          <PrivateLogin>
            <CreateAccount></CreateAccount>,
          </PrivateLogin>
        ),
      },
      {
        path: "/user/login",
        element: (
          <PrivateLogin>
            <UserLogin></UserLogin>,
          </PrivateLogin>
        ),
      },
      {
        path: "/user/signup",
        element: (
          <PrivateLogin>
            <UserSignup></UserSignup>,
          </PrivateLogin>
        ),
      },
      {
        path: "/author/signup",
        element: (
          <PrivateLogin>
            <AuthorSignup></AuthorSignup>,
          </PrivateLogin>
        ),
      },
      {
        path: "/author/login",
        element: (
          <PrivateLogin>
            <AuthorLogin></AuthorLogin>,
          </PrivateLogin>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout></DashboardLayout>,
    children: [
      {
        path: "/dashboard/author/profile",
        element: (
          <AuthorPrivate>
            <AuthorDashboard></AuthorDashboard>,
          </AuthorPrivate>
        ),
      },
      {
        path: "/dashboard/author/mybook",
        element: (
          <AuthorPrivate>
            <AuthorMybook></AuthorMybook>,
          </AuthorPrivate>
        ),
      },
      {
        path: "/dashboard/author/newbook",
        element: (
          <AuthorPrivate>
            <AuthorNewbook></AuthorNewbook>,
          </AuthorPrivate>
        ),
      },
      {
        path: "/dashboard/author/updatebook/:bookId",
        element: (
          <AuthorPrivate>
            <AuthorBookUpdate></AuthorBookUpdate>,
          </AuthorPrivate>
        ),
        loader: ({ params }) => {
          return fetch(
            `https://online-bookstore-server.vercel.app/api/books/getsinglebook/${params.bookId}`
          );
        },
      },

      // from now on this is for admin dashboard
      {
        path: "/dashboard/admin/profile",
        element: (
          <AdminPrivate>
            <DashboardProfilePage></DashboardProfilePage>,
          </AdminPrivate>
        ),
      },
      {
        path: "/dashboard/admin/allauthors",
        element: (
          <AdminPrivate>
            <AdminAllAuthor></AdminAllAuthor>,
          </AdminPrivate>
        ),
      },
      {
        path: "/dashboard/admin/allbooks",
        element: (
          <AdminPrivate>
            <AdminAllBooks></AdminAllBooks>,
          </AdminPrivate>
        ),
      },
      {
        path: "/dashboard/admin/allusers",
        element: (
          <AdminPrivate>
            <AdminAllUser></AdminAllUser>,
          </AdminPrivate>
        ),
      },
    ],
  },
]);
