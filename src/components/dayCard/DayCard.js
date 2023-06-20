import './dayCard.css';

import {sun, rain, clouds, small_rain} from "../../services/weatherIcons"
    

const DayCard = ({dayData, openPopup, index}) => {
    const {weekDay, dateDay, dayDeegres, nightDeegres, weatherDesc} = dayData;
    let dayCardIcon = null;
    if (weatherDesc === "Clouds") dayCardIcon = clouds;
    if (weatherDesc === "Rain") dayCardIcon = rain;
    if (weatherDesc === "Small Rain") dayCardIcon = small_rain;
    if (weatherDesc === "Clear") dayCardIcon = sun;

    return (
        <div 
        tabIndex="0"
        className="day-card__wrapper"
        onClick={() => openPopup(dayData)}
        onKeyPress={(event) => {
            if (event.key === 'Enter')
            openPopup(dayData)
        }}>
            <div 
            className="day-card__content">

                <div className="day-card__day">
                    <p className="day-card--day">{weekDay}</p>
                    <p className="day-card--data">{dateDay}</p>
                </div>

                <img src={dayCardIcon} alt="" />

                <div className="day-card__temp">
                    <p className="day-card__temp--day">{dayDeegres}&#176;</p>
                    <p className="day-card__temp--night">{nightDeegres}&#176;</p>
                </div>

                <p className="day-card--description">{weatherDesc}</p>

            </div>
        </div>
    );
}
 
export default DayCard;