import React from "react";
import { useTypedSelector } from "../../allReducers";

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

  const getWeatherDay = (date: Date) => {
    const options = { weekday: "short", timeZone: timezone };
    return new Intl.DateTimeFormat(`en-AU`, options).format(date);
  };

  const temperatureValue = (kelvinValue: number) => {
    if (currentMetric === "Metric") {
      return (kelvinValue - 273.15).toPrecision(2);
    } else return (((kelvinValue - 273.15) * 9) / 5 + 32).toPrecision(2);
  };

  return (
    <div className="forecastCard">
      <h6>{getWeatherDay(new Date(weather.dt * 1000))}</h6>
      <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="" />
      <h6>
        {temperatureValue(weather.temp.max)}
        <span className="low">{` | ${temperatureValue(weather.temp.min)}`}</span>
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
