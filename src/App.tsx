import "./css/index.css";
import Homepage from "./components/Homepage/Homepage";
import { HashRouter, Route } from "react-router-dom";
import { ThemeProvider } from "./themeContext";
import PracticePage from "./components/Practice/PracticePage";

function App(): JSX.Element {
  // return <Homepage />;
  // return <Example/>

  return (
    <ThemeProvider>
      <HashRouter basename="/">
        <Route exact path="/" component={Homepage} />
        <Route exact path="/practice" component={PracticePage} />
        <Route path="/practice/:encodedUrl" component={PracticePage} />
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;
