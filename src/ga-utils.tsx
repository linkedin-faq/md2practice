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
  const pathname = window.location.pathname.replace(/\/$/, "")
  const urlMode = window.location.hash.match(/practice\/.*/)
  if(urlMode !== null){
    const encodedUrl = window.location.hash.replace(/#\/practice\//,"")
    ReactGA.pageview(`${pathname} - ${atob(encodedUrl)}`)
  }else{
    ReactGA.pageview(pathname);
  }
};