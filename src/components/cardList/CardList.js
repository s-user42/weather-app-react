import './cardList.css';
import { useState } from 'react';

import DayCard from '../dayCard/DayCard.js';

const CardList = ({data, openPopup}) => {
    const [interval, setInterval] = useState('cancel');

    const onChangeInterval = (select) => {
        if (interval !== select) {
            setInterval(select);
        }
    }

    const inactiveBtnStyles = 'interval-btn';
    const activeBtnStyles = 'interval-btn interval-btn--active';
    let visibleData = [];
    const tempArr = []

    if (data) {
        data.list.forEach(item => {
            if (!tempArr.includes(item.weekDay)) {
                tempArr.push(item.weekDay)
                visibleData.push(item)
            }
        });

        if (interval === 'week') {
            visibleData = visibleData.slice(0, 7);
        }
        if (interval === 'month') {
            visibleData = visibleData.slice(0, 30);
        }
        if (interval === 'teenDays') {
            visibleData = visibleData.slice(0, 10);
        }

    }

    return (
        <div className="container">
            <ul className="select-interval">
                <li className="select-interval--week">
                    <button 
                    className={interval === 'week' ? activeBtnStyles : inactiveBtnStyles} 
                    onClick={() => onChangeInterval('week')}>На неделю</button>
                </li>
                <li className="select-interval--month">
                    <button className={interval === 'month' ? activeBtnStyles : inactiveBtnStyles}  
                    onClick={() => onChangeInterval('month')}>На месяц</button>
                </li>
                <li className="select-interval--teen-days">
                    <button className={interval === 'teenDays' ? activeBtnStyles : inactiveBtnStyles}  
                    onClick={() => onChangeInterval('teenDays')}>На 10 дней</button>
                </li>
                <li className="cancel">
                    <button className={interval === 'cancel' ? activeBtnStyles : inactiveBtnStyles}  
                    onClick={() => onChangeInterval('cancel')}>Отмена</button>
                </li>
            </ul>

            {interval !== 'cancel' ? 
            <div className="cards-list__container">
                <div className="cards-list__wrapper">
                    {visibleData.map((item, i) => {
                        return (

                            <DayCard 
                            index={i}
                            key={i}
                            dayData = {item}
                            openPopup = {openPopup}/>

                        )
                    })}
                    
                </div>
            </div>
            : null}

        </div>
    );
}
 
export default CardList;