import * as ReactGA from "react-ga";

export const initGA = (id: string) => {
  if (process.env.NODE_ENV === "development") {
    ReactGA.initialize(id);
  }
};