import "./css/index.css";
import Homepage from "./components/Homepage/Homepage";
import Example from "./components/Example/Example";
import { HashRouter, Route } from "react-router-dom";
import Practice from "./components/Practice/Practice";
import { ThemeProvider } from "./themeContext";

function App(): JSX.Element {
  // return <Homepage />;
  // return <Example/>

  return (
    <ThemeProvider>
      <HashRouter basename="/">
        <Route exact path="/" component={Homepage} />
        <Route exact path="/example" component={Example} />
        <Route exact path="/practice" component={Practice} />
        <Route path="/practice/:encodedUrl" component={Practice} />
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;
