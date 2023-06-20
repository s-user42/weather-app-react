import ThisDayContent from '../thisDayContent/ThisDayContent';
import './thisDay.css';

const ThisDay = ({data}) => {
    return (
        <div className="card__wrapper">
            <ThisDayContent
            data = {data}/>
        </div>
    );
}
 
export default ThisDay;