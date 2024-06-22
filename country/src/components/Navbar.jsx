import { FaMoon } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { darkModeController } from "../Features/darkModeSlice.js";

export default function Navbar() {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.darkMode.mode);
  return (
    <div className={mode}>
      <div className="shadow-md min-h-16 border-b-4 dark:bg-slate-700	">
        <nav className="flex flex-wrap justify-between mx-8">
          <a className="text-4xl font-semibold p-4 dark:text-white">
            Where in the world ?
          </a>
          <div
            className="flex items-center text-2xl p-4 cursor-pointer dark:text-slate-400"
            onClick={() => {
              dispatch(darkModeController(mode != "dark" ? "dark" : ""));
            }}
          >
            <FaMoon />
            <p>Dark Mode</p>
          </div>
        </nav>
      </div>
    </div>
  );
}
