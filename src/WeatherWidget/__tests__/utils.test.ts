import { getCurrentLocalDate, getWeatherDay, temperatureValue, windSpeed } from "../utls";

describe("Utility Function Tests", () => {
  describe("Temperature Value Tests", () => {
    it("Should convert Kelvin to Celsius", () => {
      expect(temperatureValue(294.15, "Metric")).toEqual("21");
    });
    it("Should convert Kelvin to Ferenheit", () => {
      expect(temperatureValue(294.15, "Imperial")).toEqual("70");
    });
  });

  describe("Wind Speed Tests", () => {
    it("Should convert metres per second to kilometres per hour", () => {
      expect(windSpeed(10, "Metric")).toEqual("36");
    });
    it("Should convert metres per second to miles per hour", () => {
      expect(windSpeed(10, "Imperial")).toEqual("22");
    });
  });

  describe("Get Weather Day Tests", () => {
    it("Should Convert a Date object to display in readable short day format", () => {
      expect(getWeatherDay(new Date(420690000), "Australia/Melbourne")).toEqual("Tue");
    });
  });

  describe("Get Weather Day Tests", () => {
    it("Should Convert a Date object to display in readable Day Time Format", () => {
      expect(getCurrentLocalDate(new Date(420690000), "Australia/Melbourne")).toEqual(
        "Tuesday 6:51:30 am"
      );
    });
  });
});
