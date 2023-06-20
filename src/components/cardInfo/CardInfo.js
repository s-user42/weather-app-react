import './cardInfo.css';

import thermometerIcon from "../../resourses/img/icons/thermometer 1.png"
import humidityIcon from "../../resourses/img/icons/humidity 1.png"
import windIcon from "../../resourses/img/icons/wind 1.png"
import evaporatorIcon from "../../resourses/img/icons/evaporator 1.png"

const CardInfo = ({data}) => {
    const {temp, feels_like_temp, pressure, humidity, wind} = data;
    const windContent = wind !== null ? `${wind.speed} м/c` : "Error: Not found...";
    const tempContent = feels_like_temp !== null && temp !== null ? `${temp}\u00B0 - ощущается как ${feels_like_temp}\u00B0` : "Error: Not found..."
    const humidityContent = humidity !== null ? `${humidity} мм` : "Error: Not found..."
    const pressureContent = pressure !== null ? `${pressure} мм - ртутного столба` : "Error: Not found..."

    return (
        <ul className='card-info__content'>
                <li className="card-info__item">
                    <p className="card-info__item--ellipse">
                        <img src={thermometerIcon} alt="" className="card-info__item--icon" />
                    </p>
                        <p className="card-info__item--prop">Температура</p>
                        <p className="card-info__item--data">{tempContent}</p>
                </li>
                <li className="card-info__item">
                    <p className="card-info__item--ellipse">
                        <img src={evaporatorIcon} alt="" className="card-info__item--icon" />
                    </p>
                        <p className="card-info__item--prop">Давление</p>
                        <p className="card-info__item--data">{pressureContent}</p>
                </li>
                <li className="card-info__item">
                    <p className="card-info__item--ellipse">
                        <img src={humidityIcon} alt="" className="card-info__item--icon" />
                    </p>
                        <p className="card-info__item--prop">Осадки</p>
                        <p className="card-info__item--data">{humidityContent}</p>
                </li>
                <li className="card-info__item">
                    <p className="card-info__item--ellipse">
                        <img src={windIcon} alt="" className="card-info__item--icon" />
                    </p>
                        <p className="card-info__item--prop">Ветер</p>
                        <p className="card-info__item--data">{windContent}</p>
                </li>
        </ul>
    );
}
 
export default CardInfo;