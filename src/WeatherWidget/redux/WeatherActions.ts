import { Location, WeatherData } from "./WeatherReducer";

export const SETWEATHERDATA = "WeatherWidget::SETWEATHERDATA";
export const SETCURRENTLOCATION = "WeatherWidget::SETCURRENTLOCATION";
export const TOGGLEMETRICS = "WeatherWidget::TOGGLEMETRICS";

export interface SetWeatherDataAction {
  type: typeof SETWEATHERDATA;
  payload: { placeId: number; data: WeatherData };
}

export function setWeatherData(placeId: number, data: WeatherData): SetWeatherDataAction {
  return { type: SETWEATHERDATA, payload: { placeId, data } };
}

export interface SetCurrentLocationAction {
  type: typeof SETCURRENTLOCATION;
  payload: Location;
}

export function setCurrentLocation(location: Location): SetCurrentLocationAction {
  return {
    type: SETCURRENTLOCATION,
    payload: location,
  };
}

export interface ToggleMetricsActions {
  type: typeof TOGGLEMETRICS;
}

export function toggleMetrics(): ToggleMetricsActions {
  return { type: TOGGLEMETRICS };
}

export type WeatherActions = SetWeatherDataAction | SetCurrentLocationAction | ToggleMetricsActions;
