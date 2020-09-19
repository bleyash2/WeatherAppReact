import React from "react";
import { useTypedSelector } from "../../allReducers";
import { temperatureValue, getWeatherDay } from "../utls";

interface ForcastCardProps {
  timezone: string;
  weather: {
    dt: number;
    temp: {
      day: number;
      min: number;
      max: number;
    };
    weather: {
      id: number;
      main: string;
      description: string;
      icon: string;
    }[];
  };
}

function ForcastCard({ weather, timezone }: ForcastCardProps) {
  const currentMetric = useTypedSelector((store) => store.weather.metrics);

  return (
    <div className="forecastCard">
      <h6>{getWeatherDay(new Date(weather.dt * 1000), timezone)}</h6>
      <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="" />
      <h6>
        {temperatureValue(weather.temp.max, currentMetric)}
        <span className="low">{` | ${temperatureValue(weather.temp.min, currentMetric)}`}</span>
      </h6>
    </div>
  );
}

export default function WeatherForecast() {
  const currentLocation = useTypedSelector((store) => store.weather.currentLocation);
  const currentWeather = useTypedSelector(
    (store) => store.weather.weatherData[currentLocation?.id]
  );

  return (
    <div className="forecast">
      {currentWeather.daily.map((weather, index) => (
        <ForcastCard key={index} timezone={currentWeather.timezone} weather={weather} />
      ))}
    </div>
  );
}
