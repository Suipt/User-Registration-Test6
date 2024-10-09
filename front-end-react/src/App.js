import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./components/header.js/Header";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Verify from "./pages/verify/Verify";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/verify",
    element: <Verify />,
  },
]);

function App() {
  return (
    <div className="flex justify-center w-full min-h-screen relative items-center items-start bg-sky-100">
      <Header />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
