import { RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import "./index.css";
import { router } from "./Routes/Routes";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <AuthProvider> */}
    {/* <SkeletonTheme baseColor="#313131" highlightColor="#525252"> */}
    <RouterProvider router={router}></RouterProvider>
    {/* </SkeletonTheme> */}
    {/* </AuthProvider> */}
  </StrictMode>
);
