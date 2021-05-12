import { useHistory } from "react-router";
import { ThemeContext } from "../../../themeContext";
import { useContext } from "react";

const Navbar = (): JSX.Element => {
  const history = useHistory();
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="z-50 flex justify-between md:px-10 bg-gray-100 dark:bg-gray-900">
      <button className="m-2 p-2 text-lg uppercase font-bold focus:outline-none" onClick={() => history.push("/")}>
        <span className="text-primary-500">MD2</span>Practice
      </button>
      <div className="m-2 my-4">
        <button
          className="p-2 text-md bold border-4 rounded-lg capitalize border-gray-700 dark:border-gray-100 focus:outline-none"
          onClick={toggleTheme}
        >{`${theme === "dark" ? "light" : "dark"} Theme`}</button>
      </div>
    </div>
  );
};

export default Navbar;
