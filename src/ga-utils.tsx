import * as ReactGA from "react-ga";

export const initGA = (id: string) => {
  if (process.env.NODE_ENV === "development") {
    ReactGA.initialize(id, {
      debug:true,
      gaOptions:{
        userId: "123"
      }
    });
  }else if(process.env.NODE_ENV === "production"){
    ReactGA.initialize(id)
  }
  const hashedPath = window.location.hash.replace("#","").replace("/practice/","")
  console.log(hashedPath)
  const pathname = window.location.pathname + " - " + atob(hashedPath)
  ReactGA.pageview(pathname);
};