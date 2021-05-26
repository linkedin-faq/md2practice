import "./css/index.css";
import Homepage from "./components/Homepage/Homepage";
import { HashRouter, Route } from "react-router-dom";
import { ThemeProvider } from "./themeContext";
import PracticePage from "./components/Practice/PracticePage";
import CookieConsent, {
  getCookieConsentValue,
  Cookies,
} from "react-cookie-consent";
import { initGA } from "./ga-utils";
import { useEffect } from "react";

function App(): JSX.Element {
  const handleAcceptCookie = () => {
    if (process.env.REACT_APP_GOOGLE_ANALYTICS_ID) {
      initGA(process.env.REACT_APP_GOOGLE_ANALYTICS_ID);
    }
  };

  const handleDeclineCookie = () => {
    //remove google analytics cookies
    Cookies.remove("_ga");
    Cookies.remove("_gat");
    Cookies.remove("_gid");
  };

  useEffect(() => {
    const isConsent = getCookieConsentValue();
    if (isConsent === "true") {
      handleAcceptCookie();
    }
  }, []);

  return (
    <div>

    <ThemeProvider>
      <HashRouter basename="/">
        <Route exact path="/" component={Homepage} />
        <Route exact path="/practice" component={PracticePage} />
        <Route path="/practice/:encodedUrl" component={PracticePage} />
      </HashRouter>
      
    </ThemeProvider>

    <CookieConsent
        enableDeclineButton
        onAccept={handleAcceptCookie}
        onDecline={handleDeclineCookie}
      >
        This website uses cookies to count page views for motivation. Close for better experiences.
      </CookieConsent>
    </div>
  );
}

export default App;
