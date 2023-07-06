import React, { useState } from "react";
import axios from "axios";
import "./search.css";
import "./loader.css";
import "./button.css";
import "./container.css";
import "./box.css";

const Flight = () => {
  const [flightNumber, setFlightNumber] = useState("");
  const [flightData, setFlightData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    const { value } = event.target;
    setFlightNumber(value.toUpperCase());
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

    try {
      const response = await axios.get(
        "http://api.aviationstack.com/v1/flights",
        {
          params: {
            access_key: "71f4b486e50c95776449f339eb4488cb",

            flight_iata: flightNumber,
          },
        }
      );

      if (response.data.data && response.data.data.length > 0) {
        const flight = response.data.data[0];
        setFlightData(flight);
      } else {
        setFlightData(null);
      }
    } catch (error) {
      console.log("An error occurred:", error);
    }

    setLoading(false);
  };

  return (
    <div className="box">
      <div className="centered-container">
        <h2>Flight Checker</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <label>
          <input
            className="input"
            type="text"
            placeholder="Flight Number"
            name="flightNumber"
            value={flightNumber}
            onChange={handleInputChange}
          />
        </label>
        <div className="centered-container">
          <button type="submit">Check Flight</button>
        </div>
      </form>
      {loading && (
        <div className="centered-container">
          <div className="dot-spinner">
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
          </div>
        </div>
      )}
      {flightData && (
        <div className="container">
          <h3>Flight Details</h3>
          <p>Airline: {flightData.airline.name}</p>
          <p>Flight Number: {flightData.flight.iata}</p>
          <p>Departure Airport: {flightData.departure.airport}</p>
          <p>Arrival Airport: {flightData.arrival.airport}</p>
          <p>Arrival delay: {flightData.arrival.delay}minutes</p>
          <p>Status: {flightData.flight_status}</p>
        </div>
      )}
    </div>
  );
};

export default Flight;
