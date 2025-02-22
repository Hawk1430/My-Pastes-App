import { NavLink } from "react-router-dom"; // Make sure it's 'react-router-dom'
import DarkModeToggle from "./DarkModeToggle";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center bg-gray-100 dark:bg-gray-800 p-4 rounded shadow-md transition-colors">
      <div className="flex gap-10">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-blue-500 font-bold"
              : "text-gray-700 dark:text-gray-300"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/pastes"
          className={({ isActive }) =>
            isActive
              ? "text-blue-500 font-bold"
              : "text-gray-700 dark:text-gray-300"
          }
        >
          Pastes
        </NavLink>
      </div>
      <DarkModeToggle />
    </div>
  );
};

export default Navbar;
