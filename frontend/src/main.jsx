import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom"; 
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthForm from "./components/AuthForm";
import Home from "./components/home";
import CourseForm from "./components/CourseForm.jsx";
import AssignmentForm from "./components/AssignmentForm.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "login", element: <AuthForm heading="Login" /> }, 
      { path: "signup", element: <AuthForm heading="Sign Up" /> },
      { path: "home", element: <Home /> },
      { path :"course", element: <CourseForm />},
      { path :"assignment", element: <AssignmentForm />}
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

