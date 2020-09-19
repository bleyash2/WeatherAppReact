import * as Action from "./WeatherActions";

export interface Location {
  id: number;
  name: string;
  state: string;
  country: string;
  coord: {
    lon: number;
    lat: number;
  };
}

export interface WeatherData {
  lat: number;
  lon: number;
  timezone: string;
  current: {
    dt: number;
    sunrise: number;
    sunset: number;
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    clouds: number;
    wind_speed: number;
    weather: { id: number; main: string; description: string; icon: string }[];
  };
  daily: {
    dt: number;
    temp: { day: number; min: number; max: number };
    weather: { id: number; main: string; description: string; icon: string }[];
  }[];
}

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
