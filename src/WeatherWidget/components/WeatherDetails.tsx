import React from "react";
import { useTypedSelector } from "../../allReducers";

export default function WeatherDetails() {
  const currentMetric = useTypedSelector((store) => store.weather.metrics);
  const currentLocation = useTypedSelector((store) => store.weather.currentLocation);
  const currentWeather = useTypedSelector(
    (store) => store.weather.weatherData[currentLocation?.id]
  );

  const temperatureValue = (kelvinValue: number) => {
    if (currentMetric === "Metric") {
      return (kelvinValue - 273.15).toPrecision(2);
    } else return (((kelvinValue - 273.15) * 9) / 5 + 32).toPrecision(2);
  };

  //   Converts wind speed from Metres per Second
  const windSpeed = (currentSpeed: number) => {
    if (currentMetric === "Metric") {
      return (currentSpeed * 3.6).toPrecision(2);
    } else return (currentSpeed * 2.237).toPrecision(2);
  };

  const windSpeedUnit = () => {
    if (currentMetric === "Metric") {
      return "km/h";
    } else return "M/h";
  };

  return (
    <div className="weatherDetails">
      <div className="detailsLeft">
        <img
          src={`http://openweathermap.org/img/wn/${currentWeather.current.weather[0].icon}@4x.png`}
          alt=""
        />
        <h1 className="temperature">
          {temperatureValue(currentWeather.current.temp)}
          <span className="unit">{currentMetric === "Metric" ? "°C" : "°F"}</span>
        </h1>
      </div>
      <div className="detailsRight">
        <h5>{`Precipitation: ${currentWeather.current.clouds}%`}</h5>
        <h5>{`Humidity: ${currentWeather.current.humidity}%`}</h5>
        <h5>{`Wind: ${windSpeed(currentWeather.current.wind_speed)}${windSpeedUnit()}`}</h5>
      </div>
    </div>
  );
}
