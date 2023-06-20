import React from 'react';
import './popupCard.css';

import CardInfo from '../cardInfo/CardInfo';
import closeIcon from '../../resourses/img/icons/close 1.png';
import {sun, rain, clouds, small_rain} from "../../services/weatherIcons"
    




const PopupCard = ({closePopup, popupData}) => {
    const {weekDay, dayDeegres, city, weatherDesc} = popupData;
    
    let dayCardIcon = null;
    if (weatherDesc === "Clouds") dayCardIcon = clouds;
    if (weatherDesc === "Rain") dayCardIcon = rain;
    if (weatherDesc === "Small Rain") dayCardIcon = small_rain;
    if (weatherDesc === "Clear") dayCardIcon = sun;
    return (
        <div className="popup__wrapper">
            <div className="popup__card">
                <div className="popup__card--content">


                    <div className="popup__card--general">
                        <div className="popup__card--general">
                            <p className="popup__card--degrees">{dayDeegres}&#176;</p>
                            <p className="popup__card--week-day">{weekDay}</p>
                            <img src={dayCardIcon} alt="" className="popup__card--icon" />
                        </div>


                        <div className="popup__card--region-info">
                            <p className="">Город: {city}</p>
                        </div>
                    </div>

                    <div className="card-info__container">
                        <CardInfo 
                        data = {popupData}
                        customClass={'media-hide'}/>
                    </div>

                    <button 
                    className="popup__card--close-btn"
                    onClick={closePopup}>
                        <img src={closeIcon} alt="close btn" />
                    </button>

                </div>
            </div>
        </div>
    );
}
 
export default PopupCard;