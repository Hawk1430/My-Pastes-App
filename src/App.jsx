import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
import ViewPaste from "./components/ViewPaste";
import Paste from "./components/Paste";
import Home from "./components/Home";
import { useEffect, useState } from "react";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div>
          <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
          <Home />
        </div>
      ),
    },
    {
      path: "/pastes",
      element: (
        <div>
          <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
          <Paste />
        </div>
      ),
    },
    {
      path: "/pastes/:id",
      element: (
        <div>
          <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
          <ViewPaste />
        </div>
      ),
    },
  ]);

  return (
    <div
      className={`min-h-screen w-full ${
        isDarkMode ? "dark" : ""
      } bg-gray-100 dark:bg-gray-900`}
    >
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
