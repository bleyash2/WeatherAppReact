import { TypedUseSelectorHook, useSelector } from "react-redux";
import { Reducer, combineReducers, Action } from "redux";
import weatherReducer, { WeatherStore } from "./WeatherWidget/redux/WeatherReducer";

export interface ReduxStoreState {
  weather: WeatherStore;
}

export const useTypedSelector: TypedUseSelectorHook<ReduxStoreState> = useSelector;

const allReducers: Reducer<ReduxStoreState> = combineReducers<ReduxStoreState>({
  weather: weatherReducer,
});

export const rootReducer = (state: ReduxStoreState, action: Action): ReduxStoreState => {
  return allReducers(state, action);
};
