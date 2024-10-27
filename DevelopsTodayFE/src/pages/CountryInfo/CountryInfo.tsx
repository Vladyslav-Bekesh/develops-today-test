import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ICountryInfo } from "../../types/countries";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import {
  Container,
  Name,
  List,
  Item,
  ChartContainer,
} from "./CountryInfo.styled";

type CountryDetails = ICountryInfo;

const CountryInfo: React.FC = () => {
  const { countryCode } = useParams<{ countryCode: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [countryDetails, setCountryDetails] = useState<CountryDetails | null>(
    null
  );

  useEffect(() => {
    setIsLoading(true);
    setCountryDetails(null);

    fetch(`http://localhost:3001/api/country/country-info/${countryCode}`)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        setCountryDetails(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching country details:", error);
        setIsLoading(false);
      });
  }, [countryCode]);

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {!isLoading && !countryDetails && (
        <>
          <div>Country not found</div>
          <Link to="/">Back to list</Link>
        </>
      )}
      {countryDetails && (
        <>
          <Link to="/">Back to list</Link>
          <Container>
            <div>
              <Name>
                <h1>{countryDetails.name}</h1>
                <img
                  src={countryDetails.flag}
                  alt={`Flag of ${countryDetails.name}`}
                  width={50}
                />
              </Name>
              <b>Borders:</b>
              <List>
                <Item key={countryDetails.name}>
                  {countryDetails.borders.map((border) => (
                    <Link to={`/${border.countryCode}`}>
                      {border.commonName}
                    </Link>
                  ))}
                </Item>
              </List>
            </div>

            <div>
              <h2>Population Over Time</h2>
              <ChartContainer>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    width={500}
                    height={300}
                    data={countryDetails.population}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </Container>
        </>
      )}
    </>
  );
};

export default CountryInfo;
