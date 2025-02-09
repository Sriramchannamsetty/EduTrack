import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom"; 
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthForm from "./components/AuthForm";
import Home from "./components/home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "login", element: <AuthForm heading="Login" /> }, 
      { path: "signup", element: <AuthForm heading="Sign Up" /> },
      { path: "home", element: <Home /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

