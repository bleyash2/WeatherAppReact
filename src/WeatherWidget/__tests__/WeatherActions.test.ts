import {
  SETCURRENTLOCATION,
  setCurrentLocation,
  SETWEATHERDATA,
  setWeatherData,
  TOGGLEMETRICS,
  toggleMetrics,
} from "../redux/WeatherActions";
import { Location } from "../types";

describe("Weather Action Tests", () => {
  it("Should Create a Set Weather Data Action", () => {
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
    expect(setWeatherData(1234, weatherData)).toEqual({
      type: SETWEATHERDATA,
      payload: { placeId: 1234, data: weatherData },
    });
  });

  it("Should Create the Set Current Location Action", () => {
    const location: Location = {
      id: 1234,
      state: "",
      name: "Test",
      country: "",
      coord: { lon: 123, lat: 3245 },
    };
    expect(setCurrentLocation(location)).toEqual({ type: SETCURRENTLOCATION, payload: location });
  });

  it("Should Create the Toggle Metric Action", () => {
    expect(toggleMetrics()).toEqual({ type: TOGGLEMETRICS });
  });
});
