import React from "react";
import { useTypedSelector } from "../../allReducers";
import { temperatureValue, windSpeed, windSpeedUnit } from "../utls";

export default function WeatherDetails() {
  const currentMetric = useTypedSelector((store) => store.weather.metrics);
  const currentLocation = useTypedSelector((store) => store.weather.currentLocation);
  const currentWeather = useTypedSelector(
    (store) => store.weather.weatherData[currentLocation?.id]
  );

  return (
    <div className="weatherDetails">
      <div className="detailsLeft">
        <img
          src={`http://openweathermap.org/img/wn/${currentWeather.current.weather[0].icon}@4x.png`}
          alt=""
        />
        <h1 className="temperature">
          {temperatureValue(currentWeather.current.temp, currentMetric)}
          <span className="unit">{currentMetric === "Metric" ? "°C" : "°F"}</span>
        </h1>
      </div>
      <div className="detailsRight">
        <h5>{`Precipitation: ${currentWeather.current.clouds}%`}</h5>
        <h5>{`Humidity: ${currentWeather.current.humidity}%`}</h5>
        <h5>{`Wind: ${windSpeed(currentWeather.current.wind_speed, currentMetric)}${windSpeedUnit(
          currentMetric
        )}`}</h5>
      </div>
    </div>
  );
}
