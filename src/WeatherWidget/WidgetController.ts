import Axios from "axios";
import { Action, Dispatch } from "redux";
import { APIKEY } from "../config";
import { setCurrentLocation, setWeatherData, toggleMetrics } from "./redux/WeatherActions";
import { Location, WeatherData } from "./types";

// Helper Function to help contruct API Url
const constructForecastCall = (latitude: number, longitude: number) => {
  return `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${APIKEY}`;
};

export default class WidgetController {
  protected _dispatchFunction: Dispatch<Action>;

  constructor(dispatchFunction: Dispatch<Action>) {
    this._dispatchFunction = dispatchFunction;
  }

  protected dispatch(action: Action<any>) {
    if (this._dispatchFunction) {
      this._dispatchFunction(action);
    } else throw new Error("Invalid Dispatch");
  }

  // Functionality for Retreiving Weather Data for a Specific Location
  public fetchForcast = async (location: Location) => {
    try {
      const { lat, lon } = location.coord;
      const response = await Axios.get<WeatherData>(constructForecastCall(lat, lon));
      this.dispatch(setWeatherData(location.id, response.data));
    } catch (e) {
      console.error(e);
    }
  };

  // Wrapper Function for Setting the Location within Redux
  public setLocation = (location: Location) => {
    try {
      this.dispatch(setCurrentLocation(location));
    } catch (e) {
      console.error(e);
    }
  };

  // Wrapper Function for Toggling Between the Two Metrics
  public changeMetric = () => {
    try {
      this.dispatch(toggleMetrics());
    } catch (e) {
      console.error(e);
    }
  };
}
