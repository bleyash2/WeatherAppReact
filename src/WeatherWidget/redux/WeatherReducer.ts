import { Location, WeatherData } from "../types";
import * as Action from "./WeatherActions";

export interface WeatherStore {
  weatherData: { [place: string]: WeatherData };
  currentLocation: Location;
  metrics: "Metric" | "Imperial";
}

const initalState: WeatherStore = {
  weatherData: {},
  currentLocation: {
    id: 2158177,
    name: "Melbourne",
    state: "",
    country: "AU",
    coord: {
      lon: 144.963318,
      lat: -37.813999,
    },
  },
  metrics: "Metric",
};

export default function weatherReducer(
  state = initalState,
  action: Action.WeatherActions
): WeatherStore {
  switch (action.type) {
    case Action.SETWEATHERDATA:
      return {
        ...state,
        weatherData: { ...state.weatherData, [action.payload.placeId]: action.payload.data },
      };
    case Action.SETCURRENTLOCATION:
      return { ...state, currentLocation: action.payload };
    case Action.TOGGLEMETRICS:
      if (state.metrics === "Metric") {
        return { ...state, metrics: "Imperial" };
      } else return { ...state, metrics: "Metric" };
    default:
      return state;
  }
}
