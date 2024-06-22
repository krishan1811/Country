import { useDispatch } from "react-redux";
import { useState } from "react";
import { cardFilter, optionFilter } from "../Features/subNavbarSlice.js";

export default function SubNavbar() {
  // const mode = useSelector((state) => state.darkMode.mode);
  const [val, setVal] = useState("");
  const [inp, setInp] = useState("All");
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const newVal = e.target.value;
    setVal(newVal);
    dispatch(cardFilter(newVal));
  };

  const handleSelection = (e) => {
    const newInp = e.target.value;
    setInp(newInp);
    dispatch(optionFilter(newInp));
  };

  return (
    // <div className={mode}>
    <div className="dark:bg-slate-700 ">
      <div className="flex flex-wrap items-center justify-between mx-4 mb-6 mt-4">
        <div className="relative rounded-md shadow-md">
          <input
            className="m-2 px-6 py-2"
            type="text"
            name="Search"
            id="Search"
            placeholder="Search for a Country"
            value={val}
            onChange={handleInputChange}
          />
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>
        <div className="shadow-md p-2 rounded-md">
          <select
            name="cars"
            id="cars"
            className="outline-none"
            value={inp}
            onChange={handleSelection}
          >
            <option value="All">Filter by Region</option>
            <option value="Africa">Africa</option>
            <option value="America">America</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
        </div>
      </div>
    </div>
    // </div>
  );
}
