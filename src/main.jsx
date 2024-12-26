import { RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import "./index.css";
import { router } from "./Routes/Routes";
import AuthProvider from "./Providers/AuthProvider";
import { SkeletonTheme } from "react-loading-skeleton";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Ensure you import the CSS

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <SkeletonTheme baseColor="#555252" highlightColor="#7a7a7a">
        <RouterProvider router={router}></RouterProvider>
      </SkeletonTheme>
    </AuthProvider>
    <ToastContainer />
  </StrictMode>
);
