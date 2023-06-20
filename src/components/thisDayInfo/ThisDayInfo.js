import "./thisDayInfo.css";
import cloudImg from "../../resourses/img/Cloud image.png";

import CardInfo from "../cardInfo/CardInfo";


const ThisDayInfo = ({data}) => {
    return (
        <div className="card-info__wrapper">
            <img src={cloudImg} alt="" className="cloud" />
            <CardInfo data = {data}/>
        </div>
    );
}
  
export default ThisDayInfo;