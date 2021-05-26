import * as ReactGA from "react-ga";

export const initGA = (id: string) => {
  if (process.env.NODE_ENV === "production") {
    ReactGA.initialize(id);
  }
};