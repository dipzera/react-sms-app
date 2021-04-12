import { APP_NAME } from "configs/AppConfig";
import { IState } from "redux/reducers";
import { ITheme } from "redux/reducers/Theme";

// Pass in Redux store's state to save it to the user's browser local storage
export const saveState = (state: ITheme) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(APP_NAME, serializedState);
  } catch {
    // We'll just ignore the errors
  }
};
/* Loads the state and returns an object that can be provided as the
 *  preloadedState parameter of store.js's call to configureStore */
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem(APP_NAME);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch {
    return undefined;
  }
};
