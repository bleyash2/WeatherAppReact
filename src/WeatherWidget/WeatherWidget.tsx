import React, { Fragment } from "react";
import WidgetController from "./WidgetController";
import { useDispatch } from "react-redux";
import "./WeatherWidget.css";
import WeatherDetails from "./components/WeatherDetails";
import WeatherForecast from "./components/WeatherForecast";
import LocationSelector from "./components/LocationSelector";
import { useTypedSelector } from "../allReducers";
import { LinearProgress, Switch } from "@material-ui/core";

export default function WeatherWidget() {
  const dispatch = useDispatch();
  const [widgetController] = React.useState(new WidgetController(dispatch));
  const currentMetric = useTypedSelector((store) => store.weather.metrics);
  const currentLocation = useTypedSelector((store) => store.weather.currentLocation);
  const currentWeather = useTypedSelector(
    (store) => store.weather.weatherData[currentLocation?.id]
  );

  const getCurrentLocalDay = (date: Date) => {
    const options = {
      weekday: "long",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZone: currentWeather.timezone,
    };
    return new Intl.DateTimeFormat(`en-AU`, options).format(date);
  };

  React.useEffect(() => {
    if (currentLocation) {
      widgetController.fetchForcast(currentLocation);
    }
  }, [currentLocation, widgetController]);

  return (
    <div className="weatherWrapper">
      <LocationSelector setLocation={widgetController.setLocation} />
      {currentWeather ? (
        <Fragment>
          <div className="weatherTop">
            <div className="locationInfo">
              <h2 className="location">{`${currentLocation.name}, ${currentLocation.country}`}</h2>
              <h4 className="day">
                {getCurrentLocalDay(new Date(currentWeather.current.dt * 1000))}
              </h4>
              <h4 className="weather">{`${currentWeather.current.weather[0].description}`}</h4>
            </div>
            <div className="metrics">
              Metric
              <Switch
                checked={currentMetric === "Imperial"}
                onChange={() => widgetController.changeMetric()}
                color="default"
                inputProps={{ "aria-label": "checkbox with default color" }}
              />
              Imperial
            </div>
          </div>
          <WeatherDetails />
          <WeatherForecast />
        </Fragment>
      ) : (
        <LinearProgress variant="query" />
      )}
    </div>
  );
}
