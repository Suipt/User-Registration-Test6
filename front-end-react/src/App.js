import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./components/header.js/Header";

// const router = createBrowserRouter([]);

function App() {
  return (
    <div className="flex justify-center w-full min-h-screen relative items-center items-start bg-sky-100">
      <Header />
      {/* <RouterProvider router={router} /> */}
    </div>
  );
}

export default App;
