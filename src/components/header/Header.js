import "./header.css";

import logo from "../../resourses/img/icons/Header logo.svg";
import darkModeIcon from "../../resourses/img/icons/invert_colors_black_24dp 2.svg"

import SelectInput from "../selectInput/SelectInput";
import Spinner from "../spinner/Spinner";

import { useContext } from "react";
import { ThemeContext } from "../../helper/themeContext";

const Header = ({countries, cities, onLoadCityList, onLoadedWeather, status}) => {
    const {toggleTheme} = useContext(ThemeContext);

    const toggleDark = () => {
        document.querySelector('body').classList.toggle('dark');
        toggleTheme(isDarkTheme => !isDarkTheme);
    }

    let content = status === "ready" ? 
    <SelectInput 
    onLoad = {(selectOption) => onLoadedWeather(selectOption.value)}
    options = {cities}
    text = 'Select city'/> : null;
    content = status === "load" ? <div className="spinner"><Spinner/></div> : content;
    content = status === "error" ? "ERORR" : content;

    return (
        <div className="container">
            <div className="container-header">
                <a className="logo">
                    <img src={logo} alt="" className="logo--img" />
                    <p>REACT WEATHER</p>
                </a>

                <button className="dark-mode-btn" onClick={toggleDark} tabIndex='0'>
                    <img src={darkModeIcon} alt="" className="dark-mode-btn__icon" />
                </button>

                    <SelectInput 
                    onLoad={onLoadCityList}
                    options = {countries}
                    text = 'Select country'/>

                    {content}
            </div>
        </div>
    );
}
 
export default Header;
