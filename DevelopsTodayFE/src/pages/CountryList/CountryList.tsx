import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface Country {
  name: string;
  countryCode: string;
}

const CountryList: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/country/available-countries`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCountries(data.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  return (
    <div>
      <h1>Country List</h1>
      <ul>
        {countries.map((country) => {
          return (
            <li key={country.countryCode}>
              <Link to={`/${country.countryCode}`}>{country.name}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CountryList;
