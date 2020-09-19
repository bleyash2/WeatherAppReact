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
