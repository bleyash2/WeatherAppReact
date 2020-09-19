//  Converts Kelvin Value Temp to Celcius or Imperial
export const temperatureValue = (kelvinValue: number, currentMetric: "Metric" | "Imperial") => {
  if (currentMetric === "Metric") {
    return Math.round(kelvinValue - 273.15);
  } else return Math.round(((kelvinValue - 273.15) * 9) / 5 + 32);
};

//   Converts wind speed from Metres per Second
export const windSpeed = (currentSpeed: number, currentMetric: "Metric" | "Imperial") => {
  if (currentMetric === "Metric") {
    return (currentSpeed * 3.6).toPrecision(2);
  } else return (currentSpeed * 2.237).toPrecision(2);
};

// Gets Correct km per hr or M per hr string
export const windSpeedUnit = (currentMetric: "Metric" | "Imperial") => {
  if (currentMetric === "Metric") {
    return "km/h";
  } else return "M/h";
};

// Converts Date Object to Local Day
export const getWeatherDay = (date: Date, timezone: string) => {
  const options = { weekday: "short", timeZone: timezone };
  return new Intl.DateTimeFormat(`en-AU`, options).format(date);
};

// Converts Date Object to Local Date
export const getCurrentLocalDate = (date: Date, timezone: string) => {
  const options = {
    weekday: "long",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZone: timezone,
  };
  return new Intl.DateTimeFormat(`en-AU`, options).format(date);
};
