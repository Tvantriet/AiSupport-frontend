import { createContext } from "react";

export type DefaultAppState = {
  name: string;
};

export const defaultAppState = {
  appState: {
    name: ""
  } as DefaultAppState,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setAppState: (_appState: DefaultAppState): void => {},
};

const AppstateContext = createContext(defaultAppState);

export default AppstateContext;
