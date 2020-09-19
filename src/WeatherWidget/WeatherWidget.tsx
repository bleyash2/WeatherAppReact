import React, { Fragment } from "react";
import WidgetController from "./WidgetController";
import { useDispatch } from "react-redux";
import "./WeatherWidget.css";
import WeatherDetails from "./components/WeatherDetails";
import WeatherForecast from "./components/WeatherForecast";
import LocationSelector from "./components/LocationSelector";
import { useTypedSelector } from "../allReducers";
import { LinearProgress } from "@material-ui/core";
import WeatherInfo from "./components/LocationInfo";

export default function WeatherWidget() {
  const dispatch = useDispatch();
  const [widgetController] = React.useState(new WidgetController(dispatch));
  const currentLocation = useTypedSelector((store) => store.weather.currentLocation);
  const currentWeather = useTypedSelector(
    (store) => store.weather.weatherData[currentLocation?.id]
  );

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
          <WeatherInfo changeMetric={widgetController.changeMetric} />
          <WeatherDetails />
          <WeatherForecast />
        </Fragment>
      ) : (
        <LinearProgress variant="query" />
      )}
    </div>
  );
}
