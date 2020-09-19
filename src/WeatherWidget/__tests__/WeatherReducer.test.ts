import {
  setCurrentLocation,
  setWeatherData,
  toggleMetrics,
  WeatherActions,
} from "../redux/WeatherActions";
import weatherReducer, { WeatherStore } from "../redux/WeatherReducer";
import { Location } from "../types";

function initalState(): WeatherStore {
  return {
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
}

describe("Weather Reducer Tests", () => {
  it("Should Return the Inital State", () => {
    expect(weatherReducer(undefined, {} as WeatherActions)).toEqual(initalState());
  });

  it("Should be able to handle the set weather data action", () => {
    const weatherData = {
      lat: 15.08,
      lon: 45.3,
      timezone: "Asia/Aden",
      current: {
        clouds: 1,
        dt: 1600508587,
        feels_like: 299.82,
        humidity: 12,
        pressure: 1009,
        sunrise: 1600483661,
        sunset: 1600527449,
        temp: 305.27,
        weather: [{ id: 800, main: "Clear", description: "clear sky", icon: "01d" }],
        wind_speed: 4.77,
      },
      daily: [],
    };
    let expectedState = initalState();
    expectedState.weatherData = { ...expectedState.weatherData, 1234: weatherData };
    expect(weatherReducer(initalState(), setWeatherData(1234, weatherData))).toEqual(expectedState);
  });

  it("Should be able to handle the set current location action", () => {
    let expectedState = initalState();
    const location: Location = {
      id: 1234,
      state: "",
      name: "Test",
      country: "",
      coord: { lon: 123, lat: 3245 },
    };
    expectedState.currentLocation = location;
    expect(weatherReducer(initalState(), setCurrentLocation(location))).toEqual(expectedState);
  });

  it("Should be able to handle the toggle metric action", () => {
    let expectedState = initalState();
    expectedState.metrics = "Imperial";
    expect(weatherReducer(initalState(), toggleMetrics())).toEqual(expectedState);
  });
});
