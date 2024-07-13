import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { countryApi } from "../Features/countrySlice.js";
import { getCountry } from "../Features/subNavbarSlice.js";
import { Link } from "react-router-dom";
import Skeleton from "./Skeleton.jsx";

export default function Card() {
  const countryInfo = useSelector((state) => state.countryData); // Getting Api Data
  const filterInfo = useSelector((state) => state.countryFilter.value);
  const optionInfo = useSelector((state) => state.countryFilter.continent);

  const dispatch = useDispatch();

  // This function define search parameters
  const filterCountries = () => {
    if (filterInfo.length != 0) {
      return countryInfo.data.filter((val) => {
        return val.name.common.toLowerCase().includes(filterInfo.toLowerCase());
      });
    } else if (optionInfo.length != 0) {
      if (optionInfo === "All") {
        return countryInfo.data;
      } else {
        return countryInfo.data.filter((val) => {
          return val.region.toLowerCase().includes(optionInfo.toLowerCase());
        });
      }
    } else {
      return countryInfo.data;
    }
  };

  // Skeleton Logic
  const loadingFunc = () => {
    const skeletons = [];
    if (countryInfo.isLoading === "loading") {
      for (let index = 0; index < 18; index++) {
        skeletons.push(<Skeleton key={index} />);
      }
    }
    return skeletons;
  };

  useEffect(() => {
    dispatch(countryApi());
  }, [dispatch]);

  return (
    <div>
      {/* Calling and styling Skeleton  */}
      <div className="flex flex-wrap justify-between mx-8">{loadingFunc()}</div>

      {countryInfo.isLoading === "succeeded" && (
        <div className="flex flex-wrap justify-between mx-8">
          {filterCountries().map((data) => (
            <div key={data._id}>
              <div className="m-4">
                <div className="w-64 shadow-md h-[22rem] rounded hover:scale-105 duration-300">
                  <Link
                    to={data.name.common}
                    onClick={() => {
                      dispatch(getCountry(data.name.common));
                    }}
                    className="h-40"
                  >
                    <img
                      className="rounded-t-lg h-40 w-full"
                      src={data.flags.png}
                      alt="Flas"
                    />
                  </Link>
                  <div className="ml-6 my-2 h-48 flex flex-col justify-center">
                    <h2 className="text-xl font-semibold mb-4">
                      {data.name.common}
                    </h2>
                    <div className="mb-1 flex">
                      <b>Population :</b>{" "}
                      <p className="ml-1">
                        {data.population.toLocaleString("en-IN")}
                      </p>
                    </div>
                    <div className="mb-1 flex">
                      <b>Region :</b> <p className="ml-1"> {data.region}</p>
                    </div>
                    <div className="mb-1 flex flex-wrap">
                      <b>Capital :</b>
                      <p className="ml-1"> {data.capital?.join(", ")}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
