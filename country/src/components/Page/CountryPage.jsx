import BackButton from "../BackButton.jsx";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function CountryPage() {
  const { country } = useParams();
  const countryInfo = useSelector((state) =>
    state.countryData.data.filter(
      (data) => data.name.common.toLowerCase() === country.toLowerCase()
    )
  )[0];

  // Error Handling and destructring the data from countryInfo
  const Currencies = countryInfo.currencies
    ? Object.values(countryInfo.currencies)
        ?.map((cur) => cur.name)
        ?.join(", ")
    : "No Currencies available";

  const Lang = countryInfo.languages
    ? Object.values(countryInfo.languages)?.join(", ")
    : "No Languages";

  const Region = countryInfo.region ? countryInfo.region : "NA";
  const SubRegion = countryInfo.subregion ? countryInfo.subregion : "NA";

  const Capital = countryInfo.capital ? countryInfo.capital?.join(", ") : "NA";

  const NativeName = countryInfo.name.nativeName
    ? Object.values(countryInfo.name.nativeName)[0].common
    : "NA";
  const [borderCountryNames, setBorderCountryNames] = useState([]);

  useEffect(() => {
    if (countryInfo?.borders?.length > 0) {
      const fetchBorderCountryNames = async () => {
        try {
          const responses = await Promise.all(
            countryInfo.borders.map((borderCountry) =>
              axios.get(`https://restcountries.com/v3.1/alpha/${borderCountry}`)
            )
          );
          const names = responses.map((res) => res.data[0].name.common);
          setBorderCountryNames(names);
        } catch (error) {
          console.error("Error fetching border country names:", error);
        }
      };
      fetchBorderCountryNames();
    }
  }, [countryInfo]);

  return (
    <div className="m-8">
      <Link to="../">
        <BackButton />
      </Link>

      {countryInfo.isLoading === "loading" && (
        <div className="flex justify-center mt-16 text-6xl font-bold	">
          Loading....
        </div>
      )}

      <div className="flex flex-wrap w-full mt-28">
        <div className="mb-8 mr-8">
          <img
            className="w-[40rem]	shadow-md	"
            src={countryInfo.flags.svg}
            alt="flag"
          />
        </div>
        <div>
          <h2 className="mb-8 text-5xl font-bold">{countryInfo.name.common}</h2>
          <div className="flex flex-wrap gap-4 text-lg">
            <div className="flex flex-col gap-4">
              <div className="mr-36">
                <div>
                  <b>Native Name :</b> {NativeName}
                </div>
              </div>
              <div>
                <div>
                  <b>Population :</b>
                  {countryInfo.population.toLocaleString("en-IN")}
                </div>
              </div>
              <div>
                <div>
                  <b>Region :</b> {Region}
                </div>
              </div>
              <div>
                <div>
                  <b>Sub Region :</b> {SubRegion}
                </div>
              </div>
              <div>
                <div>
                  <b>Capital :</b> {Capital}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <div>
                  <b>Top Level Domain</b> {countryInfo?.tld[0]}
                </div>
              </div>
              <div>
                <div>
                  <b>Currencies :</b> {Currencies}
                </div>
              </div>
              <div>
                <div>
                  <b>Languages :</b> {Lang}
                </div>
              </div>
            </div>
          </div>
          <div className="flex mt-8">
            <b className="mr-4">Border Countries :</b>
            <div className="flex flex-wrap">
              {borderCountryNames.length == 0
                ? "No Border Country"
                : borderCountryNames.map((country, i) => (
                    <Link
                      to={`../${country}`}
                      key={i}
                      className="px-4 border shadow mr-4 mb-4"
                    >
                      {country}
                    </Link>
                  ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
