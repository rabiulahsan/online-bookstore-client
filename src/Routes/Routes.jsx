import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/HomePage/Home/Home";

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

      //   {
      //     path: "/create-account",
      //     element: <CreateAccount></CreateAccount>,
      //   },
      //   {
      //     path: "/patient/login",
      //     element: <PatientLogin></PatientLogin>,
      //   },
      //   {
      //     path: "/patient/signup",
      //     element: <PatientSignup></PatientSignup>,
      //   },
      //   {
      //     path: "/doctor/signup",
      //     element: <DoctorSignup></DoctorSignup>,
      //   },
      //   {
      //     path: "/doctor/login",
      //     element: <DoctorLogin></DoctorLogin>,
      //   },
    ],
  },
]);
