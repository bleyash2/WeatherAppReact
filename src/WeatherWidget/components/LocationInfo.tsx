import { Switch } from "@material-ui/core";
import React from "react";
import { useTypedSelector } from "../../allReducers";
import { getCurrentLocalDate } from "../utls";

interface LocationInfoProps {
  changeMetric: () => void;
}

export default function LocationInfo({ changeMetric }: LocationInfoProps) {
  const currentMetric = useTypedSelector((store) => store.weather.metrics);
  const currentLocation = useTypedSelector((store) => store.weather.currentLocation);
  const currentWeather = useTypedSelector(
    (store) => store.weather.weatherData[currentLocation?.id]
  );
  return (
    <div className="weatherTop">
      <div className="locationInfo">
        <h2 className="location">{`${currentLocation.name}, ${currentLocation.country}`}</h2>
        <h4 className="day">
          {getCurrentLocalDate(new Date(currentWeather.current.dt * 1000), currentWeather.timezone)}
        </h4>
        <h4 className="weather">{`${currentWeather.current.weather[0].description}`}</h4>
      </div>
      <div className="metrics">
        Metric
        <Switch
          checked={currentMetric === "Imperial"}
          onChange={() => changeMetric()}
          color="default"
          inputProps={{ "aria-label": "checkbox with default color" }}
        />
        Imperial
      </div>
    </div>
  );
}
