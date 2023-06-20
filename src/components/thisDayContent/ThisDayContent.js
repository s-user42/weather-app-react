
import {sun, rain, clouds, small_rain} from "../../services/weatherIcons"

const ThisDayContent = ({data}) => {
    
    const {temp, weatherDesc} = data.list[0];
    const {city, currentTime} = data;

    let dayCardIcon = null;
    
    if (weatherDesc === "Clouds") dayCardIcon = clouds;
    if (weatherDesc === "Rain") dayCardIcon = rain;
    if (weatherDesc === "Small Rain") dayCardIcon = small_rain;
    if (weatherDesc === "Clear") dayCardIcon = sun;

    return (
            <div className="card__content">
                <div className="card__row">
                    <div className="temperature">
                        <p className="temperature--degrees">{temp}&#176;</p>
                        <p className="temperature--day">Сегодня</p>
                    </div>
                    <img src={dayCardIcon} alt="" className="day-card-icon" />
                </div>


                <div className="location-info">
                    <p className="location-info--time">Время: {currentTime === undefined ? null : currentTime}</p>
                    <p className="location-info--name">Город: {city}</p>
                </div>
            </div>
    );
}
 
export default ThisDayContent;